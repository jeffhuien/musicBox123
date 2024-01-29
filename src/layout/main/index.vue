<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex w-full h-full gap-3 relative">
      <el-scrollbar
        class="w-1/6 md:min-w-[12rem] h-full bg-white z-20 shrink-0 shadow-lg menu max-md:hidden"
        :class="[main().isMobile ? 'animate__animated animate__slideOutLeft' : '']">
        <left-menu />
        <song-list :list="(data as listsType[])" v-if="data" />
      </el-scrollbar>
      <div class="flex-grow overflow-hidden h-full flex-1 w-5/6 md:pr-2">
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animate__animated animate__slideInUp">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { listsType } from '#/index'
import { main, queryUserList } from '@/stores'
let { userList, cur } = toRefs(queryUserList())
let data = ref(userList.value.length ? userList.value[cur.value].ls : false)
</script>

<style scoped lang="scss">
.menu {
  @apply max-md:absolute max-md:w-2/5;
}
</style>
