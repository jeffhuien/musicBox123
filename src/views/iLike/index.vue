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
    mvTotal.value = mv.value?.count
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
let uidList = UserList().list[0].id
let ls = ref()
let UID = auth().UID!
let songs = ref<lsType[]>([]) //歌曲
let copy = ref<lsType[]>([]) //歌曲备份
let songList = ref<UserListReqType>() //歌单
let singer = ref()
let follows = ref()
let mv = ref()
let k = ref(false)
let songTotal = ref(0) //歌曲总数
let mvTotal = ref(0) //mv总数

let songPage = reactive({ limit: 50, offset: 1 })
let songListPage = reactive({ limit: 3, offset: 1 })
let mvPage = reactive({ limit: 20, offset: 1 })

let SongNoMore = computed(
  () => ((songs.value?.length >= songTotal.value) as boolean) || k.value,
)

let MvNoMore = computed(() => (mv.value?.data.length >= mvTotal.value) as boolean)
let SongListNoMore = computed(() => !songList.value?.more as boolean)

const SongLoadMore = async (): Promise<void> => {
  if (!SongNoMore.value) {
    let t = await ListApi.getListSongs(uidList, {
      limit: songPage.limit,
      offset: songPage.offset++ * songPage.limit,
    })
    songs.value.push(
      ...t.songs.map((item) => {
        return {
          id: item.id,
          name: item.name,
          ar: item.ar,
          al: item.al,
          dt: item.dt,
          fee: item.fee,
        }
      }),
    )
    copy.value = _.cloneDeep(songs.value)
  }
}
const MvLoadMore = async () => {
  if (!MvNoMore.value) {
    let t = await CommonApi.mvList({
      limit: mvPage.limit,
      offset: mvPage.offset++ * mvPage.limit,
    })
    mv.value.push(...t?.data)
  }
}

const SongListLoadMore = async () => {
  if (!MvNoMore.value) {
    let t = await ListApi.getList(UID.toString(), {
      limit: songListPage.limit,
      offset: songListPage.offset++ * songListPage.limit,
    })
    songList.value?.more == t?.more
    songList.value?.playlist.push(...t?.playlist)
  }
}

onMounted(async () => {
  let data = await ListApi.getListSongs(uidList, {
    limit: songPage.limit,
    offset: 0,
  })
  songTotal.value = UserList().list[0].trackCount

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
  k.value = true
  searchSongList(copy, w, songs)
  k.value = false
}

function playAll() {
  ls.value.play(songs.value![0])
}
</script>
<template>
  <div class="flex flex-col w-full h-full p-4 border overflow-hidden">
    <div class="text-xl"> 我的收藏 </div>
    <el-tabs
      v-model="activeName"
      class="flex-1 flex flex-col w-full overflow-hidden"
      @tab-click="handleClick">
      <el-tab-pane label="歌曲" class="text-xl w-full h-full flex flex-col" name="first">
        <Buttons @search="search" @playAll="playAll" :own="true" @sort="sort" />
        <ScrollLoad
          class="flex-1"
          :page="songPage"
          :more="SongNoMore"
          @loadMore="SongLoadMore">
          <List ref="ls" :lists-songs="copy"></List>
        </ScrollLoad>
        <!-- <list ref="ls" :lists-songs="copy" :no-tag="true" /> -->
      </el-tab-pane>
      <el-tab-pane label="歌单" class="h-full w-full" name="list">
        <ScrollLoad
          :page="songListPage"
          :more="SongListNoMore"
          @loadMore="SongListLoadMore"
          class="h-full">
          <ElScrollbar>
            <div
              class="grid items-center justify-center xl:grid-cols-5 md:grid-cols-5 max-md:grid-cols-4 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
              <Card
                v-for="(i, d) in songList?.playlist"
                :index="d"
                to="list"
                :id="i?.id"
                :name="i.name"
                :img="i.coverImgUrl"></Card>
            </div>
          </ElScrollbar>
        </ScrollLoad>
      </el-tab-pane>
      <el-tab-pane class="w-full h-full" label="歌手" name="singer">
        <ElScrollbar>
          <div
            class="w-full h-full grid grid-cols-4 gap-2 p-5"
            v-if="singer?.data?.length">
            <Card
              :name="i.name"
              :singer="i.artistName"
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
        <ScrollLoad :page="mvPage" :more="MvNoMore" @loadMore="MvLoadMore" class="h-full">
          <ElScrollbar>
            <div class="" v-if="mv?.data?.length != 0">
              <div
                class="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-2 gap-2 p-5">
                <Card
                  v-for="(i, d) in mv?.data"
                  :index="d"
                  to="list"
                  :id="1 * i.vid"
                  :typ="2"
                  :name="i.title"
                  :singer="i?.creator[0]?.userName"
                  :img="i.coverUrl"
                  :count="i.playTime"></Card>
              </div>
            </div>
            <el-empty v-else description="什么都没有~"></el-empty>
          </ElScrollbar>
        </ScrollLoad>
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
