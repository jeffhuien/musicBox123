<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex w-full h-full gap-3 relative">
      <div
        class="shrink-0 h-full transition-all duration-700 max-sm:absolute z-50"
        :class="[menuClose && main().isMobile ? '!w-0' : 'max-sm:w-3/5']">
        <el-scrollbar class="relative w-full md:min-w-[12rem] h-full bg-white shrink-0 shadow-lg">
          <left-menu />
          <song-list-menu v-if="data" :list="(data as listsType[])" />
        </el-scrollbar>
        <i
          class="fa-solid absolute top-1/4 left-full py-3 px-1 rounded-e-md bg-black bg-opacity-40 text-white z-50 text-sm -translate-y-1"
          :class="[menuClose ? 'fa-angle-right' : 'fa-angle-left']"
          @click="menuClose = !menuClose"></i>
      </div>

      <div
        class="flex-grow overflow-hidden h-full flex-1 w-5/6 md:pr-2"
        @click="!main().isMobile ? 0 : (menuClose = true)">
        <router-view v-slot="{ Component }">
          <transition
            appear
            :enter-active-class="
              $route.meta.enter ? 'animate__animated ' + $route.meta.enter : 'animate__animated animate__fadeIn'
            ">
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
let { userList, cur } = toRefs(queryUserList())
const { menuClose } = toRefs(main())

let data = ref<listsType[] | boolean>()
async function setData(user: Ref<any>) {
  let uId = user.value.data.profile.userId.toString()
  let t = await ListApi.getList(uId)
  queryUserList().add(uId, t)
  queryUserList().cur = 0
  data.value = userList.value[cur.value].ls
}

let { user } = storeToRefs(auth())
if (user.value?.data) setData(user)

watch(user, async () => {
  setData(user)
})
</script>

<style scoped lang="scss">
.menu {
  @apply max-md:absolute max-md:w-2/5;
}
</style>
