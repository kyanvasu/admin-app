<template>
    <div ref="ColorPicker" class="color-picker">
        <input
            type="text"
            readonly
            :value="localValue"
            :placeholder="placeholder"
            class="color-picker__input form-control"
            @click="$refs.Picker.click()"
        >
        <input
            id=""
            ref="Picker"
            v-model="localValue"
            type="color"
            class="color-picker__picker"
        >
        <div class="color-picker__preview" @click="$refs.Picker.click()" />
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: ""
        },
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            localValue: ""
        }
    },
    watch: {
        value: {
            handler() {
                if (this.value != this.localValue) {
                    this.localValue = this.value;
                }
            },
            immediate: true
        },
        localValue: {
            handler() {
                if (this.value != this.localValue) {
                    this.setColor()
                    this.$emit("input", this.localValue);
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.setColor();
    },
    methods: {
        setColor() {
            const documentRoot = this.$refs.ColorPicker;
            documentRoot && documentRoot.style.setProperty("--selected-color", this.localValue);
        }
    }
}
</script>

<style lang="scss" scoped>
.color-picker {
    display: flex;
    position: relative;

    &__input.form-control {
        border: none;
        color: #707070;
        padding-left: 0;
        padding-right: 0;
        background: transparent;
        border-bottom: 1px solid #C9C9C9;
        border-radius: 0 0 0 0 !important;
        cursor: pointer;
        font-weight: 600;
    }

    &__picker {
        background: var(--selected-color);
        width: 0px;
        height: 0px;
        opacity: 0;
    }

    &__preview {
        position: absolute;
        background: var(--selected-color);
        width: 20px;
        height: 20px;
        border-radius: 4px;
        right: 5px;
        bottom: 5px;
        border: 1px solid  #C9C9C9;
        cursor: pointer;
    }
}
</style>
