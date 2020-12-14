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
        <div class="square-action-box__title">
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
    --title-color: #707070;
    --border-color: #dddddd;
    --action-color: #FD8484;
}
.square-action-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 160px;
    height: 160px;
    border-radius: 8px;
    padding: 1.9rem 1.5rem;
    background: var(--background-color);
    justify-content: space-between;
    box-shadow: 4px 4px 4px #9090904A;

    &__action {
        color: var(--action-color);
        cursor: pointer;
        margin-bottom: 14px;
    }

    &__title {
        color: var(--title-color);
        font-weight: bold;
        font-size: 14px;
    }
}
</style>
