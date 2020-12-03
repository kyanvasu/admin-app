<template>
    <form-wizard
        ref="Wizard"
        v-model="step"
        :show-steps="false"
        :steps="steps"
        @finished="$emit('finished')"
        @reset="$emit('reset')"
    >
        <!-- filesystem data-->
        <form-wizard-tab
            name="filesystem"
            title="What about the data"
            description="Select a project type to get started"
            :before-change="validateFields.bind(null, ['filesystem'])"
        >
            <div>
                <general-box
                    v-for="filesystem in filesystems"
                    :key="filesystem"
                    :clickable="true"
                    :title="filesystem"
                    class="project-types mb-4"
                    icon-class="fa fa-pc"
                    theme-color="#8582D1"
                    title-color="#707070"
                    :show-action="false"
                    :selected="formData.filesystem == filesystem"
                    @click="formData.filesystem=filesystem"
                />
                <small v-if="isInvalid" class="text-danger"> This field is required </small>
            </div>
        </form-wizard-tab>
        <!-- End of filesystem data -->

        <!-- language data -->
        <form-wizard-tab
            name="language"
            title="What about the data"
            description="Select a language preference"
            :before-change="validateFields.bind(null, ['language'])"
        >
            <div class="w-full">
                <div class="form-group mt-5">
                    <multiselect
                        v-model="formData.language"
                        v-validate="`required`"
                        :allow-empty="false"
                        label="name"
                        track-by="id"
                        :options="languages"
                        :show-labels="false"
                        name="language"
                        placeholder="Select a language"
                    />
                    <small v-if="isInvalid" class="text-danger"> This field is required </small>
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of language -->

        <!-- timezone Data -->
        <form-wizard-tab
            name="timezone"
            title="What about the data"
            description="Select a Time-Zone"
            :before-change="validateFields.bind(null, ['timezone'])"
        >
            <div class="w-full">
                <div class="form-group mt-5">
                    <multiselect
                        v-model="formData.timezone"
                        v-validate="`required`"
                        :allow-empty="false"
                        :options="timezones"
                        :show-labels="false"
                        name="timezones"
                        placeholder="Select a Time-Zone"
                    />
                    <small v-if="isInvalid" class="text-danger"> This field is required </small>
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of timezone Data -->

        <!-- currency Data -->
        <form-wizard-tab
            name="currency"
            title="What about the data"
            description="Select a currency"
            :before-change="validateFields.bind(null, ['currency'])"
        >
            <div class="w-full">
                <div class="form-group mt-5">
                    <multiselect
                        v-model="formData.currency"
                        v-validate="`required`"
                        label="currency"
                        track-by="id"
                        :allow-empty="false"
                        :options="currencies"
                        :show-labels="false"
                        name="currency"
                        placeholder="Select a currency"
                    />
                    <small v-if="isInvalid" class="text-danger"> This field is required </small>
                </div>
            </div>
        </form-wizard-tab>
        <!-- End of currency Data -->
    </form-wizard>
</template>

<script>
import FormWizard from "@c/organisms/wizard.vue";
import FormWizardTab from "@c/molecules/wizard-tab.vue";
import GeneralBox from "@c/molecules/general-box";
import { mapState } from "vuex";
import { wizardMixins } from "@/utils/mixins";

export default {
    components: {
        FormWizard,
        FormWizardTab,
        GeneralBox
    },
    mixins: [wizardMixins],
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        },
        filesystems: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            isCreating: false,
            isSaved: false,
            steps: [{
                name: "filesystem"
            },
            {
                name: "language"
            },
            {
                name: "timezone"
            },
            {
                name: "currency"
            }],
            step: 0
        }
    },
    computed: {
        ...mapState({
            languages: state => state.Application.languages,
            timezones: state => state.Application.timezones,
            currencies: state => state.Application.currencies
        })
    },
    created() {
        this.init();
    },
    methods: {
        next() {
            this.$refs.Wizard.next();
        },
        previous() {
            this.$refs.Wizard.previous();
        },
        async init() {
            await this.$store.dispatch("Application/getLanguages");
            await this.$store.dispatch("Application/getTimezones");
            await this.$store.dispatch("Application/getCurrencies");
        }

    }
}
</script>

<style lang="scss" scoped>

</style>
