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
    meta: { login: true },
    component: () => import('@/views/iLike/index.vue'),
  },
  {
    name: 'video',
    path: '/video',
    meta: { enter: 'animate__fadeInRight' },

    component: () => import('@/views/video/index.vue'),
  },
  {
    name: 'find',
    path: '/find',
    component: () => import('@/views/find/index.vue'),
  },
  {
    name: 'cloudMusic',
    path: '/cloudMusic',
    meta: { login: true, enter: 'animate__fadeInRight' },
    component: () => import('@/views/cloudMusic/index.vue'),
  },
  {
    name: 'historyPlay',
    path: '/historyPlay',
    component: () => import('@/views/historyPlay/index.vue'),
  },
  {
    name: 'setting',
    path: '/setting',
    meta: { enter: 'animate__slideInUp' },
    component: () => import('@/views/setting/index.vue'),
  },
] as RouteRecordRaw[]
