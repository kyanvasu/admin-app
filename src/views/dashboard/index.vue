<template>
    <div class="home">
        <div class="row section mb-5">
            <div class="col-md-4">
                <h4 class="dashboard-title p-l-10">
                    Dashboard
                </h4>
                <h3 class="dashboard-subtitle">
                    Project Performance
                </h3>
            </div>
            <div class="col-md-4 my-2">
                <notification-box
                    title="Your plan is suspended"
                    description="Update your payment method"
                    theme-color="#FD8484"
                    border-color="#FD8484"
                    action-color="#FD8484"
                    icon-class="fas fa-ban"
                    :actions="{
                        managePayments: {
                            label: 'Manage Payments'
                        },
                        remindLater: {
                            label: 'Remind Me Later'
                        },
                        deleteNotification: {
                            label: 'Delete notification',
                            class: 'text-danger'
                        }
                    }"
                />
                <notification-modal
                    :icon-class="iconClass"
                />
            </div>
            <div class="col-md-4 my-2">
                <notification-box
                    title="Connected"
                    description="WeTransfer is correctly configured"
                    theme-color="#8582D1"
                    icon-class="far fa-check-circle"
                    :actions="{
                        settings: {
                            label: 'App Settings'
                        },
                        deleteNotification: {
                            label: 'Delete notification',
                            class: 'text-danger'
                        }
                    }"
                />
            </div>
        </div>

        <!-- Users -->
        <div class="row section mb-5">
            <section-title
                class="col-md-12"
                title="Users"
            />
            <div class="col-md-12">
                <statistics-box
                    :statistics="statistics"
                    :dates.sync="statistics.dates"
                />
            </div>
        </div>

        <!-- Usage -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Usage"
            />
            <div class="col-md-6">
                <line-graph-card  title="Active Users">
                    <template #content>
                        <line-graph
                            title="Active Users"
                            :dates.sync="chartData2.dates"
                            :chart-data="filteredChartData2"
                        />
                    </template>
                </line-graph-card>
            </div>

            <div class="col-md-6">
                <line-graph-card title="Inactive Users">
                    <template #content>
                        <line-graph
                            title="Inactive Users"
                            :dates.sync="chartData.dates"
                            :chart-data="filteredChartData"
                        />
                    </template>
                </line-graph-card>
            </div>
        </div>

        <!-- Companies -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Companies"
                action-title="Go to Companies"
            />
            <div v-for="(stat, index) in statisticsCompanies" :key="`stat-${index}`" class="col-md-4 mb-4">
                <statistic-line
                    :title="stat.title"
                    :description="stat.description"
                    :content="stat.content"
                    :status="stat.status"
                />
            </div>
        </div>

        <!-- Storage -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Storage"
            />
            <div class="col-md-12">
                <storage-stat />
            </div>
        </div>

        <!-- Third Party Services -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Third Party Services"
                action-title="Go to App Market"
            />
            <div v-for="(stat, index) in services" :key="`stat-${index}`" class="col-md-4 mb-4">
                <statistic-line
                    :title="stat.title"
                    :icon-class="stat.iconClass || stat.icon"
                >
                    <template #icon>
                        <img :src="stat.icon" class="small-icon">
                    </template>
                    <template #action>
                        <span class="custom-action"> Manage </span>
                    </template>
                </statistic-line>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationBox from "@c/organisms/notification-box";
import StatisticsBox from "@c/organisms/statistics-box";
import StatisticLine from "@c/organisms/statistic-line";
import StorageStat from "@c/organisms/storage-stat";
import LineGraph from "@c/organisms/line-graph";
import LineGraphCard from "@c/templates/line-graph-card";
import NotificationModal from "@c/organisms/notification-modal";
import SectionTitle from "@c/molecules/section-title";
import moment from "moment"

export default {
    name: "Home",
    components: {
        NotificationBox,
        StatisticsBox,
        StatisticLine,
        StorageStat,
        LineGraph,
        LineGraphCard,
        SectionTitle,
        NotificationModal
    },
    data() {
        return {
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
            },
            chartData2: {
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
            },
            statistics: [
                {
                    title: "Total Users",
                    content: "52.901"
                },
                {
                    title: "Premium",
                    content: "10.021",
                    status: "success"
                },
                {
                    title: "Free trials",
                    content: "42.880",
                    status: "success"
                },
                {
                    title: "New this month",
                    content: "10.029",
                    status: "danger"
                },
                {
                    title: "Downloads",
                    content: "58.902",
                    status: "success"
                }
            ],
            statisticsCompanies: [
                {
                    title: "All companies",
                    description: "All companies subscribed",
                    content: "290",
                    status: "success"
                },
                {
                    title: "New this month",
                    description: "New subscribers this month",
                    content: "10.029",
                    status: "success"
                },
                {
                    title: "Premium",
                    description: "Total premium users",
                    content: "1,000",
                    status: "danger"
                },
                {
                    title: "Free users",
                    description: "Total free users",
                    content: "1,500",
                    status: "success"
                },
                {
                    title: "Conversion Rate",
                    description: "January 2020",
                    content: "21%",
                    status: "success"
                }
            ],
            services: [
                {
                    title: "Zoom",
                    icon: "/images/zoom.png"
                },
                {
                    title: "Slack",
                    icon: "/images/slack.png"
                },
                {
                    title: "Dropbox",
                    icon: "/images/dropbox.png"
                },
                {
                    title: "AWS",
                    icon: "/images/aws2.png"
                }
            ]
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
    mounted() {
        this.getLeadsStats();
    },
    methods: {
        getLeadsStats() {
            axios.get("/leads-stats")
                .then(response => {
                    this.stats = response.data;
                })
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
}
</style>
