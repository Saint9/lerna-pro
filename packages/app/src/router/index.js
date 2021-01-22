import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import Home from '@/pages/tabbar/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BasicLayout',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页' },
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('@/pages/user/login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
