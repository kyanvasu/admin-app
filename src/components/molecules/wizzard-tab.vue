<template>
    <div class="wizzard-tab">
        <h4 class="wizzard-tab__title">
            {{ title }}
        </h4>
        <p class="wizzard-tab__description">
            {{ description }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
