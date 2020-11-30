<template>
    <div class="wizzard">
        <div class="steps">
            <div
                v-for="(step, index) in steps"
                :key="step.title"
                class="step-item"
                :class="{
                    active: value == index,
                    passed: value > index
                }"
            >
                <div class="load" />
                <div
                    class="circle"
                    @click="handleClick(index)"
                >
                    <i v-if="value == index" class="fas fa-check" />
                </div>
                <div class="step-info">
                    <div class="title">
                        {{ step.title }}
                    </div>
                    <div class="description">
                        {{ step.description }}
                    </div>
                </div>
            </div>
        </div>
        <div class="display">
            <div v-for="(step, index) in steps" :key="`display-${step.title}`">
                <template v-if="value == index">
                    <slot />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number
        },
        steps: {
            type: Array
        }
    },
    data() {
        return {
            localValue: 0
        }
    },
    watch: {
        localValue() {
            return this.$emit("input", this.localValue)
        },
        value() {
            if (this.value != this.localValue) {
                this.localValue = value;
            }
        }
    },
    methods: {
        next() {
            if (this.localValue < this.steps.length - 1) {
                this.localValue++
            }
        },
        handleClick(index) {
            if (index <= this.value) {
                this.localValue = index;
            }
        },
        previous() {
            if (this.localValue > 0) {
                this.localValue--
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .wizzard {
        padding: 24px 48px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .steps {
        background: #F7F7F7;
        border-radius: 50px;
        height: 30px;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .step-item {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;

        .load {
            position: absolute;
            width: 0;
            height: 100%;
            transition: width ease .5s;
        }

        &:first-child {
            .load {
                border-top-left-radius: 50px;
                border-bottom-left-radius: 50px;
            }
        }

        &:last-child {
            .load {
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
            }
        }

        &.active,&.passed {
            .load {
                background: #8582D1;
                transition: width ease .5s;
                width: 100%;
            }

            .circle {
                background: white;
                color: #8582D1;
                cursor: pointer;
            }
        }

        &.active {
            .load {
                border-top-right-radius: 50px;
                border-bottom-right-radius: 50px;
            }
        }

        .circle {
            background: #DEDEDE;
            border-radius: 50%;
            margin-left: 15%;
            height: 14px;
            width: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            z-index: 2;
        }

        .step-info {
            position: absolute;
            bottom: -50px;
            width: 100%;
        }

        .title {
            color: #707070;
            font-size: 14px;
            font-weight: bold;
        }

        .description {
            color: #9B9B9B;
            font-size: 13px;
        }
    }

    .display {
        width: 100%;
        height: 100%;
        margin-top: 60px;
    }
</style>
