<template>
    <div class="line-graph">
        <h4 class="line-graph__title">
            {{ title }}
        </h4>
        <div class="card stat-card">
            <header class="stat-card__header d-flex justify-content-end">
                <h5 class="stat-card__action">
                    See More
                </h5>
            </header>
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
            chartColors: ["#8582D1"]
        };
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
        }
    }
};
</script>

<style lang="scss" scoped>
.line-graph {
    &__title {
        font-size: 21px;
        color: #8582d1;
        margin-bottom: 10px;
    }

    .stat-card {
        padding: 22px 28px;
        border-radius: 8px;
        &__action {
            font-size: 1rem;
            color: #8582d1;
            margin-bottom: 34px;
        }

        &__footer {
            display: flex;
            justify-content: flex-end;
            color: #8582d1;
        }
    }
}
</style>
