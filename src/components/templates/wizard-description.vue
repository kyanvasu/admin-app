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
            title="Let's talk about your project"
            description="General information"
        >
            <div>
                <div class="form-group">
                    <label for="">Company or Project Name</label>
                    <input v-model="formData.name" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">How'd you describe your project</label>
                    <textarea
                        id=""
                        v-model="formData.description"
                        name=""
                        cols="30"
                        rows="10"
                        class="form-control"
                    />
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of general information -->

        <!-- Colors and photo -->
        <form-wizard-tab
            name="description"
            title="Let's talk about your project"
            description="Select colors"
        >
            <div>
                <div class="form-group">
                    <label for="">Company or Project Name</label>
                    <input v-model="formData.mainColor" type="color" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">How'd you describe your project</label>
                    <input v-model="formData.secundaryColor" type="color" class="form-control">
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of Colors and photo -->

        <!-- URL Data -->
        <form-wizard-tab
            name="description"
            title="Let's talk about your project"
            description="And Last, do you have any url in mind?"
        >
            <div>
                <div class="form-group">
                    <label for="">Type your URL</label>
                    <input v-model="formData.url" type="text" class="form-control">
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of URL Data -->
    </form-wizard>
</template>

<script>
import FormWizard from "@c/molecules/wizard.vue";
import FormWizardTab from "@c/molecules/wizard-tab.vue";

export default {
    components: {
        FormWizard,
        FormWizardTab
    },
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            isCreating: false,
            isSaved: false,
            steps: [{
                name: "description1"
            },
            {
                name: "description2"
            },
            {
                name: "description3"
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
