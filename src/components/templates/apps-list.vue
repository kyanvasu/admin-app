<template>
    <div class="main container">
        <!-- Create apps -->
        <div class="apps-list">
            <div class="row apps-section">
                <section-title
                    class="col-md-12"
                    title="Recent Apps"
                />
                <div class="col-md-4 d-flex justify-content-center mb-4">
                    <square-action-box
                        title="Create new app"
                        icon-class="fa fa-plus"
                        background-color="#D3D1FF"
                    >
                        <template #icon>
                            <div class="square-icon">
                                <div class="fa fa-plus-circle" />
                            </div>
                        </template>
                    </square-action-box>
                </div>
                <div v-for="(app, index) in recentApps" :key="`recent-app-${index}`" class="col-md-4 d-flex justify-content-center mb-4">
                    <square-action-box
                        :title="app.name"
                        :icon-class="app.iconClass || app.icon"
                    >
                        <template #icon>
                            <img :src="app.icon || '/images/zoom.png'" class="small-icon">
                        </template>
                    </square-action-box>
                </div>
            </div>

            <!-- All my apps section -->
            <div class="row apps-section">
                <section-title
                    class="col-md-12"
                    title="All my apps"
                />
                <div v-for="(app, index) in apps" :key="`app-${index}`" class="col-md-4 d-flex justify-content-center mb-4">
                    <square-action-box
                        :title="app.name"
                        :icon-class="app.iconClass || app.icon"
                    >
                        <template #icon>
                            <img :src="app.icon || '/images/zoom.png'" class="small-icon">
                        </template>
                    </square-action-box>
                </div>
            </div>
        <!-- End of all my apps -->
        </div>
    </div>
</template>

<script>
import SectionTitle from "@c/molecules/section-title";
import SquareActionBox from "@c/molecules/square-action-box";

export default {
    components: {
        SectionTitle,
        SquareActionBox
    },
    props: {
        apps: {
            type: Array,
            default() {
                return []
            }
        },
        recentApps: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
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
    }
}
</script>

<style lang="scss" scoped>
.square-icon {
    background: #8582D1;
    width: 68px;
    height: 68px;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
}

.apps-list {
    max-width: 728px;
    padding: 0 0 0 0;
    margin: auto;
}

.apps-section {
    margin-bottom: 69px;
}

.small-icon {
    width: 68px;
    height: 68px;
}
</style>
