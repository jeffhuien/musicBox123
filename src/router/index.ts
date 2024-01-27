import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import testRoute from '@/router/test'
import leftMenu from '@/router/leftMenu'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/index.vue'),
      children: [...leftMenu],
    },
    {
      path: '/play',
      name: 'play',
      component: () => import('@/layout/play/index.vue'),
      children: [
        {
          path: 'b',
          name: 'b',
          component: () => import('@/views/main/index.vue'),
        },
      ],
    },

    {
      path: '/search',
      name: 'search',
      component: () => import('@/layout/search/index.vue'),
      children: [
        {
          path: 'b',
          name: 'b',
          component: () => import('@/views/main/index.vue'),
        },
      ],
    },
    //测试路由
    ...testRoute,
  ],
})

export default router
