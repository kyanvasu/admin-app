<template>
    <div ref="GeneralBox" class="shadow-card">
        <div class="shadow-card__left">
            <div v-if="iconClass" class="general-box__icon">
                <slot name="icon">
                    <i :class="iconClass" />
                </slot>
            </div>
            <div>
                <div class="general-box__title">
                    {{ title }}
                </div>
                <div class="general-box__description">
                    {{ description }}
                </div>
            </div>
        </div>

        <div class="shadow-card__right" @click.stop="$emit('action')">
            <div class="general-box__action">
                <slot name="action">
                    <i class="fas fa-ellipsis-v" />
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
            default: "fa fa-close"
        },
        type: {
            type: String,
            default: "success"
        },
        themeColor: {
            type: String,
            default: ""
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
        }
    },
    mounted() {
        const documentRoot = this.$refs.GeneralBox;
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

.general-box {
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
        cursor: pointer;
    }
}
</style>
