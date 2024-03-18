<script setup lang="ts">
import { ListDetail, Playlist } from '#/List/ListDetail'
import { Song } from '#/song/songInfo'
import { ListApi } from '@/Api/List'
import { useRoute, useRouter } from 'vue-router'

let Id = ref<string>(useRoute().params.id as string)
let data = ref<Song[] | undefined>(undefined)
let Detail = ref<ListDetail>()
let info = ref<Playlist>()

watch(useRoute(), async (newValue) => {
  if (!(newValue.name === 'song.list')) return
  Id.value = newValue.params.id as string
  data.value = undefined
  setData()
})

async function setData() {
  Detail.value = await ListApi.getListDetail(Id.value)
  info.value = Detail.value?.playlist
  data.value = (await ListApi.getListSongs(Id.value)).songs as unknown as Song[]
}

onBeforeMount(async () => {
  Id ? setData() : useRouter().push({ name: '404' })
})
</script>

<template>
  <SongListView :data="data!" :info="info!" v-if="data" />
  <Loading v-else>loading...</Loading>
</template>

<style scoped lang="scss">
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
