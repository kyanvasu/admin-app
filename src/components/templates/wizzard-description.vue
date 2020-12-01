<template>
    <form-wizzard
        ref="Wizzard"
        v-model="step"
        :show-steps="false"
        :steps="steps"
        @finished="$emit('finished')"
        @reset="$emit('reset')"
    >
        <!-- General Information -->
        <form-wizzard-tab
            name="description"
            title="Let's talk about your project"
            description="General information"
        >
            <div>
                <div class="form-group">
                    <label for="">Company or Project Name</label>
                    <input v-model="formData.name" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">How'd you describe your project</label>
                    <textarea
                        id=""
                        v-model="formData.description"
                        name=""
                        cols="30"
                        rows="10"
                        class="form-control"
                    />
                </div>
            </div>
        </form-wizzard-tab>
        <!-- End of general information -->

        <!-- Colors and photo -->
        <form-wizzard-tab
            name="description"
            title="Let's talk about your project"
            description="Select colors"
        >
            <div>
                <div class="form-group">
                    <label for="">Company or Project Name</label>
                    <input v-model="formData.mainColor" type="color" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">How'd you describe your project</label>
                    <input v-model="formData.secundaryColor" type="color" class="form-control">
                </div>
            </div>
        </form-wizzard-tab>
        <!-- End of Colors and photo -->

        <!-- URL Data -->
        <form-wizzard-tab
            name="description"
            title="Let's talk about your project"
            description="And Last, do you have any url in mind?"
        >
            <div>
                <div class="form-group">
                    <label for="">Type your URL</label>
                    <input v-model="formData.url" type="text" class="form-control">
                </div>
            </div>
        </form-wizzard-tab>
        <!-- End of URL Data -->
    </form-wizzard>
</template>

<script>
import FormWizzard from "@c/molecules/wizzard.vue";
import FormWizzardTab from "@c/molecules/wizzard-tab.vue";

export default {
    components: {
        FormWizzard,
        FormWizzardTab
    },
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            isCreating: false,
            isSaved: false,
            steps: [{
                name: "description1"
            },
            {
                name: "description2"
            },
            {
                name: "description3"
            }],
            step: 0
        }
    },
    methods: {
        next() {
            this.$refs.Wizzard.next();
        },
        previous() {
            this.$refs.Wizzard.previous();
        }
    }
}
</script>

<style>

</style>
