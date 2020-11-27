<template>
    <div ref="NotificationBox" class="notification-box">
        <general-box
            :title="title"
            :description="description"
            :icon-class="iconClass"
            :type="type"
            :theme-color="themeColor"
            :border-color="borderColor"
            :icon-color="iconColor"
            :action-color="actionColor"
            @action="openModal"
        />
        <notification-modal
            :icon-class="iconClass"
        >

        </notification-modal>
    </div>
</template>

<script>
import GeneralBox from "../molecules/general-box";
import NotificationModal from "../molecules/notification-modal";

export default {
    components: {
        GeneralBox,
        NotificationModal
    },
    props:{
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
        }
    },
    methods: {
        openModal() {
            this.$modal.show("notification-modal", {
                title: "Your Plan is suspended",
                message: "We'll need some information to begin with",
                buttons: [{
                    title: "Manage",
                    class: "btn-danger",
                    handler: () => {
                        this.$modal.hide("basic-modal");

                    }
                }]
            });
        }
    }

}
</script>

<style lang="scss">

</style>
