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
                :steps="steps"
                @finished="sendData"
            >
                <form-wizzard-tab
                    name="info"
                    title="Project Information"
                    description="Select a project type to get started"
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

                <form-wizzard-tab
                    name="development"
                    title="Development Settings"
                    description="Select your development setup"
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

                <form-wizzard-tab
                    name="description"
                    title="Let's talk about your project"
                    description="Select a project type to get started"
                />

                <form-wizzard-tab
                    name="data"
                    title="What about the data"
                    description="Select a project type to get started"
                />

                <form-wizzard-tab
                    name="auth"
                    title="Now some serious stuff"
                    description="Select a project type to get started"
                />
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
            <button
                v-if="step>0"
                class="btn btn-primary mr-3"
                @click="$refs.Wizzard.previous()"
            >
                Back
            </button>
            <button class="btn btn-primary" @click="$refs.Wizzard.next()">
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

export default {
    components: {
        CardAction,
        FormWizzard,
        FormWizzardTab,
        GeneralBox
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
                developmentSetup: ""

            },
            projectTypes: ["web", "mobile", "both"],
            developmentSetups: ["php", "js"]
        }
    },
    computed: {
        continueButtonText() {
            return this.step == this.steps.length - 1 ? "Finish" : "Continue";
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
</style>
