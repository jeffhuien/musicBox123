<script setup lang="ts">
import { lyricContentType, lyricType } from '#/index'
import { CommonApi } from '@/Api'
import { playControl } from '@/stores'
import { storeToRefs } from 'pinia'

const { playId } = storeToRefs(playControl())

function toLrc(lrcStr: string) {
  let lrc: string[] | lyricContentType[] = lrcStr
    .split('\n')
    .filter((i) => i)
    .map((i) => i.trim())
  let body = lrc
    .map((i: any) => i.split(']'))
    .map((k: any) => {
      return {
        time: toSeconds(k[0].replace('[', '')),
        words: k[1],
      }
    })

  lrc = [...body]
  return lrc
}
function toSeconds(time: string) {
  let min = parseInt(time.split(':')[0])
  let sec = parseFloat(time.split(':')[1])
  return min * 60 + sec
}

let lyric = ref<lyricType>()
let data = ref<lyricContentType[]>([])
let ls = ref<HTMLDivElement>()
let h = ref(0)
let n = ref(0)
let p = ref<HTMLElement>()
let nodeLs = ref<Array<NodeList>>()
onMounted(async () => {
  lyric.value = await CommonApi.getLyric(playId.value)
  data.value = lyric.value?.lrc?.lyric ? toLrc(lyric.value.lrc.lyric) : []
  h.value = ls.value?.children.item(0)?.clientHeight ?? 0
  n.value = ls.value?.parentElement?.parentElement?.offsetHeight
    ? Math.floor(ls.value?.parentElement?.parentElement?.offsetHeight / h.value / 2)
    : 0
  //BUG 无法识别手动滚动
  //BUG 暂时失效

  // nodeLs.value = ls.value?.childNodes
  // nodeLs.value.p
  console.log(nodeLs)
})
watchEffect(async () => {
  lyric.value = await CommonApi.getLyric(playId.value)
  data.value = lyric.value?.lrc?.lyric ? toLrc(lyric.value.lrc.lyric) : []
  n.value = 0
})

//FIXME:这里需要重构
function set(index: number, head: boolean = false) {
  if (
    data.value[index].time <= playControl().currentTime &&
    (index + 1 < data.value.length ? data.value[index + 1].time >= playControl().currentTime : true)
  ) {
    if (index != 0) ls.value?.children.item(index - 1)?.classList.remove('active')
    if (index > n.value && !head) {
      // scrollBar.value?.setScrollTop(h.value * (index - n.value))
      // ls.value ? (ls.value!.style.transform = `translateY(-${h.value * (index - n.value)}px)`) : ''
      // if (!head)
      ls.value?.scrollTo({
        top: h.value * (index - n.value), // y 坐标
        behavior: 'smooth', // 可选值：smooth、instant、auto
      })
    }
    return true
  }
  return false
}
</script>

<template>
  <div class="outline-none relative select-none w-full h-full p-10 text-sm text-center">
    <div
      class="focus:outline-none transition-all ease-linear duration-[400ms] h-full overflow-auto scrollbar-hidden"
      v-if="data.length">
      <div class="!p-10 h-full focus:outline-none transition-all ease-linear duration-[400ms]" ref="ls">
        <p
          :class="[set(index) ? 'active' : '']"
          class="py-2 transition-all ease-linear duration-[400ms]"
          v-for="(item, index) in data"
          :key="index">
          {{ item.words }}
        </p>
      </div>
    </div>
    <p v-else class="text-sky-600 w-full absolute top-1/2 -translate-y-1/2 text-center text-sm">暂无歌词</p>
  </div>
</template>

<style scoped lang="scss">
.active {
  @apply text-pink-400 text-2xl;
}
</style>
