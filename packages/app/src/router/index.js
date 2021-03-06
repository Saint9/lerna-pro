import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout.vue'
import Home from '@/pages/tabbar/home/index.vue'

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
      },
      {
        path: '/tabbar/list',
        name: 'TabbarList',
        meta: { title: '列表' },
        component: () => import('@/pages/tabbar/list/index.vue')
      },
      {
        path: '/tabbar/form',
        name: 'TabbarForm',
        meta: { title: '表单' },
        component: () => import('@/pages/tabbar/form/index.vue')
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
