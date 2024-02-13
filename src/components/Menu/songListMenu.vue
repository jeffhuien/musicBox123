<script setup lang="ts">
import { listsType } from '#/index'

let props = defineProps<{ list: listsType[] }>()
const {
  value: { list },
} = toRef(props)
</script>

<template>
  <div class="w-full flex flex-col justify-center p-4 pt-0">
    <h1>自建歌单</h1>
    <div class="item-block">
      <router-link
        :to="{ name: `song.list`, params: { id: k.id } }"
        class="flex items-center"
        v-for="(k, index) in list"
        v-if="list"
        :index="index">
        <!-- <i :class="k.ico" class="text-lg mr-2 w-7"></i> -->
        <div class="flex text-xs w-full">
          <img :src="k.img" class="w-7 mr-2 rounded-sm" alt="" />
          <div class="flex flex-col flex-1 truncate">
            <span class="overflow-hidden w-full truncate">
              {{ k.name }}
            </span>
            <span class="opacity-50"> {{ k.count }}首 </span>
          </div>
        </div>
      </router-link>
      <span v-else class="opacity-50 text-xs mt-5">登录可用</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  @apply text-xs opacity-30 mb-2;
  &:first-child {
    @apply mt-4;
  }
}
.item-block {
  @apply w-full flex flex-col justify-center;

  a {
    @apply text-xs p-2 mb-1 rounded-md text-gray-500 hover:bg-gray-100;

    &.router-link-active {
      @apply font-bold bg-gray-300 text-sky-500;
    }
  }
}
</style>
