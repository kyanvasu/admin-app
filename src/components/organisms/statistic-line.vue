<template>
    <div class="shadow-card" ref="NotificationBox">
        <div class="shadow-card__left">
            <div class="notification-box__icon" v-if="iconClass">
                <slot name="icon">
                    <i :class="iconClass" />
                </slot>
            </div>
            <div>
                <div class="notification-box__title">
                    {{ title }}
                </div>
                <div class="notification-box__description">
                    {{ description }}
                </div>
            </div>
        </div>

        <div class="shadow-card__right">
            <statistic-item
                :content="content"
                :status="status"
                :size="10"
                status-margin="0"
                status-space="1rem"
                content-color="#9B9B9B"
            />
            <slot name="action">

            </slot>
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
        type: {
            type: String,
            default: "success"
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
        titleColor: {
            type: String,
            default: ""
        },
        borderColor: {
            type: String,
            default: "#eeeeee"
        },
        iconColor: {
            type: String,
            default: ""
        },
        actionColor: {
            type: String,
            default: "#aaaaaa"
        },
        content: {
            type: String,
            default: ""
        }
    },
    mounted() {
        const documentRoot = this.$refs.NotificationBox;
        documentRoot.style.setProperty("--title-color", this.titleColor || this.themeColor);
        documentRoot.style.setProperty("--icon-color", this.iconColor || this.titleColor || this.themeColor);
        documentRoot.style.setProperty("--border-color", this.borderColor);
        documentRoot.style.setProperty("--action-color", this.actionColor);
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
