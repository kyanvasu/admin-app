<template>
    <div class="d-flex justify-content-between kanvas-section">
        <h4 class="section-title">
            {{ title }}
        </h4>
        <a v-if="actionTitle" href="" class="section-link">
            {{ actionTitle }}
            <i class="fas fa-external-link-alt" />
        </a>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        },
        actionTitle: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
.kanvas-section {
    .section-title {
        font-size: 26px;
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 1.3rem;
        text-transform: none;
    }

    .section-link {
        color: #8582D1;
        font-size: 19px;
    }
}

</style>
