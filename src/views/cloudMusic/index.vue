<script setup lang="ts">
import { CloudSongDataType, CloudSongType } from '#/song/cloudSong'
import { AuthApi } from '@/Api/Auth'
import buttons from '@/components/common/buttons.vue'
import { searchSongList, sortSongList } from '@/utils'

let data = ref<CloudSongType>({} as CloudSongType)
data.value = await AuthApi.getCloud(100)

let copy = ref<CloudSongDataType[]>([])
let ls = ref()

function playAll() {
  ls.value.play(data.value.data[0].simpleSong)
}

let f: CloudSongDataType[] = data.value.data.map<CloudSongDataType>((x: any) => {
  let t = x.simpleSong
  t.fileSize = x.fileSize
  return t
})

copy = ref<CloudSongDataType[]>(f)
let c = (parseInt(data.value.size) / 1000000000).toFixed(2)
let t = (parseInt(data.value.maxSize) / 1000000000).toFixed(2)
const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage.toFixed(3)}%`)

let asc = true // true: asc升序
function sort(t: string) {
  sortSongList(copy, t, ref(f), asc)
  asc = !asc
}

function search(w: string) {
  return searchSongList(copy, w, ref(f))
}
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
      <buttons @play-all="playAll" @sort="sort" @search="search" :Upload="true"></buttons>
    </div>

    <div class="flex-1 overflow-hidden" tabindex="1">
      <list :lists-songs="copy" :noTag="true" :list-name="'我的云盘'" :cloud="true" ref="ls"></list>
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
