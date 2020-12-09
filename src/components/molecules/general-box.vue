<template>
    <div
        ref="GeneralBox"
        class="shadow-card"
        :class="{clickable: clickable, selected: selected}"
        @click="$emit('click')"
    >
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

        <div v-if="showAction" class="shadow-card__right" @click.prevent="$emit('action')">
            <el-popover
                v-if="actions"
                v-model="show"
                :popper-options="{ boundariesElement: '.shadow-card', gpuAcceleration: false }"
                placement="bottom-end"
                width="250"
                popper-class="general-box__popover"
            >
                <div class="dropdown">
                    <ul class="list-group list-group-flush dropdown__body">
                        <button
                            v-for="(action, index) in actions"
                            :key="`single-shortcut-${index}`"
                            class="list-group-item dropdown-item"
                            :class="action.class"
                            @click="$emit('command', index)"
                        >
                            {{ action.label }}
                        </button>
                    </ul>
                </div>


                <div slot="reference" class="general-box__action">
                    <slot name="action">
                        <i class="fas fa-ellipsis-v" />
                    </slot>
                </div>
            </el-popover>

            <div v-else class="general-box__action">
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
        },
        clickable: {
            type: Boolean,
            default: false
        },
        selected: {
            type: Boolean,
            default: false
        },
        showAction: {
            type: Boolean,
            default: true
        },
        actions: {
            type: Array
        }
    },
    mounted() {
        const documentRoot = this.$refs.GeneralBox;
        documentRoot.style.setProperty("--title-color", this.titleColor || this.themeColor);
        documentRoot.style.setProperty("--icon-color", this.iconColor || this.titleColor || this.themeColor);
        documentRoot.style.setProperty("--theme-color", this.themeColor);
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
    transition: all ease .3s;

    &__left,
    &__right {
        display: flex;
        align-items: center;
    }

    &.clickable {
        cursor: pointer;
    }

    &.selected {
        border: 1px solid var(--theme-color);
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

    &__popover {
        padding: 0 0 0 0;
        overflow: hidden;
        top: 180px !important;
    }
}
</style>
