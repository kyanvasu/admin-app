<template>
    <div class="main container">
        <div class="apps-create__container">
            <card-action
                v-if="!isCreating && !isSaved"
                title="Let's create a new project"
                description="We'll need some information to begin with"
                body="In this section we'll figureout all the information related to the project. Dont worry it wont take long"
                action-button-text="Get Started"
                footer-note="Build your web project using our Baka Packages and Kanvas project to save energy and time"
                @action="toggleCreating"
            />
            <form-wizzard
                v-else-if="isCreating"
                ref="Wizzard"
                v-model="step"
                class="app-wizard"
                :steps="steps"
                @finished="sendData"
            >
                <!-- Info tab -->
                <form-wizzard-tab
                    name="info"
                    title="Project Information"
                    description="Select a project type to get started"
                    :before-change="validateFirst"
                >
                    <div>
                        <general-box
                            v-for="projectType in projectTypes"
                            :key="projectType"
                            :clickable="true"
                            :title="projectType"
                            class="project-types"
                            icon-class="fa fa-pc"
                            theme-color="#8582D1"
                            title-color="#707070"
                            :show-action="false"
                            :class="{selected: formData.selectedProject == projectType}"
                            @click="formData.selectedProject=projectType"
                        />
                    </div>
                </form-wizzard-tab>

                <!-- Development tab -->
                <form-wizzard-tab
                    name="development"
                    title="Development Settings"
                    description="Select your development setup"
                    :before-change="validateSecond"
                >
                    <div>
                        <general-box
                            v-for="setup in developmentSetups"
                            :key="setup"
                            :clickable="true"
                            :title="setup"
                            class="project-types"
                            icon-class="fa fa-pc"
                            theme-color="#8582D1"
                            title-color="#707070"
                            :show-action="false"
                            :class="{selected: formData.developmentSetup == setup}"
                            @click="formData.developmentSetup=setup"
                        />
                    </div>
                </form-wizzard-tab>

                <!-- Description Tab -->
                <form-wizzard-tab
                    name="description"
                >
                    <description-wizzard
                        ref="DescriptionWizzard"
                        :form-data="formData"
                        @finished="$refs.Wizzard.next()"
                        @reset="$refs.Wizzard.previous()"
                    />
                </form-wizzard-tab>

                <!-- Data Magagement Tab -->
                <form-wizzard-tab
                    name="data"
                >
                    <data-management-wizzard
                        ref="DataManagementWizzard"
                        :form-data="formData"
                        :filesystems="filesystems"
                        @finished="$refs.Wizzard.next()"
                        @reset="$refs.Wizzard.previous()"
                    />
                </form-wizzard-tab>

                <!-- Auth Tab -->
                <form-wizzard-tab
                    name="auth"
                >
                    <auth-wizzard
                        ref="AuthWizzard"
                        :auth-managers="authManagers"
                        :auth-users="authUsersMethods"
                        :form-data="formData"
                        @finished="$refs.Wizzard.next()"
                        @reset="$refs.Wizzard.previous()"
                    />
                </form-wizzard-tab>
            </form-wizzard>

            <card-action
                v-if="isSaved"
                icon-class="far fa-check-circle"
                title="Mission acomplished!"
                description="You just added a new account"
                body="Now lets go back to the base"
                action-button-text="Go to dashboard"
                @action="goToDashboard"
            />
        </div>

        <div v-if="isCreating" class="buttons-container">
            <button class="btn btn-primary mr-3" v-if="[2,3,4].includes(step)" @click="previousNested()">
                Back
            </button>

            <button
                v-else-if="step>0"
                class="btn btn-primary mr-3"
                @click="$refs.Wizzard.previous()"
            >
                Back
            </button>

            <button class="btn btn-primary" v-if="[2,3,4].includes(step)" @click="nextNested()">
                {{ continueButtonText }}
            </button>

            <button class="btn btn-primary" v-else @click="$refs.Wizzard.next()">
                {{ continueButtonText }}
            </button>
        </div>
    </div>
</template>

<script>
import CardAction from "@c/molecules/card-action.vue";
import FormWizzard from "@c/molecules/wizzard.vue";
import FormWizzardTab from "@c/molecules/wizzard-tab.vue";
import GeneralBox from "@c/molecules/general-box";
import DescriptionWizzard from "@c/templates/wizzard-description.vue";
import AuthWizzard from "@c/templates/wizzard-auth.vue";
import DataManagementWizzard from "@c/templates/wizzard-data-management.vue";

export default {
    components: {
        CardAction,
        FormWizzard,
        FormWizzardTab,
        GeneralBox,
        DescriptionWizzard,
        AuthWizzard,
        DataManagementWizzard
    },
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
                selectedProject: "",
                developmentSetup: "",
                filesystem: "",
                authManager: "",
                authUsersMethod: ""

            },
            projectTypes: ["web", "mobile", "both"],
            developmentSetups: ["php", "js"],
            filesystems: ["local", "s3"],
            authManagers: ["Public", "Payment", "Kanvas Auth"],
            authUsersMethods: ["Public", "Kanvas Auth", "Payment"]
        }
    },
    computed: {
        continueButtonText() {
            return this.step == this.steps.length - 1 ? "Finish" : "Continue";
        },
        refName() {
            const refsNames = {
                2: "DescriptionWizzard",
                3: "DataManagementWizzard",
                4: "AuthWizzard"
            }

            return refsNames[this.step];
        }
    },
    methods: {
        toggleCreating() {
            this.isCreating = !this.isCreating;
        },
        sendData() {
            this.isSaved = true;
            this.isCreating = false;
        },
        validateFirst() {
            if (this.formData.selectedProject) {
                return true;
            }
        },
        validateSecond() {
            if (this.formData.developmentSetup) {
                return true;
            }
        },

        nextNested() {
            this.$refs[this.refName].next()
        },

        previousNested() {
            this.$refs[this.refName].previous()
        },

        goToDashboard() {

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
}

.app-wizard {
    padding: 24px 48px;
}
</style>
