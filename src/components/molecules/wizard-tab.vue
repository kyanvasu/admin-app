<template>
    <div v-show="active" class="wizard-tab">
        <h4 v-if="title" class="wizard-tab__title">
            {{ title }}
        </h4>
        <p v-if="description" class="wizard-tab__description">
            {{ description }}
        </p>

        <div class="wizard-tab__display">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        beforeChange: {
            type: Function
        }
    },
    data() {
        return {
            active: false
        }
    },
    methods: {
        changeActive(status) {
            this.active = status
        }
    }
}
</script>

<style lang="scss" scoped>
    .wizard-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__title {
            margin-top: 66px;
            color: #8582D1;
            font-weight: 600;
            font-size: 21px;
        }

        &__description {
            color: #707070;
            font-size: 16px;
            font-weight: 600;
        }

        &__display {
            width: 80%;
            display: flex;
            justify-content: center;
        }
    }

</style>
