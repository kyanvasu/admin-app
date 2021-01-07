<template>
    <div class="home">
        <!-- development settings -->
        <div class="row section mb-5">
            <section-title
                class="col-md-12"
                title="Development Settings"
            >
                <div class="section-content my-4 card">
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Project Type
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">You selected a project type to get started</p>
                            <div>
                                <label
                                    v-for="projectType in projectTypes"
                                    :key="projectType.name"
                                    :for="projectType.name"
                                    class="mr-3"
                                >
                                    <input

                                        :id="projectType.name"
                                        type="radio"
                                        name="project-type"
                                        :value="projectType.name"
                                    >
                                    {{ projectType.name }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Development Setup
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="section-content__label">Select your development setup</p>
                                    <div>
                                        <label
                                            v-for="setup in developmentSetups"
                                            :key="setup.name"
                                            :for="setup.name"
                                            class="mr-3"
                                        >
                                            <input
                                                :id="setup.name"
                                                type="radio"
                                                name="development-setup"
                                                :value="setup.name"
                                            >
                                            {{ setup.name }}
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <p> <span class="text-primary">Note:</span> Build your web project using our Baka Packages and Kanvas project to save energy and time</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Domain and URL
                            </h6>
                        </div>
                        <div class="col-md-7 form-group">
                            <p class="section-content__label">Type your URL here</p>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <input v-model="formData.url" type="text" class="input form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section-title>
        </div>

        <!-- Brand and information -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Brand and Information"
            >
                <div class="section-content my-4 card">
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                App Name
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Your app's name</p>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <input v-model="formData.name" type="text" class="input form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Description
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Select Your app's description</p>
                            <div class="form-group">
                                <textarea v-model="formData.description" type="text" class="input form-control" />
                            </div>
                        </div>
                    </div>

                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Branding Colors
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Your app's colors</p>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <color-picker v-model="formData.settings.main_color" placeholder="Main Color" />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                                <div class="form-group col-md-6">
                                    <color-picker v-model="formData.settings.secondary_color" placeholder="Secondary Color" />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Branding Picture
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Your app's logo</p>
                            <div class="add-image__container">
                                <profile-uploader
                                    class=" mr-5"
                                    action="/filesystem"
                                    :drag="true"
                                    :image-url="formData.settings.logo"
                                    @loaded="updateProfile"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section-title>
        </div>

        <!-- Data -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Data"
            >
                <div class="section-content my-4 card">
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Data management
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Select your filesystem management</p>
                            <div>
                                <label
                                    v-for="filesystem in filesystems"
                                    :key="filesystem"
                                    :for="filesystem"
                                    class="mr-3"
                                >
                                    <input
                                        :id="filesystem"
                                        v-model="formData.settings.filesystem"
                                        type="radio"
                                        name="project-type"
                                        :value="filesystem"
                                    >
                                    {{ filesystem }}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Time Zone
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Select your timezone</p>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <multiselect
                                        v-model="formData.settings.timezone"
                                        v-validate="`required`"
                                        :allow-empty="false"
                                        :options="timezones"
                                        :show-labels="false"
                                        name="timezones"
                                        placeholder="Select a Time-Zone"
                                    />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Currency
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Select your currency</p>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <multiselect
                                        v-model="formData.settings.currency"
                                        v-validate="`required`"
                                        label="currency"
                                        track-by="id"
                                        :allow-empty="false"
                                        :options="currencies"
                                        :show-labels="false"
                                        name="currency"
                                        placeholder="Select a currency"
                                    />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Language
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Select your language</p>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <multiselect
                                        v-model="formData.settings.language"
                                        v-validate="`required`"
                                        :allow-empty="false"
                                        label="name"
                                        track-by="id"
                                        :options="languages"
                                        :show-labels="false"
                                        name="language"
                                        placeholder="Select a language"
                                    />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row lined-item">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                Auth
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">Select your development setup</p>
                            <div>
                                <label
                                    v-for="auth in authManagers"
                                    :key="auth.field"
                                    :for="auth.field"
                                    class="mr-3"
                                >
                                    <input

                                        :id="auth.field"
                                        type="checkbox"
                                        :checked="formData[auth.field]"
                                        name="project-type"
                                        :value="auth.field"
                                        @click="formData[auth.field]=!formData[auth.field]"
                                    >
                                    {{ auth.label }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section-title>
        </div>

        <div class="text-right">
            <button class="btn btn-secondary mr-2" @click="loadInitialData()">
                Discard
            </button>
            <button :disabled="isLoading" class="btn btn-primary" @click="sendData()">
                Save Changes
            </button>
        </div>
    </div>
</template>

<script>
import SectionTitle from "@c/molecules/section-title";
import ColorPicker from "@c/molecules/color-picker";
import ProfileUploader from "@c/molecules/profile-uploader";
import { mapState } from "vuex";

export default {
    name: "SettingsApp",
    components: {
        SectionTitle,
        ColorPicker,
        ProfileUploader
    },
    props: {
        appSettings: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isLoading: false,
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
        ...mapState({
            appData: state => state.Application.data,
            languages: state => state.Application.languages,
            timezones: state => state.Application.timezones,
            currencies: state => state.Application.currencies
        })
    },

    created() {
        this.loadInitialData()
    },
    methods: {
        loadInitialData() {
            this.formData = {
                name: this.appSettings.name,
                description: this.appSettings.description,
                payments_active: Boolean(this.appData.payments_active),
                ecosystem_auth : Boolean(this.appData.ecosystem_auth),
                is_public : Boolean(this.appData.is_public),
                default_apps_plan_id: this.appData.default_apps_plan_id,
                url: this.appData.url,
                settings: {
                    project_type: this.appSettings.settings.project_type,
                    development_type: this.appSettings.settings.development_type,
                    logo: this.appSettings.settings.logo,
                    base_color: this.appSettings.settings.base_color,
                    main_color: this.appSettings.settings.base_color || this.appSettings.settings.main_color,
                    secondary_color: this.appSettings.settings.secondary_color,
                    filesystem: this.appSettings.settings.filesystem,
                    language: this.appSettings.settings.language,
                    timezone: this.appSettings.settings.timezone,
                    currency: this.appSettings.settings.currency
                }
            }
        },
        openNotificationModal() {
            this.$modal.show("notification-modal", {
                title: "Your Plan is suspended",
                description: "We'll need some information to begin with",
                message: "In this section we'll figure out all the information related to your ",
                buttons: [{
                    title: "Manage Payment",
                    class: "btn-danger",
                    iconClass: "fas fa-cancel",
                    handler: () => {
                        this.$modal.hide("basic-modal");

                    }
                }]
            });
        },
        updateProfile(profile) {
            this.formData.settings.logo = profile[0].url;
            this.formData.files = profile;
        },
        sendData() {
            this.isLoading = true;
            const formData = { ...this.formData }
            delete formData.files;
            formData.settings.base_color = formData.settings.main_color
            formData.settings.currency = formData.settings.currency ? formData.settings.currency.currency : "USD"
            formData.settings.language = formData.settings.language ? formData.settings.language.id : "EN"
            formData.settings = JSON.stringify(formData.settings);

            axios({
                url: `/apps/${this.appData.id}`,
                method: "PUT",
                data: formData
            }).finally(async() => {
                await this.$store.dispatch("Application/getGlobalStateData")
                // Solution implemented for now until we can properly refresh all
                // of the user's and company's data through Vuex implementation.
                window.location.reload();
                this.isLoading = false;
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    --text-color: #707070;
    --accent-color: #8582D1;

    .section-content {
        color: #707070;
        font-size: 16px;

        &__label {
            font-weight: 500;
        }
        .form-group {
            [type=text].input {
                border: none;
                padding-left: 5px;
                padding-right: 5px;
                border-radius: 0 0 0 0 !important;
                border-bottom: 1.5px solid #F7F7F7;
            }

            textarea.input {
                border: none !important;
                background: #F7F7F7;
                padding: 15px 10px !important;
            }

        }
    }

    .lined-item {
        border-bottom: 1px #ddd solid;
        padding: 15px 10px;

        &:last-child {
            border-bottom: none;
        }
    }

    .add-image__container {
        margin-bottom: 40px;
        width: 150px;
        height: 150px;
    }
}
</style>
