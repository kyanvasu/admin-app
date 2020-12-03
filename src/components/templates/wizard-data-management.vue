<template>
    <form-wizard
        ref="Wizard"
        v-model="step"
        :show-steps="false"
        :steps="steps"
        @finished="$emit('finished')"
        @reset="$emit('reset')"
    >
        <!-- filesystem data-->
        <form-wizard-tab
            name="data1"
            title="What about the data"
            description="Select a project type to get started"
        >
            <div>
                <general-box
                    v-for="filesystem in filesystems"
                    :key="filesystem"
                    :clickable="true"
                    :title="filesystem"
                    class="project-types mb-4"
                    icon-class="fa fa-pc"
                    theme-color="#8582D1"
                    title-color="#707070"
                    :show-action="false"
                    :selected="formData.filesystem == filesystem"
                    @click="formData.filesystem=filesystem"
                />
            </div>
        </form-wizard-tab>
        <!-- End of filesystem data -->

        <!-- language data -->
        <form-wizard-tab
            name="data2"
            title="What about the data"
            description="Select a project type to get started"
        >
            <div>
                <div class="form-group">
                    <label for="">Language</label>
                    <input v-model="formData.language" class="form-control">
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of language -->

        <!-- timezone Data -->
        <form-wizard-tab
            name="data3"
            title="What about the data"
            description="Select a project type to get started"
        >
            <div>
                <div class="form-group">
                    <label for="">Timezone</label>
                    <input v-model="formData.timezone" type="text" class="form-control">
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of timezone Data -->

        <!-- currency Data -->
        <form-wizard-tab
            name="data3"
            title="What about the data"
            description="Select a project type to get started"
        >
            <div>
                <div class="form-group">
                    <label for="">Currency</label>
                    <input v-model="formData.currency" type="text" class="form-control">
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of currency Data -->
    </form-wizard>
</template>

<script>
import FormWizard from "@c/organisms/wizard.vue";
import FormWizardTab from "@c/molecules/wizard-tab.vue";
import GeneralBox from "@c/molecules/general-box";

export default {
    components: {
        FormWizard,
        FormWizardTab,
        GeneralBox
    },
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        },
        filesystems: {
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
                name: "filesystem"
            },
            {
                name: "language"
            },
            {
                name: "timezone"
            },
            {
                name: "currency"
            }],
            step: 0
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
