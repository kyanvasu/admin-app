<template>
    <div class="statistics-box kanvas-scroller">
        <div class="statistics-box__header">
            <div class="statistics-box__date">
                {{ selectedMonth }}
            </div>
            <div class="statistics-box__date-selector">
                <date-range-picker v-model="localDates" :range-mode="true" />
            </div>
        </div>
        <div class="statistics-box__content">
            <statistic-item
                v-for="(stat, index) in statistics"
                :key="`stat-${index}`"
                class="static-item-local pr-5"
                :title="stat.title"
                :content="stat.content"
                :status="stat.status"
            />
        </div>
    </div>
</template>

<script>
import StatisticItem from "../molecules/statistic-item.vue";
import DateRangePicker from "../molecules/date-range-picker.vue";
import moment from "moment";

export default {
    components: {
        StatisticItem,
        DateRangePicker
    },
    props: {
        statistics: {
            type: Array,
            default() {
                return []
            }
        },
        dates: {
            type: Object,
            default() {
                return {
                    start: "",
                    end: ""
                }
            }
        }
    },
    computed: {
        selectedMonth() {
            return moment(this.localDates.end || new Date()).format("MMMM, YYYY")
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
        }
    },
    data() {
        return {
            localDates: {
                first: "",
                last: ""
            }
        }
    }
};
</script>

<style lang="scss">
.statistics-box {
    background: #3B566E;
    color: white;
    border-radius: 8px;
    padding: 1.5rem 2.5rem 3.7rem 2.5rem;
    overflow-x:auto;

    &__header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
    }
    &__date, &__date-selector {
        font-weight: 600;
    }

    &__content {
        display: flex;
    }
}


.static-item-local {
    position: relative;
    margin-right: 5%;
    &:first-child::after {
        position: absolute;
        background: white;
        width: 1px;
        height: 60%;
        content: '';
        top: 20%;
        right: 4rem;
    }
}
</style>
