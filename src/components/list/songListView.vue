<script setup lang="ts">
// import { ListSongs } from '#/List/ListSongs'
import { listsType } from '#/index'
import { Song } from '#/song/songInfo'

const props = defineProps<{
  info: listsType
  songs: Song[] | undefined
}>()
</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full">
    <div class="top flex w-full">
      <div class="w-40 h-40 mr-6">
        <el-image :src="props.info.img" class="w-full h-full rounded-md" />
      </div>
      <div class="text-xs flex flex-col justify-between">
        <div class="text-2xl opacity-70 font-bold">{{ props.info.name }}</div>
        <div class="flex items-center gap-3">
          <ElAvatar :src="props.info.img"></ElAvatar>
          {{ props.info.name }}
        </div>
        <div class="opacity-50">添加简介</div>
        <div class="opacity-50">添加分类</div>
      </div>
    </div>
    <div class="flex justify-between p-4 shadow-sm rounded-md border max-sm:hidden">
      <div class="">btns</div>
      <div class="">right</div>
    </div>

    <div class="flex-1 !overflow-hidden">
      <div class="h-full">
        <list :lists-songs="props.songs" />
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
