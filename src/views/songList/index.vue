<script setup lang="ts">
import { ListDetail, Playlist } from '#/List/ListDetail'
import { Song } from '#/song/songInfo'
import { ListApi } from '@/Api/List'
import { auth } from '@/stores'
import { useRoute, useRouter } from 'vue-router'

let Id = ref<string>(useRoute().params.id as string)
// let listInfo = queryUserList().getItem(Id.value)
let data = ref<Song[]>()
let Detail = ref<ListDetail>()
let info = ref<Playlist>()
if (Id) {
  if (auth().isLogin) {
    Detail.value = await ListApi.getListDetail(Id.value)
    info.value = Detail.value?.playlist
    data.value = (await ListApi.getListSongs(Id.value)).songs as unknown as Song[]
  } else {
    let { songs } = await ListApi.getListSongs(Id.value)
    data.value = songs as unknown as Song[]
  }
} else {
  useRouter().push({ name: '404' })
}

watch(useRoute(), async (newValue) => {
  if (!(newValue.name === 'song.list')) return
  Id.value = newValue.params.id as string
  data.value = undefined
  // listInfo = queryUserList().getItem(Id.value)
  Detail.value = await ListApi.getListDetail(Id.value)
  info.value = Detail.value?.playlist
  data.value = (await ListApi.getListSongs(Id.value)).songs as unknown as Song[]
})
</script>

<template>
  <SongListView :data="data!" :info="info!" v-if="data" />
  <Loading v-else>loading...</Loading>
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
