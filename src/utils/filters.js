import dayjs from "dayjs"
import Vue from "vue"


Vue.filter('timeFilter', (val) => {
    return dayjs(val).format('YYYY-MM-DD')
})

Vue.filter('timeFilter2', (val) => {
    return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
})

// function timeFilter(val) {
//     return dayjs(value).format('YYYY-MM-DD')
// }
// export { timeFilter }