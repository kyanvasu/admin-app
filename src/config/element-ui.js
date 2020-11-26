import Vue from "vue";
import lang from "element-ui/lib/locale/lang/en"
import locale from "element-ui/lib/locale"
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";


// configure language
locale.use(lang)
import { DatePicker, Dialog, Popover, Upload, Loading, Table, TableColumn, Pagination } from "element-ui";

Vue.use(DatePicker)
Vue.use(Popover)
Vue.use(Upload)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Loading)
Vue.use(CollapseTransition)
Vue.component(CollapseTransition.name, CollapseTransition)
