<template>
    <form-wizard
        ref="Wizard"
        v-model="step"
        :show-steps="false"
        :steps="steps"
        @finished="$emit('finished')"
        @reset="$emit('reset')"
    >
        <!-- General Information -->
        <form-wizard-tab
            name="description"
            title="Now some serious stuff"
            description="Select a project type to get started"
            :before-change="validateFields.bind(null, ['authManager'])"
        >
            <div class="">
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
                <small v-if="isInvalid" class="text-danger text-center w-full d-block"> This field is required </small>
            </div>
        </form-wizard-tab>
        <!-- End of general information -->

        <!-- Colors and photo -->
        <form-wizard-tab
            name="description"
            title="Now some serious stuff"
            description="Select a project type to get started"
            :before-change="validateFields.bind(null, ['authUsersMethod'])"
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
                <small v-if="isInvalid" class="text-danger text-center w-full d-block"> This field is required </small>
            </div>
        </form-wizard-tab>
        <!-- End of Colors and photo -->
    </form-wizard>
</template>

<script>
import FormWizard from "@c/organisms/wizard.vue";
import FormWizardTab from "@c/molecules/wizard-tab.vue";
import GeneralBox from "@c/molecules/general-box";
import { wizardMixins } from "@/utils/mixins";

export default {
    components: {
        FormWizard,
        FormWizardTab,
        GeneralBox
    },
    mixins: [wizardMixins],
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
            step: 0,
            isInvalid: false
        }
    },
    methods: {
        next() {
            this.$refs.Wizard.next();
        },
        previous() {
            this.$refs.Wizard.previous();
        }
    }
}
</script>

<style>

</style>
