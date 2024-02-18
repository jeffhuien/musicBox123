<script setup lang="ts">
import { Playlist } from '#/List/ListDetail'
import { Song } from '#/song/songInfo'
import { defineProps, toRefs, ref } from 'vue'
const props = defineProps<{
  data: Song[]
  info: Playlist
  name?: string
}>()
const { data, info, name } = toRefs(props)

let ls = ref()
function playAll() {
  ls.value.play(data.value![0])
}
</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full p-2 pb-0">
    <div class="top flex w-full">
      <div class="w-40 h-40 max-sm:w-32 max-sm:h-32 shrink-0 mr-6">
        <div class="relative">
          <el-image :src="info?.coverImgUrl || '/img/logo.png'" class="w-full h-full rounded-md" />
          <span
            v-if="info?.playCount"
            class="text-xs absolute bottom-3 right-1 text-white bg-black bg-opacity-50 px-2 py-[2px] rounded-full">
            <i class="fa-solid fa-play text-white mr-[2px]"> </i>
            {{
              info ? (info.playCount > 10000 ? (info.playCount / 10000).toFixed(2) + '万' : info.playCount) : ''
            }}</span
          >
        </div>
      </div>
      <div class="text-xs flex flex-col justify-between truncate">
        <h1 class="text-2xl max-sm:text-sm opacity-70 font-bold">{{ name ? name : info?.name }}</h1>
        <div class="flex items-center gap-3" @click="$router.push('/user/' + info?.creator.userId)">
          <ElAvatar :src="info?.creator.avatarUrl || '/img/logo.png'"></ElAvatar>
          {{ info?.creator.nickname || 'yuayua' }}
        </div>
        <div class="opacity-50 text-justify truncate">
          简介：
          <span class="">
            {{ info?.description || '未添加简介' }}
          </span>
        </div>
        <div class="">
          <div v-if="info?.tags.length" class="flex gap-2 items-center">
            <span class="opacity-50"> 标签：</span>
            <span v-for="i in info.tags" class="p-1 rounded-md text-white bg-teal-500">
              {{ i }}
            </span>
          </div>
          <div v-else class="opacity-50">标签：未添加标签</div>
        </div>
      </div>
    </div>
    <div class="flex justify-between p-4 shadow-sm rounded-md border max-sm:hidden">
      <div class="">
        <ElButton type="success" @click="playAll"> <i class="fa-solid fa-play mr-2"></i> 播放全部</ElButton>
      </div>
      <div class="">right</div>
    </div>

    <div class="flex-1 !overflow-hidden">
      <div class="h-full animate__animated animate__fadeIn">
        <list :lists-songs="(data as unknown as  Song[])" :list-name="info?.name" ref="ls" v-if="data" />
        <Loading v-else class="">loading</Loading>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
