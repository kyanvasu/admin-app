<template>
    <div
        :class="{ 'menu-pinned': sidebarState == 'opened' }"
        class="header app-header"
    >
        <div class="sidebar-toggle" @click="$emit('handle-sidebar')">
            <img src="/img/icons/hamburguer-menu.png">
        </div>
        <div class="header-container">
            <div class="left-side-header d-flex h-100">
                <slot v-if="!hideCompanyName" name="companies-switcher">
                    <gw-companies-switcher
                        :branch-data="companyBranchData"
                        :company-data="companyData"
                        :companies-list="companiesList"
                        @select="company => $emit('selected-company', company)"
                    />
                </slot>
                <slot name="app-switcher">
                    <gw-app-switcher
                        v-if="appsList.length > 1"
                        :app-data="appData"
                        :apps-list="appsList"
                    />
                </slot>
            </div>
            <div class="right-side-header d-flex">
                <gw-user-options
                    :company-data="companyData"
                    :user-data="userData"
                    :show-options="showUserOptions"
                    :dropdown-mapper="dropdownMapper"
                />
                <gw-notifications
                    v-if="showNotifications"
                    :count="notificationsCount"
                    @toggle-notifications="$emit('toggle-notifications')"
                />
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import GwAppSwitcher from "./gw-app-switcher";
import GwCompaniesSwitcher from "./gw-companies-switcher";
import GwNotifications from "./gw-notifications";
import GwUserOptions from "./gw-user-options";

export default {
    name: "GwHeader",
    components: {
        GwAppSwitcher,
        GwCompaniesSwitcher,
        GwNotifications,
        GwUserOptions
    },
    props: {
        appsList: {
            type: Array,
            default() {
                return [];
            }
        },
        dropdownMapper: {
            type: Object,
            default() {
                return {}
            }
        },
        companyBranchData: {
            type: Object,
            required: true
        },
        appData: {
            type: Object,
            required: true,
            validator(data) {
                return data.name;
            }
        },
        companyData: {
            type: Object,
            required: true,
            validator(data) {
                return data.name;
            }
        },
        companiesList: {
            type: Array,
            default() {
                return [];
            }
        },
        notificationsCount: {
            type: Number,
            required: true
        },
        showNotifications: {
            type: Boolean,
            default: true
        },
        sidebarState: {
            type: String,
            default: "hover"
        },
        showUserOptions: {
            type: Boolean,
            default: true
        },
        userData: {
            type: Object,
            required: true
        },
        hideCompanyName: {
            type: Boolean
        }
    }
};
</script>

<style lang="scss" scoped>
.app-header {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    height: 60px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    padding: 0;
    padding-left: 70px;
    display: flex;

    &.menu-pinned  {
        padding-left: 280px;
    }

    @media (max-width: 991px) {
        padding-left: 0;
    }

    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-left: 30px;
        padding-right: 30px;
        flex: 1;

        @media (min-width: 1824px) {
            width: 1700px;
        }

        @media (max-width: 991px) {
            padding-left: 0;
        }

        @media (max-width: 576px) {
            padding-right: 10px;
        }
    }

    .sidebar-toggle {
        display: none;

        @media (max-width: 991px) {
            cursor: pointer;
            display: flex;
            width: 59px;
            height: 100%;
            background-color: var(--base-color);
            align-items: center;
            justify-content: center;
            margin-right: 20px;
        }
    }

    .notifications-center {
        order: 3;
        margin-left: 15px;
        display: flex;
        align-items: center;

        .header-icon {
            position: relative;
        }
    }
}

.desactivate-lm {
    cursor: not-allowed;
}

.desactivate-lm span, .desactivate-lm p {
    color: #ccc;
    border-color: #ccc;
}

@media(max-width: 992px) {
    .app-header {
        .notifications-center {
            display: none;
        }
    }
}

@media screen and (max-width: 768px) {
    .app-header {
        .free-trial-icon {
            display: none;
        }
    }
}
</style>
