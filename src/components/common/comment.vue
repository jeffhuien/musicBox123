<script setup lang="ts">
import { MusicComment } from '#/Comment/MusicComment'
import { CommentApi } from '@/Api/Comment'
import { playControl } from '@/stores'
import loading from '../Loading/loading.vue'
const { musicName, singerName, songImg, songAl } = playControl()
const props = defineProps<{
  id: string
}>()

type CommentType = {
  name: string
  singerName: string
  img: string
  Al: string
  //
}
let res = ref<MusicComment>()
let info = ref<CommentType>()

info.value = {
  name: musicName,
  singerName: singerName,
  img: songImg,
  Al: songAl,
}
const { id } = toRefs(props)

watch(id, async (n) => {
  res.value = await CommentApi.getSongComment(n)
  info.value = {
    name: playControl().musicName,
    singerName: playControl().singerName,
    img: playControl().songImg,
    Al: playControl().songAl,
  }
})
onMounted(async () => {
  res.value = await CommentApi.getSongComment(id.value)
})
let input = ref('0')
</script>

<template>
  <div class="p-4 w-full text-sm h-full flex max-sm:flex-col gap-3 relative" v-if="res">
    <div class="info sticky top-0 flex flex-col gap-4 xl:w-1/4 md:w-1/2 max-sm:w-full">
      <div class="w-full flex sm:flex-col max-sm:flex-row gap-2">
        <ElImage
          :src="info?.img"
          class="xl:size-90 md:w-full md:h-width max-sm:size-16 rounded-xl shadow-lg"
          @click="playControl().isPlay = !playControl().isPlay"></ElImage>
        <div class="flex flex-col gap-2">
          <div class="name md:text-2xl md:line-clamp-1">{{ info?.name }}</div>
          <div class="space-y-1 max-sm:text-xs">
            <p>
              歌手：<span class="text-sky-500">{{ info?.singerName }}</span>
            </p>
            <p>
              专辑：<span class="text-sky-500">{{ info?.Al }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="input flex flex-col gap-3 sticky top-0 mt-4 w-full">
        <span class="relative">
          全部评论
          <span class="absolute text-xs -top-1">{{ res?.total }}</span>
        </span>
        <div class="">
          <textarea
            name=""
            id=""
            class="overflow-hidden w-full rounded-xl text-sm focus:outline-sky-300 bg-gray-100 dark:bg-gray-700 p-3 outline-none"
            placeholder="发表你的精彩吧~"
            :rows="1"></textarea>
        </div>
      </div>
    </div>

    <el-scrollbar class="content">
      <div class="space-y-2">
        <h1 class="text-xl">精彩评论</h1>
        <div
          class="flex w-full gap-4 mb-2 items-center p-3 border-b dark:border-b-gray-50 border-opacity-10"
          v-for="(i, index) in res?.comments">
          <ElAvatar :src="i.user.avatarUrl" :size="'default'" class=""></ElAvatar>
          <div class="flex-1 flex-grow-2 flex flex-col gap-2">
            <p class="text-xs dark:text-gray-600 text-gray-500">{{ i.user.nickname }}</p>
            <p class="flex-1 line-clamp-2 text-sm">{{ i.content }}</p>
          </div>
          <p class="self-end float-right text-xs">{{ i.timeStr }}</p>
        </div>
      </div>
    </el-scrollbar>
  </div>
  <div v-else>
    <loading> 加载中... </loading>
  </div>
</template>

<style scoped lang="scss"></style>
