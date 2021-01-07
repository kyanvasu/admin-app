<template>
    <div class="home">
        <div class="row section mb-0">
            <div class="col-md-4 mb-0">
                <h4 class="dashboard-title p-l-10 text-primary">
                    Checkout settings
                </h4>
            </div>
        </div>

        <!-- Checkout integration -->
        <div class="row section mb-5">
            <section-title
                class="col-md-12"
                title="Checkout client-only integration"
                tagline="Quickly start setting your products or start your subscriptions"
                :show-divider="true"
            >
                <div class="row section-content my-4">
                    <div class="col-md-6" />
                    <div class="col-md-6">
                        <el-switch
                            v-model="formData.is_client_only"
                            active-color="#8482D0"
                            inactive-color="#D3D1FF"
                        />  Enable
                    </div>
                </div>
            </section-title>
        </div>

        <!-- Custom checkout -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Customize Checkout"
                tagline="Customize the appearance and functionality of Checkout"
                :show-divider="true"
            >
                <div class="row section-content my-4">
                    <div class="col-md-6">
                        <h5> Digital Wallets</h5>
                    </div>
                    <div class="col-md-6">
                        <div>
                            <p>
                                <el-switch
                                    v-model="formData.use_apple_pay"
                                    active-color="#8482D0"
                                    inactive-color="#D3D1FF"
                                /> Use Apple Pay
                            </p>
                            <p>
                                <el-switch
                                    v-model="formData.use_google_pay"
                                    active-color="#8482D0"
                                    inactive-color="#D3D1FF"
                                /> Use Google Pay
                            </p>
                        </div>
                    </div>

                    <!--  -->
                    <div class="col-md-6">
                        <h5> Address autocomplete</h5>
                    </div>
                    <div class="col-md-6">
                        <div>
                            <el-switch
                                v-model="formData.autocomplete_with_map"
                                active-color="#8482D0"
                                inactive-color="#D3D1FF"
                            /> Enable Address autocomplete with Google Maps
                        </div>
                    </div>

                    <!--  -->
                    <div class="mt-3 d-flex w-full">
                        <div class="col-md-6">
                            <h5> Public information</h5>
                        </div>
                        <div class="col-md-6">
                            <div>
                                Go to <a href="">Account information</a> to update your business name and statement descriptor
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="mt-3 d-flex w-full">
                        <div class="col-md-6">
                            <h5 class="mt-3">
                                Appearance
                            </h5>
                        </div>
                        <div class="col-md-6">
                            <div> Go to <a href="">Branding settings</a> to upload icon and logo, and set color</div>
                        </div>
                    </div>
                </div>
            </section-title>
        </div>

        <!-- Companies -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Next steps"
                tagline="Integrate checkout in a few steps"
                :show-divider="true"
            >
                <div class="row section-content my-4">
                    <div class="col-md-6">
                        <h5 class="bold-title">
                            Checkout client-only integration
                        </h5>
                        <div>
                            <p>
                                Quickly start selling your products or start a subscription, with only client side code.
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h5 class="bold-title">
                            Checkout client &amp; server integration
                        </h5>
                        <div>
                            <p>
                                Create checkout pages dynamically on your server with fine-grained control.
                            </p>
                        </div>
                    </div>

                    <div class="col-md-6 mb-3 semibold">
                        <a href="">Read checkout client-only integration guide <i class="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                    <div class="col-md-6 mb-3 semibold">
                        <a href="">Read checkout client &amp; server integration guide <i class="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                    <div class="col-md-6 mb-3 semibold">
                        <a href="">Configure web hooks <i class="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                    <div class="col-md-6 mb-3 semibold">
                        <a href="">Configure web hooks <i class="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                    <div class="col-md-6 mb-3 semibold">
                        <a href="">Manage your products <i class="fas fa-long-arrow-alt-right"></i></a>
                    </div>
                    <div class="col-md-6 mb-3 semibold">
                        <router-link :to="{name: 'settings-app'}" >Manage your App <i class="fas fa-long-arrow-alt-right"></i></router-link>
                    </div>
                </div>
            </section-title>
        </div>

        <!-- Chrageback protection -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Chargeback protection"
                tagline="Protect your business from the unpredictability of disputes"
            />
            <div class="col-md-12" />
        </div>
    </div>
</template>

<script>
import SectionTitle from "@c/molecules/section-title";
import moment from "moment"

export default {
    name: "Home",
    components: {
        SectionTitle
    },
    data() {
        return {
            formData: {

            }
        }
    },
    computed: {
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
        },
        filteredChartData2() {
            return {
                columns: this.chartData2.columns,
                rows: this.chartData2.rows.filter((stat) => {
                    if (!this.chartData2.dates.start) {
                        return true
                    }
                    return stat.completeDate > moment(this.chartData2.dates.start).format("YYYY-MM") && stat.completeDate < moment(this.chartData2.dates.end).format("YYYY-MM")
                })
            }
        }
    },
    methods: {
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
        toISOMonth() {

        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    --text-color: #707070;
    --accent-color: #8582D1;

    .stat-card {

        &_header,
        &__title,
        i {
            color: #777 !important;
            font-weight: bold;
        }

        &__content.number {
            font-weight: bolder;
            font-size: 30px;
        }

    }

    .dashboard-title {
        font-size: 21px;
        font-weight: 500;
        color: var(--text-color);
    }

    .dashboard-subtitle {
        font-size: 26px;
        font-weight: 600;
        color: var(--accent-color);
    }

    .section {
        margin-bottom: 2.5rem;
    }
    .small-icon {
        width: 52px;
        height: 52px;
    }

    .custom-action {
        color: #9B9B9B;
        font-weight: 600;
    }

    .section-content {
        color: #707070;
        font-size: 21px;
    }

    .bold-title {
        font-weight: bold;
    }

    a, a:visited {
        color: #008FE8;
    }

    .semibold {
        font-weight: 600;
    }
}
</style>
