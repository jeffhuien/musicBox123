/*
 * @Author: GAO GAO
 * @Date: 2023-10-12 17:53:24
 */

import { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'test',
    path: '/test',
    children: [
      {
        name: 'test1',
        path: '1',
        component: () => import('@/test/1.vue'),
      },
    ],
  },
] as RouteRecordRaw[]
