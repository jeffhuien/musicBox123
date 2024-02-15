<script setup lang="ts">
import { ListDetail, Playlist } from '#/List/ListDetail'
import { Song } from '#/song/songInfo'
import { ListApi } from '@/Api/List'
import { auth, queryUserList } from '@/stores'
let data = ref<Song[]>()
let Detail = ref<ListDetail>()
let info = ref<Playlist>()
let uid = auth().user?.data.account.id?.toString()
let Id = queryUserList().userList.find((item) => item.id == uid)?.ls[0].id
if (!Id) ElMessage('获取用户信息失败~ 请重新登录')
Detail.value = await ListApi.getListDetail(Id!)
info.value = Detail.value?.playlist
data.value = (await ListApi.getListSongs(Id!)).songs as unknown as Song[]
</script>

<template>
  <SongListView :data="data!" :name="'我喜欢'" :info="info!" v-if="data" />
  <Loading v-else>loading...</Loading>
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}
</style>
