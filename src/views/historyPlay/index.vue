<script setup lang="ts">
import { CommonApi } from '@/Api/Common'
import { auth } from '@/stores'
import { historyListType } from '#/index'
let data: historyListType
let t = ref()
onBeforeMount(async () => {
  if (auth().isLogin) {
    data = await CommonApi.getHistoryList()
    t.value = data.data.list.map((i) => i.data)
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="text-2xl opacity-80 flex p-2 items-center justify-between mb-5">
      <div class="mr-10">最近播放</div>
    </div>

    <div class="mr-5 flex justify-between mb-3">
      <div class=""></div>
      <div class="relative text-right">
        <!-- TODO 完成搜素功能 -->
        <input
          type="text"
          placeholder="搜索"
          @keyup.stop=""
          class="transition-all duration-700 w-20 focus:w-40 rounded-3xl border caret-pink-500 pl-4 pr-8 py-1 max-sm:py-1 text-xs text-gray-600 focus:outline-sky-200 hover:border-lime-300 outline-none" />
        <i class="fa-solid fa-magnifying-glass absolute top-[20%] right-2 opacity-50"></i>
        <!-- <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :suffix-icon="Search" /> -->
      </div>
    </div>

    <div class="flex-1 overflow-hidden" v-if="t">
      <list v-if="t" :lists-songs="t"></list>
      <loading v-else></loading>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
:deep(.el-progress__text) {
  @apply text-xs;
}
</style>
