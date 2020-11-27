<template>
    <!-- Create apps -->
    <div class="row section">
        <section-title
            class="col-md-12"
            title="Recent Apps"
        />
        <div :key="`stat-${index}`" class="col-md-4 mb-4">
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
        <div v-for="(stat, index) in services" :key="`stat-${index}`" class="col-md-4 mb-4">
            <square-action-box
                :title="stat.title"
                :icon-class="stat.iconClass || stat.icon"
            >
                <template #icon>
                    <img :src="stat.icon" class="small-icon">
                </template>
            </square-action-box>
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

.small-icon {
    width: 68px;
    height: 68px;
}
</style>
