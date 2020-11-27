<template>
    <div class="statistics-box kanvas-scroller">
        <div class="statistics-box__header">
            <div class="statistics-box__date">
                July, 2020
            </div>
            <div class="statistics-box__date-selector">
                Last Month
                <i class="fas fa-angle-down"></i>
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

export default {
    components: {
        StatisticItem
    },
    props: {
        statistics: {
            type: Array,
            default() {
                return []
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
