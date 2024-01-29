import { RouteRecordRaw } from 'vue-router'

export default [
  {
    name: 'song.list',
    path: '/list/:id',
    component: () => import('@/views/songList/index.vue'),
  },
] as RouteRecordRaw[]
