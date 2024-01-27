<script setup lang="ts">
// import { RouteNames } from '#/index'

enum RouteNames {
  b = 'b',
  test1 = 'test1',
  recommend = 'recommend',
  musicStore = 'musicStore',
  iLike = 'iLike',
  mv = 'mv',
  home = 'home',
  play = 'play',
  search = 'search',
  test = 'test',
  find = 'find',
}
const menus = ref<{ ico: string; name: string; toName: RouteNames }[]>([
  { ico: 'fa-solid fa-meteor', name: '推荐', toName: RouteNames.recommend },
  { ico: 'fa-brands fa-app-store-ios', name: '乐库', toName: RouteNames.musicStore },
  { ico: 'fa-brands fa-youtube', name: '视频', toName: RouteNames.mv },
  { ico: 'fa-solid fa-search', name: '找人', toName: RouteNames.find },
])

const menus1 = ref<{ ico: string; name: string; toName: RouteNames }[]>([
  { ico: 'fa-regular fa-heart', name: '我喜欢', toName: RouteNames.iLike },
])
</script>

<template>
  <div class="w-full flex flex-col justify-center p-4">
    <div class="item-block">
      <h1>发现音乐</h1>
      <router-link :to="{ name: i.toName }" class="flex items-center" v-for="(i, index) in menus" :index="index">
        <i :class="i.ico" class="text-lg mr-2"></i>
        {{ i.name }}
      </router-link>
    </div>
    <div class="item-block">
      <h1>我的音乐</h1>
      <router-link :to="{ name: i.toName }" class="flex items-center" v-for="(i, index) in menus1" :index="index">
        <i :class="i.ico" class="text-lg mr-2"></i>
        {{ i.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item-block {
  @apply w-full flex flex-col justify-center;

  h1 {
    @apply text-xs opacity-30 mb-2;
    &:first-child {
      @apply mt-4;
    }
  }
  a {
    @apply text-xs p-2 mb-1 rounded-md text-gray-500;

    &.router-link-active {
      @apply font-bold bg-gray-300 text-gray-700;
    }
  }
}
</style>
