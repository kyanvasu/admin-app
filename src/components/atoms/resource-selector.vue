<template>
    <multiselect
        :id="uuid"
        v-model="localResource"
        :label="label"
        :track-by="resourceId"
        :placeholder="placeholder"
        open-direction="bottom"
        :multiple="multiple"
        :group-values="groupValues"
        :group-label="group"
        :options="options"
        :searchable="true"
        :loading="isLoading"
        :options-limit="300"
        :disabled="disabled"
        :limit="3"
        :internal-search="!searchableBy.length"
        :custom-label="customLabel"
        :show-labels="false"
        @close="setLoaded"
        @open="repositionDropdown"
        @search-change="searchResource"
        @input="emitId"
    >
        <span slot="noOptions"> {{ !isLoaded ? 'Loading...' : 'List is empty.' }}</span>
    </multiselect>
</template>

<script>
import { debounce } from "lodash-es";
import uuid from "uuid/v4";

export default {
    inheritAttrs: false,
    props: {
        resourceUrl: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ""
        },
        label: {
            type: String,
            default: "name"
        },
        // eslint-disable-next-line vue/require-default-prop
        customLabel: {
            type: Function,
            required: false
        },
        resourceId: {
            type: String,
            default: ""
        },
        group: {
            type: String,
            default: ""
        },
        groupValues: {
            type: String,
            default: ""
        },
        resource: {
            type: [Object, Array],
            default() {
                return {};
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        processResponse: {
            type: [Function, Boolean],
            default: false
        },
        shouldEmitId: {
            type: Boolean,
            default: false
        },
        filters: {
            type: Object,
            default() {
                return {}
            }
        },
        searchableBy: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            uuid: uuid(),
            isLoading: false,
            options: [],
            localResource: null,
            isLoaded: false
        };
    },
    watch: {
        resource: {
            handler(resource) {
                this.localResource = resource;
            },
            deep: true,
            immediate: true
        },
        resourceUrl() {
            this.searchResource("", true);
        }
    },
    methods: {
        searchResource: debounce(async function search(value = "", forceGet) {
            this.isLoading = true;
            const url = this.resourceUrl;
            const hasSearchFields = this.searchableBy.length
            const requestMethod = hasSearchFields ? this.request : this.getAllResources;
            if (hasSearchFields || !this.options.length || forceGet) {
                const response = await requestMethod(url, value)
                this.options = this.processResponse ? this.processResponse(response) : response
            }
            this.isLoaded = true;
            this.isLoading = false;
        }, 300),

        async request(url, searchText) {
            if (url && url[0] != "/") {
                url = `/${url}`
            }

            const connector = url.includes("?") ? "&" : "?";
            const params = this.getParams(searchText)

            const resources = await axios({
                url: `${url}${connector}`,
                params
            })
                .then(({ data }) => data || [])
            return resources;
        },

        getParams(searchText, separator = "%") {
            const params = {}
            let stringParams = "";
            let filterParams = "";

            if (searchText.length) {
                if (this.searchableBy.length) {
                    stringParams = this.searchableBy.map(field => `${field}:${separator}${searchText}${separator}`).join(";");
                }
            }

            if (Object.keys(this.filters).length) {
                filterParams = Object.entries(this.filters).map(filter => `${filter[0]}:${filter[1]}`).join(",")
                stringParams = [stringParams, filterParams].filter(item => item).join(",")
            }

            if (stringParams) {
                params.q = `(${stringParams})`;
            }

            return params;
        },

        setLoaded() {
            if (this.searchableBy.length || !this.options.length) {
                this.isLoaded = false;
            }
        },

        emitId(resource) {
            const resourceId = resource ? resource[this.resourceId] : resource;
            this.$emit("input", this.shouldEmitId ? resourceId : resource);
            this.$emit("native-input", resource);
        },

        repositionDropdown(id) {
            const el = document.getElementById(id);
            const parent = el.closest(".multiselect");
            const content = parent.querySelector(".multiselect__content-wrapper");
            const { top, height, left } = parent.getBoundingClientRect();

            content.style.width = `${parent.clientWidth}px`;
            content.style.position = "fixed";
            content.style.bottom = "auto";
            content.style.top = `${top + height}px`;
            content.style.left = `${left}px`;
            this.searchResource("");
        }
    }
};
</script>
