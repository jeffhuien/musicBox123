/*
 * @Author: GAO GAO
 * @Date: 2023-09-05 18:11:52
 */
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import testRoute from '@/router/test'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/index.vue'),
      children: [
        {
          path: 'b',
          name: 'b',
          component: () => import('@/views/main/index.vue'),
        },
      ],
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
