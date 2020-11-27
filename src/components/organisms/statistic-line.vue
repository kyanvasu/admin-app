<template>
    <div ref="StatisticLine" class="statistic-line">
        <general-box
            :title="title"
            :description="description"
            :theme-color="themeColor"
            :icon-class="iconClass"
        >
            <slot slot="icon" name="icon" />
            <slot slot="action" name="action">
                <statistic-item
                    :content="content"
                    :status="status"
                    :size="10"
                    status-margin="0"
                    status-space="1rem"
                    content-color="#9B9B9B"
                />
            </slot>
        </general-box>
    </div>
</template>

<script>
import StatisticItem from "../molecules/statistic-item.vue";
import GeneralBox from "../molecules/general-box"

export default {
    components: {
        StatisticItem,
        GeneralBox
    },
    props: {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },
        iconClass: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            default: "",
            validator(value) {
                return ["success", "danger", ""].includes(value);
            }
        },
        themeColor: {
            type: String,
            default: "#A3A1DC"
        },
        content: {
            type: String,
            default: ""
        }
    }

}
</script>

<style lang="scss">
:root {
    --icon-color: #FD8484;
    --title-color: #FD8484;
    --border-color: #FD8484;
    --action-color: #FD8484;
}
.shadow-card {
    background: white;
    border-radius: 8px;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    border: 1px solid var(--border-color);

    &__left,
    &__right {
        display: flex;
        align-items: center;
    }
}

.notification-box {
    &__title {
        color: var(--title-color);
        font-weight: bold;
    }

    &__description {
        color: #aaa;
    }

    &__icon {
        color: var(--icon-color);
        margin-right: 15px;
        font-size: 1.6rem;
    }

    &__action {
        color: var(--action-color);
    }
}
</style>
