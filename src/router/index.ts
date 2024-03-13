import leftMenu from '@/router/leftMenu'
import testRoute from '@/router/test'
import { auth, main } from '@/stores'
import { createRouter, createWebHashHistory } from 'vue-router'
import LeftSongList from './LeftSongList'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layout/main/index.vue'),
      children: [
        ...leftMenu,
        ...LeftSongList,

        {
          path: '/search',
          name: 'search',
          component: () => import('@/layout/search/index.vue'),
        },
      ],
      redirect: 'recommend',
    },
    {
      path: '/play',
      name: 'play',
      meta: { enter: 'animate__slideInUp', leave: 'animate__slideOutDown' },
      component: () => import('@/layout/play/index.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue'),
    },

    {
      path: '/:pathMatch(.*)',
      redirect: '/404',
    },

    //测试路由
    ...testRoute,
  ],
})

router.beforeEach((to, from) => {
  if (to.meta.login && !auth().isLogin) {
    ElMessage({
      message: '需要登录',
      duration: 2000,
      type: 'warning',
    })
    main().loginShow = true
    return '/login'
  }

  if (to.name === 'login' && auth().isLogin) {
    ElMessage.success('已经登录过了 ')
    return from
  }
})

export default router
