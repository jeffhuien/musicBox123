import { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'song.list',
    path: '/list/:id([0-9]*)',
    component: () => import('@/views/songList/index.vue'),
  },
] as RouteRecordRaw[]
