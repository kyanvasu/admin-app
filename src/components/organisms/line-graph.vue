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
        </div>
    </div>
</template>

<script>
export default {
    props: {
        chartData: {
            type: Object,
            required: true
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
            initOptions: { },
            chartColors: ["#8582D1"]
        };
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
    }
}
</style>
