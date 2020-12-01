<template>
    <form-wizzard
        ref="Wizzard"
        v-model="step"
        :show-steps="false"
        :steps="steps"
        @finished="$emit('finished')"
        @reset="$emit('reset')"
    >
        <!-- General Information -->
        <form-wizzard-tab
            name="description"
            title="Now some serious stuff"
            description="Select a project type to get started"
        >
            <div>
                <general-box
                    v-for="auth in authManagers"
                    :key="auth"
                    :clickable="true"
                    :title="auth"
                    class="project-types mb-4"
                    icon-class="fa fa-pc"
                    theme-color="#8582D1"
                    title-color="#707070"
                    :show-action="false"
                    :selected="formData.authManager == auth"
                    @click="formData.authManager=auth"
                />
            </div>
        </form-wizzard-tab>
        <!-- End of general information -->

        <!-- Colors and photo -->
        <form-wizzard-tab
            name="description"
            title="Now some serious stuff"
            description="Select a project type to get started"
        >
            <div>
                <general-box
                    v-for="userAuth in authUsers"
                    :key="userAuth"
                    :clickable="true"
                    :title="userAuth"
                    class="project-types mb-4"
                    icon-class="fa fa-pc"
                    theme-color="#8582D1"
                    title-color="#707070"
                    :show-action="false"
                    :selected="formData.authUsersMethod == userAuth"
                    @click="formData.authUsersMethod=userAuth"
                />
            </div>
        </form-wizzard-tab>
        <!-- End of Colors and photo -->
    </form-wizzard>
</template>

<script>
import FormWizzard from "@c/molecules/wizzard.vue";
import FormWizzardTab from "@c/molecules/wizzard-tab.vue";
import GeneralBox from "@c/molecules/general-box";

export default {
    components: {
        FormWizzard,
        FormWizzardTab,
        GeneralBox
    },
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        },
        authManagers: {
            type: Array,
            default() {
                return []
            }
        },
        authUsers: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            isCreating: false,
            isSaved: false,
            steps: [{
                name: "auth1"
            },
            {
                name: "auth2"
            }],
            step: 0
        }
    },
    methods: {
        next() {
            this.$refs.Wizzard.next();
        },
        previous() {
            this.$refs.Wizzard.previous();
        }
    }
}
</script>

<style>

</style>
