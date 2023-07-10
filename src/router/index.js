import VueRouter from "vue-router";
import Vue from 'vue'
import MyRegister from '@/pages/MyRegister'
import Login from '@/pages/Login'
import PersonalInfo from '@/pages/PersonalInfo'
import Release from '@/pages/Release'
import PageList from '@/pages/PageList'
import EssayDetail from '@/pages/EssayDetail'
import Settings from '@/pages/Settings'
import Home from '@/pages/Home'



Vue.use(VueRouter)

export const router = new VueRouter({
    publicPath: './',
    routes: [{
            path: '/',
            component: Login
        },
        {
            path: '/register',
            component: MyRegister,
            name: 'MyRegister'
        },
        {
            path: '/login',
            component: Login,
            name: 'Login'
        },
        {
            path: '/personal_info/:username',
            component: PersonalInfo,
            name: 'PersonalInfo',
            props(route) {
                return {
                    username: route.params.username
                }
            }
        },
        {
            path: '/release',
            component: Release,
            name: 'Release',

        },
        {
            path: '/pagelist/:username',
            component: PageList,
            name: 'PageList',
            props(route) {
                return {
                    username: route.params.username
                }
            }
        },
        {
            path: `/topic/:username/:t_id`,
            component: EssayDetail,
            name: 'EssayDetail',
            props(route) {
                return {
                    username: route.params.username,
                    t_id: route.params.t_id
                }
            }
        },
        {
            path: `/settings/:username`,
            component: Settings,
            name: 'Settings',
            props(route) {
                return {
                    username: route.params.username
                }
            }
        },
        {
            path: `/home/:username`,
            component: Home,
            name: 'Home',
            props(route) {
                return {
                    username: route.params.username
                }
            }
        }

    ]
})