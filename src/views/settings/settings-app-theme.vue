<template>
    <div class="home">
        <!-- development settings -->
        <div class="row section mb-5">
            <section-title
                class="col-md-12"
                title="Theme Settings"
            >
                <div class="section-content my-4 card">
                    <div class="row lined-item" v-for="(schema,schemaName) in colorSchema" :key="schemaName">
                        <div class="col-md-5">
                            <h6 class="text-primary">
                                {{ schemaName }} Mode
                            </h6>
                        </div>
                        <div class="col-md-7">
                            <p class="section-content__label">
                                Colors
                            </p>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="">Main Color</label>
                                    <color-picker v-model="schema.main_color" placeholder="Main Color" />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="">Secondary Color</label>
                                    <color-picker v-model="schema.secondary_color" placeholder="Secondary Color" />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="">Background Color</label>
                                    <color-picker v-model="schema.background_color" placeholder="Background Color" />
                                    <small v-if="false" class="text-danger"> This field is required </small>
                                </div>
                            </div>
                            <p class="section-content__label mt-3">
                                Previews
                            </p>
                            <div class="row">
                                <div class="col-md-12">
                                    <line-graph-card
                                        title="Active Users"
                                        :main-color="schema.main_color"
                                        :accent-color="schema.accent_color"
                                        :background-color="schema.background_color"
                                    >
                                        <template #content>
                                            <line-graph
                                                title="Active Users"
                                                :dates.sync="chartData.dates"
                                                :chart-data="filteredChartData"
                                                :main-color="schema.main_color"
                                                :accent-color="schema.accent_color"
                                                :background-color="schema.background_color"
                                            />
                                        </template>
                                    </line-graph-card>
                                </div>
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
import LineGraph from "@c/organisms/line-graph";
import LineGraphCard from "@c/templates/line-graph-card";
import { mapState } from "vuex";

export default {
    name: "SettingsApp",
    components: {
        SectionTitle,
        ColorPicker,
        LineGraph,
        LineGraphCard
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
            colorSchema: {

            },
            chartData: {
                columns: ["date", "amount"],
                dates: {
                    start: "",
                    end: ""
                },
                rows: [
                    {
                        "date": "July",
                        "completeDate": "2020-07",
                        "amount": 1000
                    },
                    {
                        "date": "Aug",
                        "completeDate": "2020-08",
                        "amount": 9000
                    },
                    {
                        "date": "Sep",
                        "completeDate": "2020-09",
                        "amount": 1200
                    },
                    {
                        "date": "Oct",
                        "completeDate": "2020-10",
                        "amount": 1200
                    },
                    {
                        "date": "Nov",
                        "completeDate": "2020-11",
                        "amount": 5000
                    },
                    {
                        "date": "Dec",
                        "completeDate": "2020-12",
                        "amount": 1000
                    },
                    {
                        "date": "Jan",
                        "completeDate": "2021-01",
                        "amount": 10000
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            appData: state => state.Application.data,
            languages: state => state.Application.languages,
            timezones: state => state.Application.timezones,
            currencies: state => state.Application.currencies
        }),
        filteredChartData() {
            return {
                columns: this.chartData.columns,
                rows: this.chartData.rows.filter((stat) => {
                    if (!this.chartData.dates.start) {
                        return true
                    }
                    return stat.completeDate > moment(this.chartData.dates.start).format("YYYY-MM") && stat.completeDate < moment(this.chartData.dates.end).format("YYYY-MM")
                })
            }
        }
    },

    created() {
        this.loadInitialData()
        this.colorSchema = {
            clasic: {
                main_color: this.formData.settings.main_color,
                secondary_color: this.formData.settings.secondary_color,
                background_color: "#FFFFFF"
            },
            dark: {
                main_color: "#8582D1",
                secondary_color: "#FFFFFF",
                background_color: "#3B566E"
            },
            brand: {
                main_color: "#FD7D66",
                secondary_color: "#46739E",
                background_color: "#FFFDF7"
            }
        }
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
