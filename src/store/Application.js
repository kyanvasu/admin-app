import { isValidJWT } from "@/utils/helpers";
import isEmpty from "lodash/isEmpty";
import store from "@/store/index";
import * as slug from "slugify";
import manualResources from "../config/manual-resources";

const state = {
    apps: [],
    data: {},
    env: {},
    isLoading: true,
    languages: [],
    timezones: [],
    locales: [],
    currencies: [],
    roles: [],
    resources: [],
    settings: {}
};

const mutations = {
    SET_APPS(state, payload) {
        state.apps = payload;
    },
    SET_DATA(state, payload) {
        state.data = payload;
    },
    SET_ENV(state, payload) {
        state.env = payload;
    },
    SET_LANGUAGES(state, payload) {
        state.languages = payload;
    },
    SET_IS_LOADING(state, payload) {
        state.isLoading = payload;
    },
    SET_TIMEZONES(state, payload) {
        state.timezones = payload;
    },
    SET_LOCALES(state, payload) {
        state.locales = payload;
    },
    SET_CURRENCIES(state, payload) {
        state.currencies = payload;
    },
    SET_SIDEBAR_LINKS(state, payload) {
        payload = payload.concat(manualResources);
        // state.resources = payload
        const links = {
            leads: "leads",
            "lead-receiver": "leads-receivers",
            rotations: "leads-rotations"
        };

        state.resources = payload.map(resource => {
            if (resource.links) {
                resource.links = resource.links.map(link => {
                    link.slug = links[slug(link.title.toLowerCase())];
                    return link;
                })
            }
            return resource;
        });
    },
    SET_ROLES(state, payload) {
        state.roles = payload;
    },
    SET_SETTINGS(state, payload) {
        state.settings = payload;
    }
};

const actions = {
    async getApps({ commit }) {
        await axios({
            url: "/apps"
        }).then(response => {
            commit("SET_APPS", response.data);
        });
    },
    async getGlobalStateData({ commit, dispatch }) {
        if (!Cookies.get("token") || !isValidJWT(Cookies.get("token"))) {
            return new Promise((resolve, reject) => {
                reject("ERROR");
            });
        }

        return Promise.all([
            dispatch("User/getData", null, { root: true }),
            dispatch("Company/getData", null, { root: true }),
            dispatch("getSidebarMenuData")
        ]).then(async(response) => {
            const [
                { data: userData },
                { data: companies },
                { data: sidebarLinks }
            ] = response;
            const currentCompany = companies.find((company) => company.id == userData.default_company);

            await dispatch("getApps");
            await commit("SET_DATA", state.apps.find(app => app.id == currentCompany.apps.apps_id));

            if (getters.isSubscriptionBased()) {
                await dispatch("Subscription/getSubscriptionData", null, { root: true });
            }

            dispatch("Notifications/getNotifications", null, { root: true });
            dispatch("setGlobalData", {
                userData,
                companies,
                sidebarLinks,
                currentCompany
            });
        });
    },
    getLanguages({ commit }) {
        if (!state.languages.length) {
            return axios({
                url: "/languages"
            }).then((response) => {
                commit("SET_LANGUAGES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getSidebarMenuData() {
        return axios({
            url: "/menus/main"
        });
    },
    setPageTitleAndMeta(_, appSettings) {
        document.title = appSettings.name;
        document.querySelector("meta[name=description]").content = appSettings.description;
    },
    async getSettings({ commit, dispatch }) {
        await axios({
            url: `/apps/${process.env.VUE_APP_APPLICATION_KEY}/settings`
        }).then(response => {
            dispatch("setPageTitleAndMeta", response.data)
            commit("SET_SETTINGS", response.data);
            commit("SET_IS_LOADING", false);
        });
    },
    getSettingsLists({ dispatch }) {
        return Promise.all([
            dispatch("getLanguages"),
            dispatch("getTimezones"),
            dispatch("getLocales"),
            dispatch("getCurrencies"),
            dispatch("getRoles")
        ]);
    },
    getTimezones({ commit }) {
        if (!state.timezones.length) {
            return axios({
                url: "/timezones"
            }).then((response) => {
                commit("SET_TIMEZONES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getRoles({ commit }) {
        if (!state.roles.length) {
            return axios({
                url: "/roles"
            }).then((response) => {
                commit("SET_ROLES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getLocales({ commit }) {
        if (!state.locales.length) {
            return axios({
                url: "/locales?limit=300"
            }).then((response) => {
                commit("SET_LOCALES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    getCurrencies({ commit }) {
        if (!state.currencies.length) {
            return axios({
                url: "/currencies?limit=200"
            }).then((response) => {
                commit("SET_CURRENCIES", response.data);
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    },
    resetGlobalData({ commit, dispatch }) {
        dispatch("User/setData", {}, { root: true });
        dispatch("Company/setList", [], { root: true });
        dispatch("Company/setData", null, { root: true });
        commit("SET_SIDEBAR_LINKS", []);
        commit("SET_APPS", []);
    },
    setEnv({ commit }) {
        const envList = Object.keys(process.env)
            .filter(key => key.startsWith("VUE_APP_"))
            .reduce((list, key) => list = { ...list, [key]: process.env[key] }, {});

        commit("SET_ENV", envList);
    },
    setGlobalData({ commit, dispatch }, data) {
        dispatch("User/setData", data.userData, { root: true });
        dispatch("Company/setList", data.companies, { root: true });
        dispatch("Company/setData", data.currentCompany, { root: true });
        commit("SET_SIDEBAR_LINKS", data.sidebarLinks.sidebar);
    },
    setIsLoading({ commit }, data) {
        commit("SET_IS_LOADING", data);
    }
};

const getters = {
    allowUserRegistration() {
        return Boolean(Number(state.settings.settings.allow_user_registration));
    },
    isChatActive() {
        return state.settings.settings && Boolean(Number(state.settings.settings.app_chat_active));
    },
    isDataReady() {
        return !isEmpty(state.data);
    },
    isStateReady() {
        return !isEmpty(store.User.state.data) && !!store.Company.state.data;
    },
    isSubscriptionBased() {
        return Boolean(Number(state.data.payments_active));
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
