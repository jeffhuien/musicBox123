<script setup lang="ts">
import { lyricContentType, lyricType } from '#/index'
import { CommonApi } from '@/Api'
import { playControl } from '@/stores'
import { formatTime } from '@/utils'
import Audio from '@/utils/Audio'
import { storeToRefs } from 'pinia'
const { playId, currentTime, musicName, singerName } = storeToRefs(playControl())

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
    .filter((i) => i.words)

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
let h = ref(20) //行高
let n = ref(0) //元素/屏
let scrollBar = ref<HTMLElement>()
let hand = ref(false) //标记手动滚动
let timer: NodeJS.Timeout
let time = new Date()
let f = true
let index = ref(0) //当前歌词索引
let cruElement = ref(0) //滚动中间元素索引
let r = ref(0) //手动滚动的距离

window.onresize = () => {
  if (ls.value) {
    h.value = ls.value.children.item(0)?.clientHeight ?? 0
    n.value = ls.value.parentElement
      ? Math.floor(ls.value!.parentElement!.parentElement!.offsetHeight / h.value / 2)
      : 0
  }
}
onMounted(async () => {
  lyric.value = await CommonApi.getLyric(playId.value)
  data.value = lyric.value?.lrc?.lyric ? toLrc(lyric.value.lrc.lyric) : []

  if (ls.value) {
    h.value = ls.value.children.item(0)?.clientHeight ?? 0
    n.value = ls.value.parentElement
      ? Math.floor(ls.value!.parentElement!.parentElement!.offsetHeight / h.value / 2)
      : 0
  }
  r.value = scrollBar.value!.scrollTop

  scrollBar?.value?.addEventListener('scrollend', (e) => {
    let t = scrollBar.value!.scrollTop
    let s = t - r.value
    if (s > h.value) {
      wheel()
    } else {
    }
    r.value = t
  })
  scrollBar.value!.addEventListener('wheel', wheel)
  timer = setInterval(set, 100)
})

function wheel() {
  // 手动滚动时 停止自动滚动
  clearInterval(timer)
  cruElement.value =
    Math.ceil(scrollBar.value!.scrollTop / h.value) + Math.ceil(n.value / 4)
  // 触发滚轮事件就 停止自动滚动，延迟一段时间后再恢复自动滚动
  hand.value = true
  let y = new Date().getSeconds() - time.getSeconds()
  if (Math.abs(y) >= 3 || f) {
    setTimeout(() => {
      // 重新启动定时器，恢复自动滚动
      scrollBar.value!.scrollTo({
        top:
          h.value * (index.value - Math.ceil(n.value / 4)) -
          (ls.value ? ls.value!.children.item(index.value)!.clientHeight / 2 : 0), // y 坐标

        behavior: 'smooth', // 可选值：smooth、instant、auto
      })
      setTimeout(() => {
        timer = setInterval(set, 100)
        hand.value = false
      }, 700)
      cruElement.value = 0
    }, 5000) // 2秒后恢复自动滚动
    time = new Date()
    f = false
  }
}

function set() {
  if (!playControl().isPlay) return
  for (let i = 0; i < data.value.length; i++) {
    if (
      data.value[i].time <= playControl().currentTime &&
      (i + 1 < data.value.length
        ? data.value[i + 1].time >= playControl().currentTime
        : true)
    ) {
      index.value = i
      ls.value?.children.item(i)?.classList.add('active')
      if (!hand.value) {
        try {
          scrollBar.value!.scrollTo({
            top:
              h.value * (i - Math.ceil(n.value / 4)) -
              (ls.value ? ls.value!.children.item(index.value)!.clientHeight / 2 : 0), // y 坐标
            behavior: 'smooth', // 可选值：smooth、instant、auto
          })
        } catch (error) {}
      }
    } else {
      ls.value?.children.item(i)?.classList.remove('active')
    }
  }
}
watchEffect(async () => {
  lyric.value = await CommonApi.getLyric(playId.value)
  data.value = lyric.value?.lrc?.lyric ? toLrc(lyric.value.lrc.lyric) : []
})

function s(v: number) {
  currentTime.value = v
  Audio.setCurrentTime(v)
  cruElement.value = 0
}
</script>

<template>
  <div
    class="outline-none flex justify-between flex-col bg-violet-400 relative select-none w-full h-full p-10 text-sm text-center">
    <div class="h-1/6 outline-none flex flex-col justify-center">
      <!-- {{ hand }}/{{ index }}=={{ data[index]?.words }}/{{ n }}//{{ h }}
      <br />
      {{ cruElement }} -->

      <div class="text-2xl mb-4 text-white">{{ musicName }}</div>
      <div class="text-slate-200">{{ singerName }}</div>
    </div>
    <!-- 控制器 -->
    <div
      v-show="cruElement != 0"
      class="absolute w-5/6 box-border justify-between items-center flex top-1/2">
      <div class="text-white">{{ formatTime(Math.floor(data[cruElement]?.time)) }}</div>
      <div class="w-5/6 h-[1px] bg-gray-600 line"></div>
      <div class=""
        ><i
          @click="s(data[cruElement].time)"
          class="fa-solid fa-circle-play text-white text-4xl"></i
      ></div>
    </div>
    <!-- 主体 -->
    <!-- scrollbar-hidden -->
    <div
      class="transition-all scrollbar-hidden h-1/2 ease-linear duration-[400ms] overflow-y-auto outline-none"
      id="scrollBar"
      ref="scrollBar">
      <div
        v-if="data.length != 0"
        class="!p-10 py-40 h-full transition-all ease-linear duration-[400ms] *:transition-transform *:ease-linear *:duration-[400ms] outline-none"
        ref="ls"
        tabindex="1"
        @keypress.prevent="">
        <p
          @click="s(item.time)"
          class="py-2 text-opacity-70 text-white"
          v-for="(item, index) in data"
          :key="index"
          :data-index="index">
          {{ item.words }}
        </p>
      </div>

      <p
        v-else
        class="text-white w-full absolute top-1/2 -translate-y-1/2 text-center text-sm">
        暂无歌词
      </p>
    </div>

    <div class="h-1/6 bg-white bg-opacity-5 rounded-md flex flex-col justify-end"></div>
  </div>
</template>

<style scoped lang="scss">
.active {
  @apply text-white text-2xl;
}
.line {
  background: linear-gradient(to right, #e2e2e2, transparent, #e2e2e2);
}
</style>
