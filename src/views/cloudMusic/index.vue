<script setup lang="ts">
import { CloudSongDataType } from '#/song/cloudSong'
import { AuthApi } from '@/Api/Auth'
import buttons from '@/components/common/buttons.vue'
let data = await AuthApi.getCloud(100)

let f = data.data.map<CloudSongDataType>((x: any) => {
  let t = x.simpleSong
  t.fileSize = x.fileSize
  return t
})
let c = (parseInt(data.size) / 1000000000).toFixed(2)
let t = (parseInt(data.maxSize) / 1000000000).toFixed(2)
const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage.toFixed(3)}%`)
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="text-2xl opacity-80 flex items-center justify-between mb-5">
      <div class="mr-10">
        音乐云盘
        <span class="text-xs max-sm:block opacity-50"> {{ c }}G/ {{ t }}G </span>
      </div>
      <div class="w-2/5">
        <el-progress :style="'text-xs'" :percentage="parseFloat(c) / parseFloat(t)" :format="format" />
      </div>
    </div>

    <div class="mr-5 flex justify-between mb-3">
      <div class="">
        <buttons></buttons>
      </div>
      <div class="relative text-right">
        <!-- TODO finish -->
        <input
          type="text"
          placeholder="搜索"
          @input=""
          @keyup.stop=""
          class="transition-all duration-700 w-20 focus:w-40 rounded-3xl border caret-pink-500 pl-4 pr-8 py-1 max-sm:py-1 text-xs text-gray-600 focus:outline-sky-200 hover:border-lime-300 outline-none" />
        <i class="fa-solid fa-magnifying-glass absolute top-[20%] right-2 opacity-50"></i>
        <!-- <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :suffix-icon="Search" /> -->
      </div>
    </div>

    <div class="flex-1 overflow-hidden">
      <list :lists-songs="f" :noTag="true" :cloud="true"></list>
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
