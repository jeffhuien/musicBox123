<script setup lang="ts">
import _ from 'lodash'
import { CloudSongDataType, CloudSongType } from '#/song/cloudSong'
import { AuthApi } from '@/Api/Auth'
import { sortSongList } from '@/utils'

let ls = ref()
let data = ref<CloudSongType>({} as CloudSongType)
let f = ref<CloudSongDataType[]>([])
let copy = ref<CloudSongDataType[]>([])
let page = reactive({ lim: 20, offset: 1 })
let asc = true // true: asc升序
const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage.toFixed(3)}%`)
const loading = ref(false)
let k = ref(false)
const disabled = computed(() => loading.value || noMore.value || k.value)

data.value = await AuthApi.getCloud(page.lim, 0)
const noMore = computed(() => data.value.count <= f.value.length || k.value == true)
f.value = data.value.data.map<CloudSongDataType>((x: any) => {
  let t = x.simpleSong
  t.fileSize = x.fileSize
  return t
})

let c = (parseInt(data.value.size) / 1000000000).toFixed(2)
let t = (parseInt(data.value.maxSize) / 1000000000).toFixed(2)
function playAll() {
  ls.value.play(data.value.data[0].simpleSong)
}

copy = ref<CloudSongDataType[]>(_.cloneDeep(f.value))

/**
 *
 * @param t 排序依据
 */
function sort(t: string) {
  sortSongList(f, t, copy, asc)
  asc = !asc
}

/**
 *
 * @param w 搜索的关键字
 */
function search(w: string) {
  if (w != '') {
    k.value = true
    f.value = f.value.filter((x) => {
      return x.name.toLowerCase().includes(w.toLowerCase())
    })
  } else {
    f.value = copy.value
    k.value = false
  }
}

async function load() {
  if (!noMore.value && !loading.value) {
    loading.value = true
    setTimeout(async () => {
      let t = await AuthApi.getCloud(page.lim, page.offset++ * page.lim)
      data.value.data.push(...t.data)
      f.value = data.value.data.map<CloudSongDataType>((x: any) => {
        let t = x.simpleSong
        t.fileSize = x.fileSize
        return t
      })
      copy.value = _.cloneDeep(f.value)
      loading.value = false
    }, 2000)
  }
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
      <list
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        :lists-songs="f"
        :noTag="true"
        :list-name="'我的云盘'"
        :cloud="true"
        ref="ls"></list>
      <p v-if="loading">Loading...</p>
      <p v-if="noMore">No more</p>
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
