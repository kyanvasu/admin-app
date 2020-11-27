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
            <div class="modal__content">
                <div class="modal__header">
                    <slot name="icon">
                        <i :class="iconClass" />
                    </slot>
                    <h4>
                        {{ title }}
                    </h4>

                    <div slot="container" class="modal__description">
                        <div class="col-12" v-html="description" />
                    </div>
                    <div slot="container" class="modal__text">
                        <div class="col-12" v-html="message" />
                    </div>

                </div>

                <div class="modal__actions">
                    <div v-for="(button, index) in buttons" :key="'button-' + index" class="col">
                        <button :class="button.class" class="btn" @click="button.handler">
                            {{ button.title }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>

export default {
    name: "NotificationModal",
    data() {
        return {
            buttons: [],
            title:"",
            message:"",
            iconClass: "fas fa-cancel"
        }
    },
    methods: {
        beforeOpen(event) {
            this.buttons = event.params.buttons;
            this.title = event.params.title || "";
            this.description = event.params.description || "";
            this.message = event.params.message || " Are you Sure?";
            this.iconClass = event.params.iconClass || this.iconClass;
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

    .modal__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section-title {
        font-weight: 700;
        color: #FD8484;
    }

    .btn {
        padding: 15px 40px;
    }

    .modal__actions {
        margin-bottom: 40px;
    }

    .btn-danger {
        background: #FD8484;
    }
}
</style>
