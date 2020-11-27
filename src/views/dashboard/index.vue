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
                    @action="openNotificationModal"
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
                    action=""
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
                <statistics-box :statistics="statistics" />
            </div>
        </div>

        <!-- Usage -->
        <div class="row section">
            <section-title
                class="col-md-12"
                title="Usage"
            />
            <div class="col-md-6">
                <line-graph
                    title="Active Users"
                    :chart-data="chartData"
                />
            </div>
            <div class="col-md-6">
                <line-graph
                    title="Inactive Users"
                    :chart-data="chartData"
                />
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
import NotificationModal from "@c/organisms/notification-modal";
import SectionTitle from "@c/molecules/section-title";

export default {
    name: "Home",
    components: {
        NotificationBox,
        StatisticsBox,
        StatisticLine,
        StorageStat,
        LineGraph,
        SectionTitle,
        NotificationModal
    },
    data() {
        return {
            chartData: {
                columns: ["date", "amount"],
                rows: [
                    {
                        "date": "July",
                        "amount": 1000
                    },
                    {
                        "date": "Aug",
                        "amount": 9000
                    },
                    {
                        "date": "Oct",
                        "amount": 1200
                    },
                    {
                        "date": "Nov",
                        "amount": 5000
                    },
                    {
                        "date": "Dec",
                        "amount": 1000
                    },
                    {
                        "date": "Jan",
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
