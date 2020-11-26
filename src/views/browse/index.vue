<template>
    <div class="browse-table">
        <gw-browse
            ref="gwBrowse"
            :append-params="appendParams"
            :http-options="{ baseURL, headers: { Authorization: token }}"
            :pagination-data="paginationData"
            :query-params="queryParams"
            :resource="resource"
            pagination-path=""
            @load-error="loadError"
        >
            <template v-slot:actions="props">
                <div class="d-flex align-items-center justify-content-end" style="height:fit-content">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="editResource(props.rowData)"
                    >
                        <i class="fa fa-edit" />
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        @click="deleteResource(props.rowData.id)"
                    >
                        <i class="fa fa-trash" />
                    </button>
                </div>
            </template>
        </gw-browse>
    </div>
</template>

<script>
const { GwBrowse } = require(`@/import.${process.env.VUE_APP_IMPORTS}`);
import { mapState } from "vuex";

export default {
    name: "Browse",
    components: {
        GwBrowse
    },
    data() {
        return {
            appendParams: {
                format: "true"
            },
            isExpanded: false,
            baseURL: process.env.VUE_APP_BASE_API_URL,
            queryParams: {
                sort: "sort",
                page: "page",
                perPage: "limit"
            },
            token: this.$store.state.User.token || Cookies.get("token")
        }
    },
    computed: {
        ...mapState({
            resources: state => state.Application.resources
        }),
        resource() {
            const resources = [];
            this.resources.forEach(link => {
                if (link.links) {
                    resources.push(link, ...link.links)
                } else {
                    resources.push(link)
                }
            });
            return resources.find(resource => resource.slug == this.$route.params.resource);
        }
    },
    methods: {
        loadError(error) {
            this.$notify({
                title: "Error",
                text: error.response.data.errors.message,
                type: "error"
            });
        },
        paginationData(data) {
            const paginationData = {
                total: parseInt(data.total_rows),
                per_page: parseInt(data.limit),
                current_page: parseInt(data.page),
                last_page: parseInt(data.total_pages)
            }

            const nextParams = this.$refs.gwBrowse.getAllQueryParams();
            nextParams.page = nextParams.page == paginationData.last_page ? null : nextParams.page + 1;
            const prevParams = this.$refs.gwBrowse.getAllQueryParams();
            prevParams.page = prevParams.page == 1 ? null : prevParams.page - 1;

            const nextQuery = Object.keys(nextParams).map(key => `${key}=${nextParams[key]}`);
            const prevQuery = Object.keys(prevParams).map(key => `${key}=${prevParams[key]}`);

            paginationData.next_page_url = nextParams.page === null ? null : `${this.baseURL}?${nextQuery.join("&")}&format=true`;
            paginationData.prev_page_url = prevParams.page === null ? null : `${this.baseURL}?${prevQuery.join("&")}&format=true`;
            paginationData.from = (paginationData.current_page - 1) * paginationData.per_page + 1;
            paginationData.to = paginationData.from + paginationData.per_page - 1;

            return paginationData;
        },
        createResource() {
            if (this.resource.create_template && this.resource.create_template.includes("modal")) {
                this.$modal.show(this.resource.create_template, {
                    resource: this.resource
                });
            } else {
                this.$router.push({
                    name: "create-resource",
                    params: {
                        resource: this.resource.slug
                    }
                });
            }
        },

        editResource(record) {
            this.$router.push({ name: "edit-resource", params: {
                resource: this.resource.route || this.resource.slug,
                id: record.id
            } })
        },

        reload() {
            this.$refs.gwBrowse.$refs.Vuetable.reload()
        },

        deleteResource(id) {
            if (confirm("Are you sure you want to delete this record?")) {
                const url = this.resource.endpoint || this.resource.slug
                axios({
                    method: "DELETE",
                    url: `${url}/${id}`
                }).then(() => {
                    this.reload();
                })
            }
        }
    }
}
</script>

<style lang="scss">
.browse-table {
    position: relative;
    .table-container {
        border: 0;
        box-shadow: 0 7px 14px rgba(132, 132, 132, 0.15);
        padding: 20px;
        border-radius: 5px;
        background-color: white;
    }
}
</style>
