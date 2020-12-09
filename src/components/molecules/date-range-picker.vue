<template>
    <div class="date-range">
        <el-popover
            v-model="show"
            placement="bottom-end"
            width="250"
            popper-class="date-range__popover"
        >
            <div v-if="!customDate" class="dropdown">
                <ul class="list-group list-group-flush dropdown__body">
                    <button
                        v-for="(shortcut, i) in shortcuts[mode]"
                        :key="`single-shortcut-${i}`"
                        class="list-group-item dropdown-item"
                        @click="setSelectedOption(shortcut)"
                    >
                        {{ shortcut.text }}
                    </button>
                    <button class="list-group-item dropdown-item" @click="setCustomDate">
                        Custom Date
                    </button>
                </ul>
            </div>

            <div v-else class="p-1">
                <div>
                    <button class="btn btn-block btn-primary" @click="customDate=false">
                        back
                    </button>
                </div>
                <div class="pt-2 form-group">
                    <label for="">Start Date </label>
                    <el-date-picker
                        v-model="dates.start"
                        type="date"
                        placeholder="Pick a day"
                    />
                </div>

                <div class="pt-2 form-group">
                    <label for=""> Last Date </label>
                    <el-date-picker
                        v-if="rangeMode"
                        v-model="dates.end"
                        type="date"
                        placeholder="Pick a day"
                    />
                </div>
            </div>
            <button slot="reference" class="btn date-range__caller">
                {{ currentLabel || 'Date Range' }}
                <i class="fas fa-angle-down ml-2" />
            </button>
        </el-popover>
    </div>
</template>

<script>
const DAY = 3600 * 1000 * 24
import moment from "moment"
export default {
    props: {
        rangeMode: {
            type: Boolean,
            default: false
        },
        value: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show: false,
            dates: {
                start: "",
                end: ""
            },
            selectedOption: null,
            customDate: false
        }
    },
    computed: {
        mode() {
            return this.rangeMode ? "range" : "single";
        },
        shortcuts() {
            return {
                single: [{
                    name: "today",
                    text: "Today",
                    start: 0
                },
                {
                    name: "yesterday",
                    text: "Yesterday",
                    start: - 3600 * 1000 * 24
                },
                {
                    name: "aWeekAgo",
                    text: "A week ago",
                    start: - 3600 * 1000 * 24 * 7
                }],
                range: [
                    {
                        name: "lastMonth",
                        text: "Last Month",
                        start: - DAY * 30,
                        end: 0
                    },
                    {
                        name: "last3Months",
                        text: "Last 3 months",
                        start: - DAY * 90,
                        end: 0
                    },
                    {
                        name: "last6Months",
                        text: "Last 6 Months",
                        start: - DAY * 180,
                        end: 0
                    },
                    {
                        name: "thisYear",
                        text: "This Year",
                        start: - DAY * 365,
                        end: 0
                    }
                ],
                selectedOption: null
            }
        },

        currentLabel() {
            return this.selectedOption ? this.selectedOption.text : this.currentValue;
        },

        currentValue() {
            if (this.dates.start && this.dates.end) {
                return `${moment(this.dates.start).format("YYYY-MM-DD")} - ${moment(this.dates.end).format("YYYY-MM-DD")}`
            }
            return ""
        }
    },
    watch: {
        value: {
            handler(date) {
                this.dates.start = date.start
                this.dates.end = date.end
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        if (!this.dates.start) {
            this.setSelectedOption(this.shortcuts[this.mode][0]);
        }
    },
    methods:{
        setSelectedOption(option) {
            this.selectedOption = option;
            this.getDateValue(option.start, option.end, true)
        },

        getDateValue(startValue, endValue, close) {
            const startDate = new Date();
            const endDate = endValue >= 0 ? new Date() : endValue;

            startDate.setTime(startDate.getTime() + startValue);
            this.setDate(startDate)

            if (endDate) {
                endDate.setTime(endDate.getTime() + endValue);
            }
            this.setDate(endDate, "end", close)

        },

        setDate(date, prop = "start", close) {
            this.$set(this.dates, prop, date);
            this.$emit("input", this.dates);
            console.log(this.dates);
            if (close) {
                this.show = false;
            }
        },

        setCustomDate() {
            this.customDate = true;
            this.selectedOption = null
        }

    }
}
</script>

<style lang="scss" scoped>
    .dropdown-item {
        &:hover {
            background: whitesmoke;
            cursor: pointer;
        }

        &:focus {
            outline: none;
        }

        &:active {
            color: unset;
        }
    }

    .date-range {
        &__caller {
            background: transparent;
            color: inherit;

            &:focus {
                outline: none;
                box-shadow: none;
            }
        }

        &__popover {
            padding: 0 0 0 0;
        }
    }
</style>

<style lang="scss">
    .date-range {
        &__popover {
            padding: 0 0 0 0;
            overflow: hidden;
        }
    }
</style>
