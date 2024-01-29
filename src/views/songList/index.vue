<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ListApi } from '@/Api/List'
import { queryUserList } from '@/stores'
import { ListSongs } from '#/List/ListSongs'
import { Song } from '#/song/songInfo'

let Id = ref(parseInt(useRoute().params.id.toString()))
let listInfo = queryUserList().getItem(Id.value.toString())
let data = ref<ListSongs | undefined>()

if (Id) {
  data.value = await ListApi.getListSongs(Id.value)
} else {
  useRouter().push({ name: '404' })
}
watch(useRoute(), async (newValue) => {
  Id.value = parseInt(newValue.params.id.toString())
  listInfo = queryUserList().getItem(Id.value.toString())
  data.value = await ListApi.getListSongs(Id.value)
})
</script>

<template>
  <div class="flex flex-col gap-3 w-full h-full">
    <div class="top flex w-full">
      <div class="w-40 h-40 mr-6">
        <el-image :src="listInfo?.img" class="w-full h-full rounded-md" />
      </div>
      <div class="text-xs flex flex-col justify-between">
        <div class="text-2xl opacity-70 font-bold">{{ listInfo?.name }}</div>
        <div class="flex items-center gap-3">
          <ElAvatar :src="listInfo?.img"></ElAvatar>
          yuayua
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
        <list :lists-songs="(data?.songs as unknown as  Song[])" />
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
