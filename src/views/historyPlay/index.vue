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

    <div class="flex-1 overflow-hidden" v-if="t">
      <list v-if="t" :lists-songs="t"></list>
      <loading v-else></loading>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-progress__text) {
  @apply text-xs;
}
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
