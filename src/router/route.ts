import Home from '@/views/Home.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            showMenu: true
        }
    },
    {
        path: '/archives',
        name: 'archives',
        component: () => import('@/views/Archives.vue'),
        meta: {
            showMenu: true
        }
    },
    {
        path: '/somecomponent',
        name: 'somecomponent',
        component: () => import('@/views/SomeComponent.vue'),
        meta: {
            showMenu: false,
        }
    },
    {
        path: '/chain',
        name: 'chain',
        component: () => import('@/views/Chain.vue'),
        meta: {
            showMenu: false
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/About.vue'),
        meta: {
            showMenu: false
        }
    }
]
export default routes