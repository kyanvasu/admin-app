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
            @action="$emit('action')"
        />
    </div>
</template>

<script>
import GeneralBox from "../molecules/general-box";

export default {
    components: {
        GeneralBox
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
    }

}
</script>

<style lang="scss">

</style>
