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
let findText = ref('')
const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage.toFixed(3)}%`)

// let findData = ref<CloudSongDataType[]>()
// let e = ref<string[]>([])
// function find(name: string) {
//   console.log(name)
//   let r = f.find((x) => {
//     console.log(x.name)

//     if (x.name == name || x.name?.includes(name)) findData.value?.push(x)
//     // x.ar.forEach((y) => {
//     //   if (y.name == name || y.name?.includes(name)) {
//     //     if (!e.value.includes(x.id.toString())) findData.value?.push(x)
//     //   }
//     // })
//   })

//   console.log(findData.value)

//   return findData
// }
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
        <!-- TODO 完成搜素功能 -->
        <input
          type="text"
          placeholder="搜索"
          @keyup.stop=""
          v-model="findText"
          class="transition-all duration-700 w-20 focus:w-40 rounded-3xl border caret-pink-500 pl-4 pr-8 py-1 max-sm:py-1 text-xs text-gray-600 focus:outline-sky-200 hover:border-lime-300 outline-none" />
        <i class="fa-solid fa-magnifying-glass absolute top-[20%] right-2 opacity-50"></i>
        <!-- <el-input v-model="input1" class="w-50 m-2" size="large" placeholder="Please Input" :suffix-icon="Search" /> -->
      </div>
    </div>

    <div class="flex-1 overflow-hidden" tabindex="1">
      <list :lists-songs="f" :noTag="true" :list-name="'我的云盘'" :cloud="true"></list>
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
