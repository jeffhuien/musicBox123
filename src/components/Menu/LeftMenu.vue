<script setup lang="ts">
import { menu } from '#/menu'
import { RouteNames } from '@/enum/routeName'
import { auth, main } from '@/stores'
const menus = ref<menu[]>([
  {
    name: '发现音乐',
    item: [
      { ico: 'fa-solid fa-meteor', name: '推荐', toName: RouteNames.recommend },
      { ico: 'fa-brands fa-app-store-ios', name: '乐库', toName: RouteNames.musicStore },
      { ico: 'fa-brands fa-youtube', name: '视频', toName: RouteNames.mv },
      { ico: 'fa-solid fa-search', name: '找人', toName: RouteNames.find },
    ],
  },
  {
    name: '我的音乐',
    item: [
      { ico: 'fa-regular fa-heart', name: '我喜欢', toName: RouteNames.iLike },
      { ico: 'fa-solid fa-cloud', name: '音乐网盘', toName: RouteNames.cloudMusic },
      { ico: 'fa-solid fa-clock-rotate-left', name: '最近播放', toName: RouteNames.historyPlay },
    ],
  },
])
</script>

<template>
  <div class="w-full flex flex-col justify-center p-4">
    <a v-if="!auth().user" @click="main().loginShow = true" class="flex items-center">
      <i class="fa-solid fa-user text-lg mr-2 w-7"></i>
      登录
    </a>
    <a @click="$router.go(0)" class="flex items-center">
      <i class="fa-solid fa-refresh text-lg mr-2 w-7"></i>
      更新版本
    </a>
    <div class="item-block" v-for="(i, index) in menus" :index="index">
      <h1>{{ i.name }}</h1>
      <router-link :to="{ name: k.toName }" class="flex items-center" v-for="(k, index) in i.item" :index="index">
        <i :class="k.ico" class="text-lg mr-2 w-7"></i>
        {{ k.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-block {
  @apply w-full flex flex-col justify-center;
}
h1 {
  @apply text-xs opacity-30 mb-2;
  &:first-child {
    @apply mt-4;
  }
}
a {
  @apply text-xs p-2 mb-1 rounded-md text-gray-500 hover:bg-gray-100;

  &.router-link-active {
    @apply font-bold bg-gray-300 text-sky-500;
  }
}
</style>
