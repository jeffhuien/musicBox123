import { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'recommend',
    path: '/recommend',
    component: () => import('@/views/recommend/index.vue'),
  },
  {
    name: 'musicStore',
    path: '/musicStore',
    component: () => import('@/views/musicStore/index.vue'),
  },
  {
    name: 'iLike',
    path: '/iLike',
    component: () => import('@/views/iLike/index.vue'),
  },
  {
    name: 'mv',
    path: '/mv',
    component: () => import('@/views/mv/index.vue'),
  },
  {
    name: 'find',
    path: '/find',
    component: () => import('@/views/find/index.vue'),
  },
  {
    name: 'cloudMusic',
    path: '/cloudMusic',
    component: () => import('@/views/cloudMusic/index.vue'),
  },
  {
    name: 'historyPlay',
    path: '/historyPlay',
    component: () => import('@/views/historyPlay/index.vue'),
  },
] as RouteRecordRaw[]

let a = []
