<template>
    <div
        class="notification-badge"
        @click.prevent="$emit('toggle-notifications')"
    >
        <span v-if="count" class="notification-bubble" />
        <i class="fas fa-bell" />
    </div>
</template>

<script>
export default {
    name: "GwNotifications",
    props: {
        count: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.notification-badge {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 20px;
    color: #A4AFB7;
    cursor: pointer;
    margin-left: 20px;

    .notification-bubble {
        position: absolute;
        width: 13px;
        height: 13px;
        border-radius: 100%;
        background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        right: -4px;
        top: 0;
    }
}

@media(max-width: 992px) {
    .notification-badge {
        display: none;
    }
}
</style>
