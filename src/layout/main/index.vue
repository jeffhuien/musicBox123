<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex w-full h-full gap-3 relative">
      <el-scrollbar
        class="w-1/6 md:min-w-[12rem] h-full bg-white z-20 shrink-0 shadow-lg menu max-md:hidden"
        :class="[main().isMobile ? 'animate__animated animate__slideOutLeft' : '']">
        <left-menu />
        <song-list-menu :list="(data as listsType[])" />
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
import { ListApi } from '@/Api/List'
import { auth, main, queryUserList } from '@/stores'
import { storeToRefs } from 'pinia'
// import from '@/components/'
let { userList, cur } = toRefs(queryUserList())

// let data = ref(userList.value.length ? userList.value[cur.value].ls : false)
let data = ref<listsType[] | boolean>()

let { user } = storeToRefs(auth())

if (user.value) {
  let t = await ListApi.getList(user.value.data.profile.userId.toString())
  queryUserList().add(user.value.data.profile.userId.toString(), t)
  queryUserList().cur = 0
  data.value = userList.value[cur.value].ls
  // console.log(data.value)
}
</script>

<style scoped lang="scss">
.menu {
  @apply max-md:absolute max-md:w-2/5;
}
</style>
