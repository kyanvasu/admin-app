import isEmpty from "lodash/isEmpty";
import some from "lodash/some";
import pickBy from "lodash/pickBy";

import { mapGetters } from "vuex";

export const vueRouterMixins = {
    computed: {
        hasChanged() {
            return some(this.vvFields, field => field.changed);
        }
    },
    beforeRouteLeave(to, from, next) {
        const formFields = pickBy(this.vvFields, field => field.changed);

        if (!isEmpty(formFields)) {
            this.$modal.show(() => import(/* webpackChunkName: "components-modals-unsaved-changes" */ "@/components/modals/unsaved-changes"), {
                buttons: [{
                    title: "Discard",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next();
                    }
                }, {
                    title: "Cancel",
                    class: "btn-primary",
                    handler: () => {
                        this.$modal.hide("unsaved-changes");
                        next(false);
                    }
                }],
                fields: formFields
            }, {
                adaptive: true,
                clickToClose: false,
                height: "auto",
                name: "unsaved-changes",
                scrollable: true
            });
        } else {
            next();
        }
    }
}

export const vueCrudMixins = {
    methods: {
        triggerCancel() {
            if (some(this.formFields, field => field.changed)) {
                this.$modal.show("unsaved-changes", {
                    buttons: [{
                        title: "Discard",
                        handler: () => {
                            this.$modal.hide("unsaved-changes");
                            this.cancel();
                        }
                    }, {
                        title: "Cancel",
                        class: "btn-primary",
                        handler: () => {
                            this.cancel();
                            this.$modal.hide("unsaved-changes");
                        }
                    }],
                    fields: pickBy(this.formFields, field => field.changed)
                });
            } else {
                this.cancel();
            }
        }
    },
    watch: {
        formFields: {
            handler(formFields) {
                this.$emit("form-fields", formFields)
            },
            deep: true
        }
    }
}

export const vuexMixins = {
    computed: {
        ...mapGetters("Company", ["currentCompanyId"])
    },
    watch: {
        currentCompanyId() {
            try {
                this.initialize();
            } catch (error) {
                console.warn("Component expects a defined initialize() method to respond properly to a currentCompanyId change");
            }
        }
    }
}

export const listMixins = {
    methods: {
        initialize() {
            this.$refs.Vuetable.refresh();
        }
    }
}
