<template>
    <modal
        :draggable="true"
        :adaptive="true"
        :scrollable="true"
        name="notification-modal"
        height="678px"
        width="905px"
        @before-open="beforeOpen"
        @before-close="beforeClose"
    >
        <div class="basic-modal">
            <div class="row modal-header">
                <div class="col d-flex align-items-center">
                    <a class="ml-auto" href="#" @click="$modal.hide('basic-modal')">x</a>
                </div>
            </div>
            <div class="row modal-body">
                <slot name="icon">
                    <i :class="iconClass" />
                </slot>
                <h4>
                    {{ title }}
                </h4>
                <div class="col">
                    <div slot="container" class="row  m-b-20">
                        <div class="col-12" v-html="message" />
                    </div>
                </div>
            </div>
            <div class="row modal-footer">
                <div v-for="(button, index) in buttons" :key="'button-' + index" class="col">
                    <button :class="button.class" class="btn btn-block" @click="button.handler">
                        {{ button.title }}
                    </button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>

export default {
    name: "NotificationModal",
    props: {
        iconClass: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            buttons: [],
            title:"",
            message:""
        }
    },
    methods: {
        beforeOpen(event) {
            this.buttons = event.params.buttons;
            this.title = event.params.title || "";
            this.message = event.params.message || " Are you Sure?";
        },
        beforeClose() {
            this.buttons = [];
            this.title = "";
            this.message = "";
        }
    }
}
</script>

<style lang="scss" scoped>
.basic-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 8px;

    .modal-body {
        display: block;
        height: 100%;
    }

    .modal-header {
        width: 100%;
        h5 {
            color: var(--base-color);
            margin: 0;
        }
        border: none;
    }

    .modal-footer {
        width: 100%;
    }

    .section-title {
        font-weight: 700;
    }
}
</style>
