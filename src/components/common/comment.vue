<script setup lang="ts">
import { MusicComment } from '#/Comment/MusicComment'
import { CommentApi } from '@/Api/Comment'
import { playControl } from '@/stores'
import loading from '../Loading/loading.vue'
const { musicName, singerName, songImg, songAl } = playControl()
const props = defineProps<{
  id: number
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

const send = async () => {
  let res = await CommentApi.sendComment({
    t: 1,
    type: 0,
    id: id.value,
    content: input.value,
  })
  ElMessage.success(res.message)
}

let input = ref<string>('')
let ActiveName = ref(0)
</script>

<template>
  <div class="p-4 w-full text-sm h-full flex max-sm:flex-col gap-3 relative" v-if="res">
    <div class="info sticky top-0 flex flex-col gap-4 xl:w-1/4 md:w-1/3 max-sm:w-full">
      <div class="w-full flex sm:flex-col max-sm:flex-row gap-2">
        <ElImage
          :src="info?.img"
          class="w-32 xl:size-80 md:size-60 max-sm:size-16 rounded-xl shadow-lg"
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
          评论
          <span class="absolute text-xs -top-1">{{ res?.total }}</span>
        </span>
        <div class="">
          <input
            name=""
            id=""
            class="overflow-hidden w-full rounded-xl text-sm focus:outline-sky-300 bg-gray-100 dark:bg-gray-700 p-3 outline-none"
            placeholder="发表你的精彩吧~ ___回车发送"
            :rows="1"
            v-model="input"
            @keydown.enter="send"
            type="text" />
        </div>
      </div>
    </div>

    <el-scrollbar class="content xl:w-3/4 flex-1">
      <div class="space-y-2">
        <el-collapse v-model="ActiveName">
          <template v-for="(k, index) in [res.comments, res.hotComments]">
            <el-collapse-item
              class="[&>button]:text-xl [&>button]:text-sky-500 dark:[&>el-collapse-item__content]:!text-gray-700"
              :title="index == 0 ? '精彩评论' : '全部评论'"
              :name="index">
              <div
                class="flex w-full gap-4 mb-2 items-center p-3 border-b dark:!text-gray-600 text-gray-500 dark:border-b-gray-50 dark:border-opacity-10"
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
            </el-collapse-item>
          </template>
        </el-collapse>
      </div>
    </el-scrollbar>
  </div>
  <div v-else>
    <loading> 加载中... </loading>
  </div>
</template>

<style scoped lang="scss">
.a {
  @apply text-xl;
}
</style>
