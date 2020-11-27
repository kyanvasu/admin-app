<template>
    <div ref="SquareActionBox" class="square-action-box">
        <div
            v-if="iconClass"
            class="square-action-box__action"
            @click="$emit('action')"
        >
            <slot name="icon">
                <i :class="iconClass" />
            </slot>
        </div>
        <div class="general-box__title">
            {{ title }}
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
        backgroundColor: {
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
        const documentRoot = this.$refs.SquareActionBox;
        documentRoot.style.setProperty("--background-color", this.backgroundColor);
        documentRoot.style.setProperty("--icon-color", this.iconColor || this.titleColor || this.themeColor);
        documentRoot.style.setProperty("--border-color", this.borderColor);
        documentRoot.style.setProperty("--action-color", this.actionColor);
    }

}
</script>

<style lang="scss">
:root {
    --background-color: white;
    --title-color: #909090;
    --border-color: #dddddd;
    --action-color: #FD8484;
}
.square-action-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 222px;
    border-radius: 8px;
    padding: 1rem 2rem;
    background: var(--background-color);
    justify-content: space-between;
    border: 1px solid var(--border-color);
    box-shadow: 4px 4px 4px #9090904A;

    &__action {
        color: var(--action-color);
        cursor: pointer;
        margin-bottom: 14px;
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
}
</style>
