<template>
    <dropdown :is-icon="false" class="app-switcher">
        <template slot="btn">
            <span class="app-mode"> {{ appData.name }}</span>
            <i class="fas fa-th" />
        </template>
        <template slot="body">
            <a
                v-for="app in appsList"
                :key="`app-${app.id}`"
                :href="app.url"
                target="_blank"
                class="dropdown-item"
            >
                <img src="" alt="">
                <span>{{ app.name }}</span>
            </a>
            <router-link
                :to="{name: 'apps-create'}"
                class="create-app-item"
            >
                <span> Create App</span>
            </router-link>
        </template>
    </dropdown>
</template>

<script>
export default {
    name: "GwAppSwitcher",
    props: {
        appsList: {
            type: Array,
            default() {
                return [];
            }
        },
        appData: {
            type: Object,
            required: true,
            validator(data) {
                return data.name;
            }
        }
    }
}
</script>

<style lang="scss">
.app-switcher {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: var(--base-color);

    .bp-dropdown__btn {
        height: 100%;

        .app-mode {
            font-size: 15px !important;
            font-family: 'Roboto';
            font-weight: bold;
            display: block;
            text-align: center;
            margin-right: 10px;
            margin-bottom: 2px;
        }
    }

    .bp-dropdown__body {
        border-top: none !important;
        padding: 30px 20px !important;
        &::before {
            background: none !important;
        }
    }

    .bp-dropdown .bp-dropdown__body .dropdown-item {
        border-bottom: none !important;
    }

}

.create-app-item {
    cursor: pointer;
    display: inline-block;
    padding: 15px 0;
}

@media(max-width: 992px) {
    .app-switcher {
        order: 1;
        margin-right: initial;
        padding: 0 10px;

        #app-grid {
            position: absolute;
            left: 0;
            margin: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: none;
        }
    }
}
</style>
