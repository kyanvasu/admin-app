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
                    action=""
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
            <div class="col-md-12">
                <h4 class="dashboard__section-title"> Users</h4>
            </div>
            <div class="col-md-12">
                <statistics-box :statistics="statistics" />
            </div>
        </div>

        <!-- Usage -->
        <div class="row section">
            <div class="col-md-12">
                <h4 class="dashboard__section-title"> Usage</h4>
            </div>
            <div class="col-md-6">
                <div class="card stat-card">
                    <header class="stat-card__header d-flex justify-content-between">
                        <h5 class="stat-card__title">
                            Leads Overview
                        </h5>
                    </header>
                    <article class="stat-card__content w-100 text-center">
                        <ve-histogram :data="chartData" />
                    </article>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card stat-card">
                    <header class="stat-card__header d-flex justify-content-between">
                        <h5 class="stat-card__title">
                            Leads Overview
                        </h5>
                    </header>
                    <article class="stat-card__content w-100 text-center">
                        <ve-histogram :data="chartData" />
                    </article>
                </div>
            </div>
        </div>

        <!-- Companies -->
        <div class="row section">
            <div class="col-md-12">
                <h4 class="dashboard__section-title"> Companies</h4>
            </div>
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
            <div class="col-md-12">
                <h4 class="dashboard__section-title"> Storage</h4>
            </div>
            <div class="col-md-12">
                <storage-stat></storage-stat>
            </div>
        </div>

        <!-- Third Party Services -->
        <div class="row section">
            <div class="col-md-12">
                <h4 class="dashboard__section-title"> Third Party Services</h4>
            </div> <div v-for="(stat, index) in services" :key="`stat-${index}`" class="col-md-4 mb-4">
                <statistic-line
                    :title="stat.title"
                    :iconClass="stat.iconClass || stat.icon"
                >
                    <template #icon>
                        <img :src="stat.icon" class="small-icon"/>
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

export default {
    name: "Home",
    components: {
        NotificationBox,
        StatisticsBox,
        StatisticLine,
        StorageStat
    },
    data() {
        return {
            chartData: {
                columns: ["date", "created", "closed"],
                rows: [{
                    "date": new Date().getFullYear(),
                    "created": 25,
                    closed: 0
                }]
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
            ],
            stats: [{
                name: "created",
                title: "Leads Created",
                count: 33,
                colorClass: "text-info"
            },
            {
                name: "closed",
                title: "Leads Closed",
                count: 0,
                colorClass: "text-danger"
            },
            {
                name: "sponsored",
                title: "Agents Sponsored",
                count: 6,
                colorClass: "text-success"
            }]
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

    .dashboard__section-title {
        font-size: 26px;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 1.3rem;
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
