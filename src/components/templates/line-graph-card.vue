<template>
    <div class="line-graph">
        <h4 class="line-graph__title">
            {{ title }}
        </h4>
        <div class="card stat-card">
            <header class="stat-card__header d-flex justify-content-end">
                <h5 class="stat-card__action" @click="openModal">
                    See More
                </h5>
            </header>

            <slot name="content" />

            <modal
                :draggable="true"
                :adaptive="true"
                :scrollable="true"
                :name="`${modalId}-graph-modal`"
                height="auto"
                width="70%"
            >
                <div class="graphic-modal">
                    <div class="graphic-modal__title">
                        {{ title }}
                    </div>
                    <slot name="content" />
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
import uuid from "uuid/v4"

export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            modalId: uuid()
        };
    },
    methods: {
        openModal() {
            this.$modal.show(`${this.modalId}-graph-modal`);
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
            cursor: pointer;
        }

        &__footer {
            display: flex;
            justify-content: flex-end;
            color: #8582d1;
        }
    }
}

.graphic-modal {
    padding: 50px 25px;

    &__title {
        margin-left: 100px;
        font-size: 21px;
        color: #8582d1;
        margin-bottom: 10px;
    }
}
</style>
