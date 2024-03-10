<script setup lang="ts">
import { Playlist } from '#/List/ListDetail'
import { Song } from '#/song/songInfo'
import { auth } from '@/stores'
const props = defineProps<{
  data: Song[]
  info: Playlist
  name?: string
}>()

const { data, info, name } = toRefs(props)
let ls = ref()
let scroll = ref()
let top = ref<HTMLElement>()
let f = ref(false)
let show = ref(true)

// watch(props, (n, o) => {
//   ElMessage.info(info.value.name)
// })
onUpdated(() => {
  ElMessage.info(info.value.name)
})
function playAll() {
  ls.value.play(data.value![0])
}

async function collect() {
  if (!auth().isLogin) return ElMessage.warning('请先登录')
  const { ListApi } = await import('@/Api/List')
  await ListApi.collect(1, info.value!.id.toString())
  ElMessage.success('收藏成功')
}

function s({ scrollTop }: { scrollTop: number }) {
  if (scrollTop > top.value!.offsetHeight && !f.value) {
    f.value = true
    show.value = false
  }
  if (scrollTop < top.value!.offsetHeight && f.value) {
    f.value = false
    show.value = true
  }
}
</script>

<template>
  <ElScrollbar :height="'100%'" ref="scroll" @scroll="s">
    <div class="flex flex-col gap-3 w-full h-full p-2 pb-0 relative">
      <!-- show: {{ show }} -> f:{{ f }} -->
      <div class="top flex w-full" ref="top">
        <div class="w-36 h-36 max-sm:w-32 max-sm:h-32 shrink-0 mr-6">
          <div class="relative">
            <el-image :src="info?.coverImgUrl || '/img/logo.png'" class="w-full h-full rounded-md" />
            <span
              v-if="info?.playCount"
              class="text-xs absolute bottom-3 right-1 text-white bg-black bg-opacity-50 px-2 py-[2px] rounded-full">
              <i class="fa-solid fa-play text-white mr-[2px]"> </i>
              {{
                info ? (info.playCount > 10000 ? (info.playCount / 10000).toFixed(2) + '万' : info.playCount) : ''
              }}</span
            >
          </div>
        </div>
        <div class="text-xs flex flex-col justify-between truncate">
          <h1 class="text-2xl max-sm:text-sm opacity-70 font-bold">{{ name ? name : info?.name }}</h1>
          <div class="flex items-center gap-3" @click="$router.push('/user/' + info?.creator.userId)">
            <ElAvatar :src="info?.creator.avatarUrl || '/img/logo.png'" size="default"></ElAvatar>
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
              <span v-for="i in info.tags" class="p-1 rounded-md text-white bg-teal-500">
                {{ i }}
              </span>
            </div>
            <div v-else class="opacity-50">标签：未添加标签</div>
          </div>
        </div>
      </div>
      <template v-if="show">
        <div class="flex justify-between p-4 shadow-sm rounded-md border max-sm:hidden">
          <div class="">
            <Buttons :play-all="playAll" :collect="collect" />
          </div>
          <div class="">right</div>
        </div>
        <!-- <div class="w-full text-xs bg-red-50 rounded-sm border">
          <p class="p-2 text-pink-400">含歌曲{{ data.length }}首,其中VIP歌曲33首</p>
        </div> -->
      </template>

      <div
        v-if="!show"
        class="w-full p-2 rounded-b-xl flex flex-col justify-between gap-2 sticky top-0 z-50 truncate bg-pink-100 mb-4">
        <div class="flex gap-2 items-center">
          <div class="relative w-12 h-12">
            <el-image :src="info?.coverImgUrl || '/img/logo.png'" class="w-full h-full rounded-md" />
          </div>
          <h1 :class="[show ? 'text-2xl' : 'text-xl truncate']" class="max-sm:text-sm opacity-70 font-bold">
            {{ name ? name : info?.name }}
          </h1>
        </div>
        <div class="shrink-0">
          <Buttons :play-all="playAll" :collect="collect" />
        </div>
      </div>

      <!-- <div class="flex-1 !overflow-hidden !rounded-xl"> -->
      <div class="h-full animate__animated animate__fadeIn">
        <list
          :lists-songs="(data as unknown as  Song[])"
          class="rounded-xl"
          :list-name="info?.name"
          ref="ls"
          v-if="data" />
        <Loading v-else class="">loading</Loading>
      </div>
      <!-- </div> -->
    </div>
  </ElScrollbar>
</template>

<style scoped lang="scss">
:deep(.el-table td.el-table__cell),
:deep(.el-table th.el-table__cell.is-leaf) {
  border: none;
}

:deep(.el-table tr) {
  background: none;
}
:deep(.el-table) {
  background: none;
}
</style>
