<template>
    <div class="storage-stat">
        <div class="storage-stat__header">
            <div class="storage-stat__title">
                McTekk
            </div>
            <div class="storage-stat__used">
                52.2 GB used
            </div>
        </div>
        <div class="storage-stat__progress">
            <div
                v-for="percentage in percentages"
                :ref="percentage.name"
                :key="percentage.name"
                :title="`${percentage.title} ${percentage.size}`"
                class="storage-stat__progress-percentage"
            />
        </div>

        <div class="storage-stat__legenda">
            <div v-for="percentage in percentages" :ref="`legend-${percentage.name}`" :key="`legend-${percentage.name}`" class="storage-stat__legenda-item">
                <div class="bubble"></div>
                {{ percentage.title }}
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            percentages: [
                {
                    title: "Notifications",
                    name: "notifications",
                    color: " #7E79FF",
                    size: "60%"
                },
                {
                    title: "Contacts",
                    name: "contacts",
                    color: "#ABEA97",
                    size: "10%"
                },
                {
                    title: "Uploaded",
                    name: "uploaded",
                    color: "#FD8484",
                    size: "5%"
                },
                {
                    title: "Free",
                    name: "free",
                    color: "#C9C9C990",
                    size: "25%"
                }
            ]
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.percentages.forEach((percentage) => {
                const documentRoot = this.$refs[percentage.name][0];
                const legendRoot = this.$refs[`legend-${percentage.name}`][0];

                documentRoot.style.setProperty("--size", percentage.size);
                documentRoot.style.setProperty("--color", percentage.color);
                legendRoot.style.setProperty("--color", percentage.color);
            })
        })
    }
}
</script>

<style lang="scss">
    .storage-stat {
        background: white;
        padding: 1.5rem 3.5rem 1.9rem 3.5rem;
        border-radius: 8px;

        &__header {
            display: flex;
            justify-content: space-between;
        }

        &__progress {
            background: #C9C9C990;
            width: 100%;
            height: 5px;
            position: relative;
            display: flex;
            margin-top: 10px;
            margin-bottom: 30px;
        }

        &__progress-percentage {
            position: relative;
            background: var(--color);
            width: var(--size);
            height: 100%;
            cursor: pointer;
            transition: all ease .3s;

            &:hover {
                transform: scaleY(1.2);
            }
        }

        &__legenda {
            display: flex;
        }
        &__legenda-item {
            display: flex;
            align-items: center;
            margin-right: 25px;

            .bubble {
                height: 10px;
                width: 10px;
                border-radius: 50%;
                margin-right: 5px;
                background: var(--color);
            }
        }
    }
</style>
