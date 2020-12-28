<template>
    <div class="main container">
        <div class="apps-create__container">
            <!-- Welcome card -->
            <card-action
                v-if="!isCreating && !isSaved"
                title="Let's create a new project"
                description="We'll need some information to begin with"
                body="In this section we'll figureout all the information related to the project. Dont worry it wont take long"
                action-button-text="Get Started"
                footer-note="Build your web project using our Baka Packages and Kanvas project to save energy and time"
                @action="toggleCreating"
            />
            <!-- End of welcome card -->

            <!-- Wizard -->
            <form-wizard
                v-else-if="isCreating"
                ref="Wizard"
                v-model="step"
                class="app-wizard"
                :steps="steps"
                @finished="sendData"
            >
                <!-- Info tab -->
                <form-wizard-tab
                    name="info"
                    title="Project Information"
                    description="Select a project type to get started"
                    :before-change="validateFields.bind(null, ['selectedProject'])"
                >
                    <div>
                        <general-box
                            v-for="project in projectTypes"
                            :key="project.name"
                            :clickable="true"
                            :title="project.label"
                            class="project-types"
                            :icon-class="project.iconClass"
                            :icon="project.icon"
                            theme-color="#8582D1"
                            title-color="#707070"
                            :show-action="false"
                            :class="{selected: formData.settings.project_type == project.name}"
                            @click="formData.settings.project_type=project.name"
                        />
                        <small v-if="isInvalid" class="text-danger text-center w-full d-block"> This field is required </small>
                    </div>
                </form-wizard-tab>

                <!-- Development tab -->
                <form-wizard-tab
                    name="development"
                    title="Development Settings"
                    description="Select your development setup"
                    :before-change="validateFields.bind(null, ['developmentSetup'])"
                >
                    <div>
                        <general-box
                            v-for="setup in developmentSetups"
                            :key="setup.name"
                            :clickable="true"
                            :title="setup.label"
                            class="project-types"
                            :icon-class="setup.iconClass"
                            theme-color="#8582D1"
                            title-color="#707070"
                            :show-action="false"
                            :class="{selected: formData.settings.development_type == setup.name}"
                            @click="formData.settings.development_type=setup.name"
                        />
                        <small v-if="isInvalid" class="text-danger text-center w-full d-block"> This field is required </small>
                    </div>
                </form-wizard-tab>

                <!-- Description Tab -->
                <form-wizard-tab
                    name="description"
                >
                    <description-wizard
                        ref="DescriptionWizard"
                        :form-data="formData"
                        @finished="$refs.Wizard.next()"
                        @reset="$refs.Wizard.previous()"
                    />
                </form-wizard-tab>

                <!-- Data Magagement Tab -->
                <form-wizard-tab
                    name="data"
                >
                    <data-management-wizard
                        ref="DataManagementWizard"
                        :form-data="formData"
                        :filesystems="filesystems"
                        @finished="$refs.Wizard.next()"
                        @reset="$refs.Wizard.previous()"
                    />
                </form-wizard-tab>

                <!-- General Information -->
                <form-wizard-tab
                    name="description"
                    title="Now some serious stuff"
                    description="Select a project type to get started"
                >
                    <div class="">
                        <general-box
                            v-for="auth in authManagers"
                            :key="auth.field"
                            :clickable="true"
                            :title="auth.label"
                            class="project-types mb-4"
                            icon-class="fa fa-pc"
                            theme-color="#8582D1"
                            title-color="#707070"
                            :show-action="false"
                            :selected="formData[auth.field]"
                            @click="formData[auth.field]=!formData[auth.field]"
                        />
                        <small v-if="isInvalid" class="text-danger text-center w-full d-block"> This field is required </small>
                    </div>
                </form-wizard-tab>
                <!-- End of general information -->
            </form-wizard>
            <!--  end of creation wizard -->

            <!-- Finish card -->
            <card-action
                v-if="isSaved"
                icon-class="far fa-check-circle"
                title="Mission acomplished!"
                description="You just added a new account"
                body="Now lets go back to the base"
                action-button-text="Go to dashboard"
                @action="goToDashboard"
            />
            <!-- End of finish card -->
        </div>

        <!-- Controls -->
        <div v-if="isCreating" class="buttons-container">
            <button v-if="[2,3].includes(step)" class="btn btn-primary mr-3" @click="previousNested()">
                Back
            </button>

            <button
                v-else-if="step>0"
                class="btn btn-primary mr-3"
                @click="$refs.Wizard.previous()"
            >
                Back
            </button>

            <button v-if="[2,3].includes(step)" class="btn btn-primary" @click="nextNested()">
                {{ continueButtonText }}
            </button>

            <button v-else class="btn btn-primary" @click="$refs.Wizard.next()">
                {{ continueButtonText }}
            </button>
        </div>
        <!-- End of controls -->
    </div>
</template>

<script>
import CardAction from "@c/molecules/card-action.vue";
import FormWizard from "@c/organisms/wizard.vue";
import FormWizardTab from "@c/molecules/wizard-tab.vue";
import GeneralBox from "@c/molecules/general-box";
import DescriptionWizard from "@c/templates/wizard-description.vue";
import DataManagementWizard from "@c/templates/wizard-data-management.vue";
import { wizardMixins } from "@/utils/mixins";

export default {
    components: {
        CardAction,
        FormWizard,
        FormWizardTab,
        GeneralBox,
        DescriptionWizard,
        DataManagementWizard
    },
    mixins: [wizardMixins],
    data() {
        return {
            isCreating: false,
            isSaved: false,
            steps: [{
                name: "info",
                title: "Project Info",
                description: "Project Type"
            },
            {
                name: "development",
                title: "Development",
                description: "Dev Setup"
            },
            {
                name: "description",
                title: "Description",
                description: "Name and Details"
            },
            {
                name: "data",
                title: "Data Management",
                description: "Data Settings"
            },
            {
                name: "auth",
                title: "Auth",
                description: "Auth Management"
            }],
            step: 0,
            formData: {
                name: "",
                description:"",
                payments_active: false,
                ecosystem_auth : false,
                is_public : false,
                default_apps_plan: 1,
                settings: {
                    project_type: "",
                    development_type: "",
                    logo: "",
                    main_color: "",
                    secondary_color:"",
                    filesystem: "",
                    language: "",
                    timezone: "",
                    currency: ""
                }
            },
            projectTypes: [
                {
                    name: "web",
                    iconClass: "fas fa-desktop",
                    label: "Web"
                },
                {
                    name:"mobile",
                    iconClass: "fas fa-mobile",
                    label: "Mobile"
                },
                {
                    name: "both",
                    iconClass: "",
                    label: "Both",
                    icon: "/images/mobile-pc.svg"
                }
            ],
            developmentSetups: [
                {
                    name: "php",
                    iconClass: "fab fa-php",
                    label: "PHP"
                },
                {
                    name:"js",
                    iconClass: "fab fa-js-square",
                    label: "JavaScript"
                }
            ],
            filesystems: ["local", "s3"],
            authManagers: [{
                label: "Public",
                field: "is_public"
            },
            {
                label: "Payment",
                field: "payments_active"
            },
            {
                label: "Kanvas Auth",
                field: "ecosystem_auth"

            }]
        }
    },
    computed: {
        continueButtonText() {
            return this.step == this.steps.length - 1 ? "Finish" : "Continue";
        },
        refName() {
            const refsNames = {
                2: "DescriptionWizard",
                3: "DataManagementWizard"
            }

            return refsNames[this.step];
        }
    },
    methods: {
        toggleCreating() {
            this.isCreating = !this.isCreating;
        },
        sendData() {
            this.isLoading = true;
            const formData = { ...this.formData }
            delete formData.files;
            formData.settings.currency = formData.settings.currency ? formData.settings.currency.currency : ""
            formData.settings.language = formData.settings.language ? formData.settings.language.id : ""
            formData.settings = JSON.stringify(formData.settings);

            axios({
                url: "/apps",
                method: "POST",
                data: formData
            }).then(() => {
                this.isSaved = true;
                this.isCreating = false;
            }).finally(() => {
                this.isLoading = false;
            })
        },

        nextNested() {
            this.$refs[this.refName].next()
        },

        previousNested() {
            this.$refs[this.refName].previous()
        },

        async goToDashboard() {
            await this.$store.dispatch("Application/getApps")
            this.$router.push({
                name: "apps"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.apps-create__container {
    max-width: 905px;
    height: 678px;
    background: white;
    padding: 0 0 0 0;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0px 0px 20px #3B566E1A;
}

.buttons-container {
    display: flex;
    max-width: 905px;
    justify-content: flex-end;
    margin: auto;
    margin-top: 10px;
}

.selected {
    border: 2px solid #8582D1;
}

.project-types {
    margin-bottom: 20px;
    min-width: 274px;
    background: #F7F7F7;
    height: 100px;
}

.app-wizard {
    padding: 24px 48px;
}
</style>
