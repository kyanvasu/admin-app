<template>
    <div class="company-switcher">
        <multiselect
            :disabled="!shouldActivateSwitcher"
            :allow-empty="false"
            :options="companiesList"
            :searchable="false"
            :show-labels="false"
            :value="branchData"
            group-values="branches"
            group-label="name"
            label="name"
            @select="company => $emit('select', company)"
        />
    </div>
</template>

<script>
/**
 * @NOTE value is used instead of v-model because we are reloading the page
 * and we do not need VueMultiselect to update anything for us.
 * See also: switchCompany()
 */
export default {
    name: "GwCompaniesSwitcher",
    props: {
        companyData: {
            type: Object,
            required: true
        },
        branchData: {
            type: Object,
            required: true
        },
        companiesList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
        shouldActivateSwitcher() {
            return this.companiesList.length > 1 || this.companyData.branches && this.companyData.branches.length > 1;
        }
    }
}
</script>

<style lang="scss">
.company-switcher {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 10px;

    .multiselect {
        .multiselect__select {
            font-family: "Font Awesome 5 Pro";
            font-weight: 900;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;

            &::before {
                border-width: 0;
                content: "\f078";
                top: initial;
                margin-top: 0;
                color: #4B4B4B;
                z-index: 1;
            }
        }

        .multiselect__tags {
            border: 0;
            display: flex;
            align-items: center;
            padding-top: 0;
            padding-left: 0;
            position: relative;

            .multiselect__single {
                margin-bottom: 0;
                text-transform: uppercase;
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 3.2px;
                font-family: 'Lato', sans-serif;
                color: #4B4B4B;
            }
        }

        .multiselect__content-wrapper {
            width: auto;
        }

        &.multiselect--active {
            .multiselect__select {
                transform: rotate(0);
            }
        }

        &.multiselect--disabled {
            background: initial;
            opacity: 1;

            .multiselect__select {
                display: none;
            }

            .multiselect__tags {
                padding-right: 10px;
            }
        }
    }
}

@media(max-width: 992px) {
    .company-switcher {
        padding: 0 5px;

        /deep/ .multiselect {
            .multiselect__content {
                position: fixed;
                width: 100%;
                left: 0;
                border: 0;
                background-color: white;
            }
        }
    }
}

@media (max-width: 576px) {
    .company-switcher {
        margin-left: 5px;
    }
}
</style>
