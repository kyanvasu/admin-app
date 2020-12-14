
<template>
    <div class="card-action">
        <p class="card-action__icon">
            <i :class="iconClass" />
        </p>
        <p class="card-action__title">
            {{ title }}
        </p>
        <p class="card-action__description">
            {{ description }}
        </p>
        <div class="card-action__body">
            {{ body }}
        </div>

        <button class="btn btn-primary card-action__action" @click="$emit('action')">
            {{ actionButtonText }}
        </button>
        <div v-if="footerNote" class="card-action__footer">
            <span class="footer-title">Note:</span>
            {{ footerNote }}
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
    props: {
        iconClass: {
            type: String,
            default: "fas fa-mobile-alt"
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        body: {
            type: String
        },
        actionButtonText: {
            type: String
        },
        footerNote: {
            type: String
        }
    }
}
</script>

<style lang="scss">
.card-action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &__icon {
        color: #8582D1;
        margin: 100px 0 30px 0;
        padding: 0 0 0 0;
        font-size: 54px;
    }

    &__title {
        color: #8582D1;
        font-weight: 600;
        font-size: 26px;
        margin: 0;
    }

    &__description {
        color: #707070;
        font-weight: 500;
        font-size: 21px;
        margin: 0;
    }

    &__body {
        color:#CDCDCD;
        font-weight: 500;
        font-size: 18px;
        margin-top: 15px;
        width: 452px;
        text-align: center;
    }

    &__action {
        margin: 157px 0 40px 0;
        height: 49px;
        min-width: 177px;
    }

    &__footer {
        .footer-title {
            color: #8582D1;
            font-weight: 600;
        }
        max-width: 374px;
        color: #9B9B9B;
        font-size: 12px;
        text-align: center;
    }
}
</style>
