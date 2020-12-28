<template>
    <div class="kanvas-section" :class="{divider: showDivider}">
        <div class="kanvas-section__headear d-flex justify-content-between">
            <div>
                <h4 class="section-title">
                    {{ title }}
                    <p class="section-tagline">
                        {{ tagline }}
                    </p>
                </h4>
            </div>
            <a v-if="actionTitle" href="" class="section-link">
                {{ actionTitle }}
                <i class="fas fa-external-link-alt" />
            </a>
        </div>

        <div class="kanvas-section__content">
            <slot>

            </slot>
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
        tagline: {
            type: String,
            default: ""
        },
        actionTitle: {
            type: String,
            default: ""
        },
        showDivider: {
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
.kanvas-section {
    --text-color: #707070;
    &.divider {
        border-bottom: 1px solid #9B9B9B50;
    }

    .section-title {
        font-size: 26px;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 1.3rem;
        text-transform: none;
    }

    .section-tagline {
        color: #9B9B9B;
        font-size: 17px;
    }

    .section-link {
        color: #8582D1;
        font-size: 19px;
    }
}

</style>
