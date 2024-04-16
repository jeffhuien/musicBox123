<script setup lang="ts">
import { Playlist } from '#/List/ListDetail'
import { Song } from '#/song/songInfo'
import { auth, main, UserList } from '@/stores'
import _ from 'lodash'
import { searchSongList, sortSongList } from '@/utils'

const { set, get, remove } = UserList()
const props = defineProps<{
  data: Song[]
  info: Playlist
  name?: string
  more: boolean
  page: { limit: number; offset: number }
}>()

const emit = defineEmits<{
  (e: 'loadMore', page: { limit: number; offset: number }): void
}>()

const { data, info, name } = toRefs(props)
const IsCollect = computed(() => get(info.value.id.toString()))

let top = ref<HTMLElement>()
let show = ref(true)
let ls = ref()
let copy = ref<Song[]>([])

watchEffect(() => {
  copy.value = _.cloneDeep(data.value)
})

function playAll() {
  ls.value.play(data.value![0])
}

async function collect(t: number) {
  UserList().update = _.random(0, 10000)
  if (!auth().isLogin) return ElMessage.warning('请先登录')
  const { ListApi } = await import('@/Api/List')
  try {
    await ListApi.collect(t, info.value!.id.toString())
  } catch (error: any) {
    if (error.response.status === 501) return ElMessage.success('已经收藏过了')
    return ElMessage.error('收藏失败')
  }
  if (t === 2) {
    ElMessage.success('取消收藏了')
    remove(info.value!.id.toString())
  } else {
    ElMessage.success('收藏了')
    set({
      id: info.value.id.toString(),
      count: info.value.trackCount,
      name: info.value.name,
      img: info.value.coverImgUrl,
    })
  }
}

let asc = true // true: asc升序
function sort(t: string) {
  sortSongList(copy, t, data, asc)
  asc = !asc
}

function search(w: string) {
  return searchSongList(copy, w, data)
}
</script>

<template>
  <!-- <ElScrollbar tabindex="1" class="focus:outline-none" :height="'100%'" ref="scroll"> -->
  <div class="flex flex-col gap-3 w-full h-full p-2 pb-0 relative">
    <div class="top flex w-full" ref="top">
      <div class="w-36 h-36 max-sm:w-32 max-sm:h-32 shrink-0 mr-6">
        <div class="relative">
          <el-image
            :src="info?.coverImgUrl || '/img/logo.png'"
            class="w-full h-full rounded-md shadow-md" />
          <span
            v-if="info?.playCount"
            class="text-xs absolute bottom-3 right-1 text-white bg-black bg-opacity-50 px-2 py-[2px] rounded-full">
            <i class="fa-solid fa-play text-white mr-[2px]"> </i>
            {{
              info
                ? info.playCount > 10000
                  ? (info.playCount / 10000).toFixed(2) + '万'
                  : info.playCount
                : ''
            }}</span
          >
        </div>
      </div>
      <div class="text-xs flex flex-col justify-between truncate">
        <h1 class="text-2xl max-sm:text-sm opacity-70 font-bold">{{
          name ? name : info?.name
        }}</h1>
        <div
          class="flex items-center gap-3"
          @click="$router.push('/user/' + info?.creator.userId)">
          <ElAvatar
            :src="info?.creator.avatarUrl || '/img/logo.png'"
            size="default"></ElAvatar>
          {{ info?.creator.nickname || 'yuayua' }}
        </div>
        <div class="opacity-50 text-justify truncate">
          <span class="">简介：</span>
          <span class="">
            {{ info?.description || '未添加简介' }}
          </span>
        </div>
        <div class="">
          <div v-if="info?.tags.length" class="flex gap-2 items-center">
            <span class="opacity-50">标签：</span>
            <span v-for="i in info.tags" class="p-1 rounded-md text-emerald-500 italic">
              #{{ i }}
            </span>
          </div>
          <div v-else class="opacity-50">标签：未添加标签</div>
        </div>
      </div>
    </div>
    <template v-if="show">
      <div class="py-4 max-sm:hidden">
        <Buttons
          @search="search"
          @playAll="playAll"
          @collect="collect"
          @sort="sort"
          :own="props.info.creator.userId === auth().UID"
          :Collect="{ isCollect: IsCollect }" />
      </div>
    </template>

    <div
      v-if="!show && !main().isMobile"
      class="w-full p-2 rounded-b-xl flex flex-col justify-between gap-2 sticky top-0 z-50 truncate bg-white dark:bg-gray-600 mb-4 animate__animated animate__slideInDown">
      <div class="flex gap-2 items-center">
        <div class="relative w-12 h-12">
          <el-image
            :src="info?.coverImgUrl || '/img/logo.png'"
            class="w-full h-full rounded-md" />
        </div>
        <h1
          :class="[show ? 'text-2xl' : 'text-xl truncate']"
          class="max-sm:text-sm opacity-70 font-bold">
          {{ name ? name : info?.name }}
        </h1>
      </div>
      <div class="shrink-0">
        <Buttons
          @search="search"
          @playAll="playAll"
          @collect="collect"
          @sort="sort"
          :own="props.info.creator.userId === auth().UID"
          :Collect="{ isCollect: get(info.id.toString()) }" />
      </div>
    </div>

    <!-- <div class="flex-1 !overflow-hidden !rounded-xl"> -->
    <div class="flex-1 animate__animated animate__fadeIn">
      <list :lists-songs="copy" class="" :list-name="info?.name" ref="ls" v-if="data" />
      <Loading v-else class="">loading</Loading>
    </div>
    <!-- </div> -->
  </div>
  <!-- </ElScrollbar> -->
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
</style>
