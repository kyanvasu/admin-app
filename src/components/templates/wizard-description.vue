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
            name="general"
            title="Let's talk about your project"
            description="General information"
            :before-change="validateFields.bind(null, ['name'])"
        >
            <div class="kanvas-form w-75">
                <div class="form-group">
                    <!-- <label for="">Company or Project Name</label> -->
                    <input
                        v-model="formData.name"
                        type="text"
                        class="form-control"
                        placeholder="Company or Project Name"
                    >
                    <small v-if="isInvalid" class="text-danger"> This field is required </small>
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

        <!-- Branding and colors -->
        <form-wizard-tab
            name="colors"
            title="Let's talk about your project"
            description="Branding and colors"
            :before-change="validateFields.bind(null, ['mainColor', 'secondaryColor'])"
        >
            <div class="kanvas-form w-100">
                <div class="add-image__container">
                    <profile-uploader
                        class=" mr-5"
                        action="/filesystem"
                        :drag="true"
                        :image-url="formData.settings.logo"
                        @loaded="updateProfile"
                    />
                </div>

                <div class="form-group">
                    <!-- <label for="">Main Color</label> -->
                    <color-picker v-model="formData.settings.main_color" placeholder="Main Color" />
                    <small v-if="isInvalid" class="text-danger"> This field is required </small>
                </div>
                <div class="form-group">
                    <!-- <label for="">Secondary Color</label> -->
                    <color-picker v-model="formData.settings.secondary_color" placeholder="Secondary Color" />
                    <small v-if="isInvalid" class="text-danger"> This field is required </small>
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of Branding and colors -->

        <!-- URL Data -->
        <form-wizard-tab
            name="description"
            title="Let's talk about your project"
            description="And Last, do you have any url in mind?"
        >
            <div class="kanvas-form w-100 mt-5">
                <div class="form-group">
                    <input v-model="formData.url" type="text" class="form-control" placeholder="Type your url here">
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of URL Data -->
    </form-wizard>
</template>

<script>
import FormWizard from "@c/organisms/wizard.vue";
import FormWizardTab from "@c/molecules/wizard-tab.vue";
import ColorPicker from "@c/molecules/color-picker.vue";
import ProfileUploader from "@c/molecules/profile-uploader";
import { wizardMixins } from "@/utils/mixins";

export default {
    components: {
        FormWizard,
        FormWizardTab,
        ColorPicker,
        ProfileUploader
    },
    mixins: [wizardMixins],
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
            imageUrl: "",
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
        },
        updateProfile(profile) {
            this.formData.settings.logo = profile[0].url;
            this.formData.files = profile;
        }
    }
}
</script>

<style lang="scss" scoped>
.kanvas-form .form-group {
    margin-bottom: 42px;
    [type=text].form-control {
        border: none;
        padding-left: 0;
        padding-right: 0;
        border-radius: 0 0 0 0 !important;
        border-bottom: 1.5px solid #8582D1;
    }

    textarea.form-control {
        border: 1.5px solid #8582D1;
    }

}
.add-image__container {
    margin: auto;
    margin-bottom: 40px;
    width: 150px;
    height: 150px;
}
</style>
