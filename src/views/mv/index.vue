<script setup lang="ts">
import { MvApi, CommentApi } from '@/Api'
import router from '@/router'

const MvId = computed(() =>
  router.currentRoute.value.name == 'mv'
    ? (router.currentRoute.value.params.id as string)
    : false,
)

let data = ref<{
  data: any
  detail: any
}>({
  data: {},
  detail: {},
})

const getData = async (MvId: string) => {
  data.value.data = await MvApi.PlayMV(MvId)
  data.value.detail = await MvApi.DetailMV(MvId)
}

const comments = ref<any>({})
const like = computed<boolean>(() => {
  return data.value?.detail?.subed ?? false
})

const setLike = async () => {
  if (MvId.value) {
    if (like.value) {
      await MvApi.collectMV(parseInt(MvId.value), 2)
      data.value.detail.subed = false
    } else {
      await MvApi.collectMV(parseInt(MvId.value), 1)
      data.value.detail.subed = true
    }
  }
}

const getComments = async () => {
  if (MvId.value) {
    let t = await CommentApi.getComment(parseInt(MvId.value), 'mv')
    comments.value = t
    total.value = t?.total
  }
}

let player: Player

onMounted(() => {
  player = new Player({
    id: 'mse',
    width: '100%',
    height: '100%',
    definitionActive: 'click',
  })
})

watchEffect(async () => {
  if (MvId.value) {
    await getData(MvId.value)
    await getComments()
    let t = await data.value?.detail?.data?.brs.map(async (i: any) => {
      let t = await MvApi.PlayMV(MvId.value as string, i.br)
      return { name: i.br + 'p', url: t.data.url }
    })

    Promise.all(t)
      .then((results) => {
        player.start(results[results.length - 1].url)
        player.emit('resourceReady', [...results])
      })
      .catch((error) => {
        console.error('至少有一个 Promise 被拒绝:', error)
      })
  }
})

let page = reactive({
  limit: 20,
  offset: 1,
})
let total = ref<number>(0)
const noMore = computed<boolean>(() => comments.value?.comments?.length >= total.value)
const loadMore = async () => {
  let t = await CommentApi.getComment(parseInt(MvId.value as string), 'mv', {
    limit: page.limit,
    offset: page.offset++ * page.limit,
  })
  comments.value.comments.push(...t.comments)
}
</script>

<template>
  <ScrollLoad :page="page" :more="noMore" @loadMore="loadMore">
    <ElScrollbar>
      <div class="w-full h-screen text-white px-10 py-2">
        <div class="flex flex-col h-full w-full">
          <div class="!h-3/4 max-sm:h-1/4 w-full">
            <div id="mse" class="outline-none"></div>
          </div>
          <div class="h-1/4 max-sm:h-3/4">
            <div class="mt-5 h-2/3 flex flex-col gap-3">
              <div class="text-xl font-bold text-gray-600"
                >{{ data?.detail?.data?.name }}
                <span class="text-gray-500 text-sm">
                  <button class="relative" @click="setLike">
                    <i
                      class="fa-regular fa-heart text-red-500"
                      :class="[like ? 'fa-solid' : '']">
                    </i>
                  </button>
                  {{ like ? '已收藏' : '收藏' }}
                </span>
              </div>
              <div class="flex gap-6">
                <div
                  class="flex items-center gap-2 text-xs"
                  v-for="i in data?.detail?.data?.artists"
                  :key="i.id">
                  <ElAvatar :src="i?.img1v1Url"></ElAvatar>
                  <span class="text-black/60 dark:text-white/60">
                    {{ i.name }}
                  </span>
                  <button class="bg-gray-400 px-4 rounded-full">
                    {{ !i.followed ? '关注' : '未关注' }}</button
                  >
                </div>
              </div>
              <div class="text-xs text-gray-500"> {{ data?.detail?.data?.desc }} </div>
              <div class="flex justify-between items-center gap-3 text-xs text-gray-500">
                <div class="flex gap-3">
                  <span class="">发布日期</span>
                  <span>{{ data?.detail?.data?.publishTime }}</span>
                  <span>播放</span>
                  <span>{{ data?.detail?.data?.playCount }}</span>
                </div>
                <div class="flex gap-3"> </div>
              </div>
            </div>
            <div class="text-black/60 dark:text-white/60 mt-5 h-2/3 flex flex-col gap-3">
              <div class="text-gray-500">全部评论 {{ comments?.total }}</div>
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
          </div>
        </div>
      </div>
    </ElScrollbar>
  </ScrollLoad>
</template>

<style scoped lang="scss"></style>
