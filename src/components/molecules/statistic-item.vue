<template>
    <div ref="StatisticItem" class="statistic-item">
        <div class="statistic-item__title">
            {{ title }}
        </div>
        <div class="statistic-item__content status">
            {{ content }}

            <div v-if="status" class="statistic-item__status">
                <i :class="iconClass" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "",
            validator(value) {
                return ["success", "danger", ""].includes(value);
            }
        },
        size: {
            type: Number,
            default: 16
        },
        statusMargin: {
            type: String,
            default: "5rem"
        },
        statusSpace: {
            type: String,
            default: "3rem"
        },
        contentColor: {
            type: String,
            default: ""
        }
    },
    computed: {
        iconClass() {
            const statusIcons = {
                success: "fas fa-angle-up",
                danger: "fas fa-angle-down"
            }
            return statusIcons[this.status] || ""
        },
        iconColor() {
            const statusIcons = {
                success: "#ABEA97",
                danger: "#FF8484"
            }
            return statusIcons[this.status] || ""
        }
    },
    watch: {
        status: {
            handler() {
                const documentRoot = this.$refs.StatisticItem;
                documentRoot && documentRoot.style.setProperty("--status-color", this.iconColor);
            }
        }
    },
    mounted() {
        const documentRoot = this.$refs.StatisticItem;
        documentRoot.style.setProperty("--size", `${this.size}px`);
        documentRoot.style.setProperty("--status-margin", `${this.statusMargin}`);
        documentRoot.style.setProperty("--status-space", `-${this.statusSpace}`);
        documentRoot.style.setProperty("--size-middle", `${this.size / 2}px`);
        documentRoot.style.setProperty("--status-color", this.iconColor);
        if (this.contentColor) {
            documentRoot.style.setProperty("--content-color", this.contentColor);
        }
    }
};
</script>

<style lang="scss">
.statistic-item {
    &__title {
        color: var(--base-color);
        font-size: 1rem;
        font-weight: 600;
    }
    &__content {
        font-size: 2rem;
        position: relative;
        font-weight: 500;
        color: var(--content-color);
        margin-right: var(--status-margin);

    }

    &__status {
        position: absolute;
        right: var(--status-space);
        font-size: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--size);
        height: var(--size);
        background: var(--status-color);
        color: white;
        border-radius: 50%;
        top: calc(50% - var(--size-middle));
    }

}
</style>
