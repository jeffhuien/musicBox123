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
    singer.value = await CommonApi.singerList(UID)
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
  <div class="flex flex-col w-full h-full p-4">
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
      <el-tab-pane label="歌单" name="list">
        <div
          class="grid items-center justify-center xl:grid-cols-5 md:grid-cols-5 max-md:grid-cols-4 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
          <el-card
            class="w-2/3 m-auto !border-none !shadow-none relative group transition-all !bg-no hover:-translate-y-4"
            v-for="(i, d) in songList?.playlist"
            :body-class="'!p-0 '"
            :index="d">
            <div
              class="dark:bg-gray-800 bg-white dark:text-white"
              @click="$router.push('/list/' + i.id?.toString())">
              <div class="relative flex justify-center items-center">
                <el-image lazy class="w-42 h-42 !rounded-lg" :src="i.coverImgUrl" />
                <i
                  class="fa-regular fa-play-circle text-5xl text-white absolute hidden group-hover:block" />
              </div>
              <div class="relative py-2">
                <div
                  class="text-xs text-white max-sm:scale-[70%] bg-black bg-opacity-50 absolute -top-6 right-0 rounded-full px-2">
                  <i class="fa-solid fa-play text-white mr-[2px]"></i>
                  <span v-if="i.playCount < 1000000000">
                    {{ (i.playCount / 10000).toFixed(2) }}万
                  </span>
                  <span v-else> {{ (i.playCount / 1000000000).toFixed(2) }}亿 </span>
                </div>
                <div
                  class="text-sm max-sm:text-xs line-clamp-2 overflow-hidden hover:text-sky-500 hover:cursor-pointer">
                  {{ i.name }}
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane
        class="w-full h-full flex flex-col justify-center"
        label="歌手"
        name="singer">
        <ElScrollbar>
          <div
            class="flex gap-2 w-full h-full flex-wrap justify-between"
            v-if="singer?.follow?.length != 0">
            <div class="mb-4" v-for="i in singer?.follow">
              <div class="flex flex-col items-center justify-between gap-3">
                <el-image
                  class="w-44 h-44 rounded-full"
                  :src="i.avatarUrl"
                  lazy></el-image>
                <div class="text-xs">{{ i.nickname }}</div>
              </div>
            </div>
          </div>
          <el-empty v-else description="什么都没有~"></el-empty>
        </ElScrollbar>
      </el-tab-pane>
      <el-tab-pane
        class="w-full h-full flex flex-col justify-center"
        label="视频"
        name="mv">
        <div class="" v-if="mv?.data?.length != 0"></div>
        <el-empty v-else description="什么都没有~"></el-empty>
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
