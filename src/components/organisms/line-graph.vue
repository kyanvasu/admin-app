<template>
    <div class="line-graph" ref="LineGraph">
        <div class="stat-card">
            <article class="stat-card__content w-100 text-center">
                <ve-line
                    :data="chartData"
                    :legend-visible="false"
                    :theme="theme"
                    :init-options="initOptions"
                    :colors="chartColors"
                />
            </article>

            <footer class="stat-card__footer">
                <date-range-picker v-model="localDates" :range-mode="true" />
            </footer>
        </div>
    </div>
</template>

<script>
import DateRangePicker from "../molecules/date-range-picker.vue";
import uuid from "uuid/v4"

export default {
    components: {
        DateRangePicker
    },
    props: {
        chartData: {
            type: Object,
            required: true
        },
        dates: {
            type: Object,
            default() {
                return {
                    start: "",
                    end: ""
                }
            }
        },
        title: {
            type: String,
            required: true
        },
        mainColor: {
            type: String,
            default: "#8582d1"
        },
        accentColor: {
            type: String,
            default: "#8582d1"
        },
        backgroundColor: {
            type: String,
            default: "#8582d1"
        }
    },
    data() {
        return {
            theme: {
                line: {
                    smooth: false
                }
            },
            localDates: {
                start: "",
                end: ""
            },
            initOptions: { },
            modalId: uuid()
        };
    },
    computed: {
        chartColors() {
            return [this.mainColor]
        }
    },
    watch: {
        dates: {
            handler(date) {
                this.localDates.start = date.start
                this.localDates.end = date.end
            },
            immediate: true,
            deep: true
        },
        localDates: {
            handler() {
                this.$emit("update:dates", this.localDates)
            },
            immediate: true,
            deep: true
        },
        mainColor() {
            this.setColors()
        },
        backgroundColor() {
            this.setColors()
        }
    },
    mounted() {
        this.setColors();
    },
    methods: {
        openModal() {
            this.$modal.show(`${this.modalId}-graph-modal`);
        },
        setColors() {
            const documentRoot = this.$refs.LineGraph;
            documentRoot.style.setProperty("--main-color", this.mainColor);
            documentRoot.style.setProperty("--accent-color", this.accentColor);
            documentRoot.style.setProperty("--background-color", this.backgroundColor);
        }
    }
};
</script>

<style lang="scss" scoped>
.line-graph {
    &__title {
        font-size: 21px;
        color: var(--main-color);
    }

    .stat-card {
        border-radius: 8px;
        background: var(--background-color);

        &__footer {
            display: flex;
            justify-content: flex-end;
            color: var(--main-color);
        }
    }
}
</style>
