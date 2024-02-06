<script setup lang="ts">
import { queryUserList } from '@/stores'
import { ListSongs } from '#/List/ListSongs'
import { Song } from '#/song/songInfo'
import { auth } from '@/stores'
import { storeToRefs } from 'pinia'
import { ListApi } from '@/Api/List'

const { user } = storeToRefs(auth())
const { cur, userList } = storeToRefs(queryUserList())
let data = ref<ListSongs | undefined>()
let listInfo = userList.value[cur.value].ls[0]

if (user.value?.data) {
  // const Id = user.value?.data.profile.userId!
  data.value = await ListApi.getListSongs(listInfo.id)
}
</script>

<template>
  <SongListView :info="listInfo" :songs="(data?.songs as unknown as Song[])" />
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
