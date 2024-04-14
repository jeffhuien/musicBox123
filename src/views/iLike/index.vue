<script setup lang="ts">
import { UserListReqType } from '#/List/userList'
import { CommonApi, ListApi } from '@/Api'
import { UserList, auth } from '@/stores'
import { searchSongList, sortSongList } from '@/utils'
import type { TabsPaneContext } from 'element-plus'
import _ from 'lodash'

const activeName = ref('first')
const handleClick = async (tab: TabsPaneContext, event: Event) => {
  if (tab.paneName === 'list' && !songList.value) {
    songList.value = await ListApi.getList(UID.toString())
  } else if (tab.paneName === 'singer') {
    singer.value = await CommonApi.singerList()
  } else if (tab.paneName === 'follows') {
    follows.value = await CommonApi.followsList(UID)
  } else if (tab.paneName === 'mv') {
    mv.value = await CommonApi.mvList()
  }
}

type lsType = {
  id: number
  name: string
  ar: any[]
  al: any
  dt: number
  fee: number
}

let ls = ref()
let songs = ref<lsType[]>([])
let copy = ref<lsType[]>([])
let UID = auth().UID!
let songList = ref<UserListReqType>()
let singer = ref()
let follows = ref()
let mv = ref()

onMounted(async () => {
  let uidList = UserList().list[0].id
  let data = await ListApi.getListSongs(uidList)
  songs.value = data.songs.map((item) => {
    return {
      id: item.id,
      name: item.name,
      ar: item.ar,
      al: item.al,
      dt: item.dt,
      fee: item.fee,
    }
  })
  copy.value = _.cloneDeep(songs.value)
  auth().likeIds = songs.value.map((i) => i.id)
})

let asc = true // true: asc升序
function sort(t: string) {
  sortSongList(copy, t, songs, asc)
  asc = !asc
}
function search(w: string) {
  return searchSongList(copy, w, songs)
}
function playAll() {
  ls.value.play(songs.value![0])
}
</script>
<template>
  <!-- TODO design NEW -->
  <div class="flex flex-col w-full h-full p-4 pb-0">
    <div class="text-xl mb-2"> 我的收藏 </div>
    <el-tabs
      v-model="activeName"
      class="flex-1 flex flex-col w-full overflow-hidden"
      @tab-click="handleClick">
      <el-tab-pane label="歌曲" class="text-xl w-full h-full" name="first">
        <div class="h-full">
          <Buttons @search="search" @playAll="playAll" :own="true" @sort="sort" />
          <list ref="ls" :lists-songs="copy" :no-tag="true" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单" class="h-full w-full" name="list">
        <ElScrollbar>
          <div
            class="grid items-center justify-center xl:grid-cols-5 md:grid-cols-5 max-md:grid-cols-4 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
            <Card
              v-for="(i, d) in songList?.playlist"
              :index="d"
              to="list"
              :id="i?.id"
              :content="i.name"
              :img="i.coverImgUrl"
              :count="i.playCount"></Card>
          </div>
        </ElScrollbar>
      </el-tab-pane>
      <el-tab-pane class="w-full h-full" label="歌手" name="singer">
        <ElScrollbar>
          <div
            class="w-full h-full grid grid-cols-4 gap-2 p-5"
            v-if="singer?.data?.length">
            <Card
              :content="i.name"
              :id="i.id"
              :img="i.picUrl"
              to="singer"
              v-for="i in singer?.data">
            </Card>
          </div>
          <el-empty v-else description="什么都没有~"></el-empty>
        </ElScrollbar>
      </el-tab-pane>
      <el-tab-pane class="w-full h-full" label="关注的人" name="follows">
        <ElScrollbar>
          <div
            class="w-full h-full grid grid-cols-4 max-sm:grid-cols-2 gap-2 p-5"
            v-if="follows?.follow?.length != 0">
            <div
              class="mb-4 hover:text-sky-500 group"
              v-for="i in follows?.follow"
              @click="$router.push('/user/' + i.userId)">
              <div class="flex flex-col items-center justify-between gap-3">
                <el-image
                  class="w-44 h-44 rounded-full group-hover:scale-110 transition-all duration-500"
                  :src="i.avatarUrl"
                  lazy></el-image>
                <div class="text-xs">{{ i.nickname }}</div>
              </div>
            </div>
          </div>
          <el-empty v-else description="什么都没有~"></el-empty>
        </ElScrollbar>
      </el-tab-pane>

      <el-tab-pane class="w-full h-full" label="视频" name="mv">
        <ElScrollbar>
          <div class="" v-if="mv?.data?.length != 0">
            <div class="grid grid-cols-4 max-sm:grid-cols-2 gap-2 p-5">
              <Card
                v-for="(i, d) in mv?.data"
                :index="d"
                to="list"
                :id="i.id"
                :typ="2"
                :content="i.title"
                :img="i.coverUrl"
                :count="i.playTime"></Card>
            </div>
          </div>
          <el-empty v-else description="什么都没有~"></el-empty>
        </ElScrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap::after) {
  @apply bg-no;
}
:deep(.el-tabs__content) {
  @apply flex-1;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
