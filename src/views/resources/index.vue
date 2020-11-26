<template>
    <component :is="$route.params.resource" :is-editing="isEditing" />
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "CreateResource",
    components: {
        // "leads": () => import(/* webpackChunkName: "resource-leads" */ "@v/resources/leads/"),
    },
    data() {
        return {
            currentResource: {}
        };
    },
    computed: {
        ...mapState({
            applicationData: state => state.Application.data
        }),
        isEditing() {
            return this.$route.name.includes("edit");
        }
    }
}
</script>
