<script setup lang="ts">
import { Song } from '#/song/songInfo'
import { CommentApi } from '@/Api/Comment'
import { AlbumApi } from '@/Api/album'
import router from '@/router'
import { auth, playControl } from '@/stores'

const AlId = computed(() =>
  router.currentRoute.value.name == 'al'
    ? (router.currentRoute.value.params.id as string)
    : false,
)
interface AlData {
  info: {
    commentCount: number
    isSub: boolean
    likedCount: number
    subCount: number
    [key: string]: any
  }
  album: {
    id: string
    name: string
    artist: {
      id: string
      name: string
      picUrl: string
      [key: string]: any
    }
    publishTime: string
    description: string
    picUrl: string
    [key: string]: any
  }
  songs: Song[]
}
let data = ref<AlData>({} as AlData)

const getData = async () => {
  if (AlId.value) {
    data.value.info = await AlbumApi.Detail(AlId.value)
    let t = await AlbumApi.getAlbum(AlId.value)
    data.value.album = t.album
    data.value.songs = t.songs
  }
}

watchEffect(async () => {
  if (AlId.value) {
    await getData()
    await getComments()
  }
})

async function collect(t: number) {
  if (!auth().isLogin) return ElMessage.warning('请先登录')
  try {
    await AlbumApi.collectAlbum(data.value.album.id, t)
  } catch (error: any) {
    if (error.response.status === 501) return ElMessage.success('已经收藏过了')
    return ElMessage.error('收藏失败')
  }
  if (t === 2) {
    ElMessage.success('取消收藏了')
    data.value.info = await AlbumApi.Detail(AlId.value as string)
  } else {
    ElMessage.success('收藏了')
    data.value.info = await AlbumApi.Detail(AlId.value as string)
  }
}

const playAll = () => {
  playControl().playMusicById(data.value.songs[0]?.id)
}

const comments = ref<any>({})
const isCollect = computed(() => {
  return data.value?.info?.isSub
})
const getComments = async () => {
  if (AlId.value) {
    let t = await CommentApi.getComment(parseInt(AlId.value), 'album')
    comments.value = t
  }
}
</script>

<template>
  <div class="size-full flex flex-col gap-2" v-loading="data.songs.length == 0">
    <div class="h-44 shrink-0 flex gap-4 justify-start text-xs">
      <div class="size-44">
        <img
          :src="data.album?.picUrl"
          class="size-full object-contain rounded-md"
          alt="" />
      </div>
      <div class="flex-1 flex flex-col justify-between gap-4">
        <div class="singer items-center">
          <div class="name mb-2 text-lg text-black/80 dark:text-gray-500 font-bold">{{
            data.album?.name
          }}</div>
          <div class="flex items-center gap-2">
            <img
              :src="data.album?.artist?.picUrl"
              class="size-10 shrink-0 rounded-full"
              alt=""
              @click="router.push(`/singer/${data.album?.artist?.id}`)" />
            <span class="text-black/60 dark:text-gray-500">{{
              data.album?.artist?.name
            }}</span>
            <span class="text-black/60 dark:text-gray-600"
              >{{ new Date(data.album?.publishTime).toLocaleDateString() }}
              <span class="">发布</span>
            </span>
          </div>
        </div>
        <div class="btns">
          <Buttons
            :Collect="{
              isCollect: isCollect,
            }"
            @playAll="playAll"
            @collect="collect"></Buttons>
        </div>
      </div>
    </div>
    <div class="flex-1 mt-5 overflow-hidden">
      <el-tabs class="w-full h-full flex flex-col">
        <el-tab-pane class="h-full w-full" :label="'歌曲 '">
          <List :lists-songs="data.songs"></List>
        </el-tab-pane>
        <el-tab-pane class="h-full w-full" :label="'专辑评论 ' + data.info?.commentCount">
          <ElScrollbar>
            <div class="space-y-2">
              <template v-for="(k, index) in [comments.comments, comments.hotComments]">
                <div
                  class="flex h-full w-full gap-4 mb-2 items-center p-3 border-b dark:!text-gray-600 text-gray-500 dark:border-b-gray-50 dark:border-opacity-10"
                  v-for="(i, index) in k"
                  :index="index">
                  <ElAvatar :src="i.user.avatarUrl" :size="'default'" class=""></ElAvatar>
                  <div class="flex-1 flex-grow-2 flex flex-col gap-2">
                    <p class="text-xs">{{ i.user.nickname }}</p>
                    <p class="flex-1 line-clamp-2 text-sm dark:!text-gray-500">{{
                      i.content
                    }}</p>
                  </div>
                  <div class="inline-flex items-center gap-3 float-right text-xs">
                    <div class="text-md fa-regular fa-thumbs-up"></div>
                    <div class="text-md fa-regular fa-comment-dots"></div>
                    <div>{{ i.timeStr }}</div>
                  </div>
                </div>
              </template>
            </div>
          </ElScrollbar>
        </el-tab-pane>

        <el-tab-pane class="h-full w-full" :label="'专辑详情 '">
          <ElScrollbar>
            {{ data.album?.description }}
          </ElScrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style scoped lang="scss">
:deep(
    .el-table--border .el-table__inner-wrapper::after,
    .el-table--border::after,
    .el-table--border::before,
    .el-table__inner-wrapper::before
  ) {
  background-color: #ffffff00 !important;
}
:deep(.el-tabs__nav-wrap::after) {
  @apply bg-no;
}
:deep(.el-tabs__content) {
  @apply flex-1 w-full h-full;
}
</style>
