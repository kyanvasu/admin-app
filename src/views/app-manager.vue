<template>
    <apps-template :recent-apps="recentApps" :apps="appList" />
</template>

<script>
import AppsTemplate from "@c/templates/apps-list";
import { mapState } from "vuex"
export default {
    components: {
        AppsTemplate
    },
    computed: {
        ...mapState({
            appList: state => state.Application.apps
        }),
        recentApps() {
            return this.appList.slice(0,2)
        }
    }

}
</script>

<style>

</style>
