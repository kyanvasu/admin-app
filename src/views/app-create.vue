<template>
    <div class="main container">
        <div class="apps-create__container">
            <card-action
                v-if="!isCreating"
                title="Let's create a new project"
                description="We'll need some information to begin with"
                body="In this section we'll figureout all the information related to the project. Dont worry it wont take long"
                action-button-text="Get Started"
                footer-note="Build your web project using our Baka Packages and Kanvas project to save energy and time"
                @action="toggleCreating"
            />
            <form-wizzard
                v-else
                ref="Wizzard"
                v-model="step"
                :steps="steps"
            >
                <form-wizzard-tab
                    v-if="step == 0"
                    name="info"
                    title="Project Information"
                    description="Select a project type to get started"
                />

                <template >
                    <div>
                        Development
                    </div>
                </template>

                <template #description>
                    <div>
                        Description
                    </div>
                </template>

                <template #auth>
                    <div>
                        Auth
                    </div>
                </template>
            </form-wizzard>
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
                Continue
            </button>
        </div>
    </div>
</template>

<script>
import CardAction from "@c/molecules/card-action.vue";
import FormWizzard from "@c/molecules/wizzard.vue";
import FormWizzardTab from "@c/molecules/wizzard-tab.vue";

export default {
    components: {
        CardAction,
        FormWizzard,
        FormWizzardTab
    },
    data() {
        return {
            isCreating: false,
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
            step: 0
        }
    },
    methods: {
        toggleCreating() {
            this.isCreating = !this.isCreating;
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
</style>
