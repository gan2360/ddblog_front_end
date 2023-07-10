import Vue from 'vue'
import App from './App.vue'
import '@/utils/element.js'
import dayjs from "dayjs"
import '@/utils/filters'
import { router } from './router'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
Vue.prototype.$dayjs = dayjs;

Vue.config.productionTip = false


new Vue({
    render: h => h(App),
    router,
}).$mount('#app')