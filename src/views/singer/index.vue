<script setup lang="ts">
import { CommonApi } from '@/Api'
import router from '@/router'
import { TabsPaneContext } from 'element-plus'

let singerID = computed(() => router.currentRoute.value.params?.id as string)
type singerData = {
  singerName: string
  singerImg: string
  singerFens?: any
  singerDesc?: any
  singerAlbum?: any
  singerMV?: any
  singerSong?: any
  mvCount?: number
  songCount?: number
  alCount?: number
}

let data = ref<singerData>({} as singerData)
let activeName = ref('songs')
const getData = async (id: number) => {
  // data.value = {} as singerData
  // data.value.singerAlbum = await CommonApi.singerAL(id)
  let t = await CommonApi.singerDetail(id)
  data.value = {
    singerImg: t.data?.artist.avatar,
    singerName: t.data?.artist.name,
    mvCount: t.data?.artist.mvSize,
    songCount: t.data?.artist.musicSize,
    alCount: t.data?.artist.albumSize,
    singerSong: await CommonApi.singerSongs(id),
  }
  data.value.singerDesc = await CommonApi.singerDetail(id)
  data.value.singerFens = await CommonApi.singerFens(id)
  isFollow.value = data.value?.singerFens?.data?.isFollow
}

const handleClick = async (tab: TabsPaneContext, event: Event) => {
  if (!singerID.value) return
  if (tab.paneName === 'al') {
    data.value.singerAlbum = await CommonApi.singerAL(parseInt(singerID.value))
  } else if (tab.paneName === 'mv') {
    data.value.singerMV = await CommonApi.singerMV(parseInt(singerID.value))
  }
}
watchEffect(() => {
  if (!singerID.value) return
  data.value = {} as singerData
  getData(parseInt(singerID.value))
})

const isFollow = ref<boolean>(data.value?.singerFens?.data?.isFollow ? true : false)
const followSinger = async (t: number) => {
  let res = await CommonApi.followSinger(parseInt(singerID.value), t)
  if (res.code === 200) {
    isFollow.value = !isFollow.value
    ElMessage.success(t == 1 ? '已关注' : '取消关注')
  }
}
</script>

<template>
  <div class="w-full h-full flex flex-col p-5 pb-0" v-if="data.singerImg">
    <div class="head flex w-full gap-10 h-1/4 overflow-hidden">
      <el-avatar
        class="shrink-0"
        :size="200"
        :src="data.singerImg + '?param=300y300'"></el-avatar>
      <div class="flex justify-between gap-4 w-full">
        <div class="flex justify-center flex-col gap-5">
          <h1 class="text-2xl">{{ data.singerName }}</h1>
          <div class="opacity-60">
            <p class="mb-2 flex items-center gap-2">
              <span v-if="data.singerFens?.data?.fansCnt < 1000000000">
                {{ (data.singerFens?.data?.fansCnt / 10000).toFixed(2) }}万
              </span>
              <span v-else>
                {{ (data.singerFens?.data?.fansCnt / 1000000000).toFixed(2) }}亿
              </span>
              <span class="text-xs">粉丝</span>
            </p>
            <el-button @click="followSinger(isFollow ? 2 : 1)"
              >{{ !isFollow ? '关注' : '已关注' }}
            </el-button>
          </div>
        </div>
        <div class="!w-2/3">
          <ElScrollbar>
            <div class="text-sm opacity-60">
              {{ data.singerDesc?.data.artist.briefDesc }}
            </div>
          </ElScrollbar>
        </div>
      </div>
    </div>
    <div class="flex-1 mt-5 overflow-hidden">
      <el-tabs
        class="w-full h-full flex flex-col"
        v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane
          class="h-full w-full"
          name="songs"
          :label="'歌曲 ' + data?.songCount">
          <List :lists-songs="data.singerSong?.hotSongs"></List>
        </el-tab-pane>
        <el-tab-pane class="h-full w-full" name="al" :label="'专辑 ' + data?.alCount">
          <ElScrollbar>
            <div
              class="grid items-center justify-center xl:grid-cols-5 md:grid-cols-5 max-md:grid-cols-4 gap-3 max-xl:grid-cols-5 max-sm:grid-cols-3">
              <Card
                v-for="(i, d) in data.singerAlbum?.hotAlbums"
                :index="d"
                to="al"
                :id="i.id"
                :content="i.name"
                :img="i.blurPicUrl"></Card>
            </div>
          </ElScrollbar>
        </el-tab-pane>
        <el-tab-pane name="mv" :label="'MV ' + data?.mvCount" class="w-full h-full">
          <ElScrollbar>
            <div class="" v-if="data.mvCount">
              <div class="grid xl:grid-cols-4 grid-cols-3 gap-3 max-sm:grid-cols-2 p-5">
                <Card
                  v-for="(i, d) in data.singerMV?.mvs"
                  :index="d"
                  to="mv"
                  :id="i.id"
                  :content="i.name"
                  :img="i.imgurl"
                  :count="i.playCount"
                  :typ="2"></Card>
              </div>
            </div>
            <el-empty v-else description="什么都没有~"></el-empty>
          </ElScrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <div class="" v-else>
    <loading></loading>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tabs__nav-wrap::after) {
  @apply bg-no;
}
:deep(.el-tabs__content) {
  @apply flex-1 w-full h-full;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: #ffffff00 !important;
}
</style>
