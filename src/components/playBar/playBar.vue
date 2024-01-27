<template>
  <div class="playBar">
    <!-- 进度条 -->
    <div
      class="playBar-progress group w-full h-[0.2rem] hover:cursor-pointer absolute -top-[0.07rem] left-0"
      @click="jump($event)">
      <div class="relative">
        <span class="absolute block h-[0.1rem] bg-gray-100 w-full"></span>
        <span
          class="absolute block h-[0.1rem] bg-blue-600 z-10"
          :style="['width:' + (currentTime / duration) * 100 + '%']"
          id="progress">
        </span>
      </div>
      <span
        class="w-2 h-2 rounded absolute -translate-y-1/2 -translate-x-1/2 z-10 bg-red-700 !hidden group-hover:!block"
        :style="['left:' + (currentTime / duration) * 100 + '%']"
        id="idot"></span>
    </div>

    <div class="play_bg w-full h-full" @click="go">
      <i class="fa-solid fa-angles-up left-0"></i>
      <!-- <!== 歌曲封面 ==> -->
      <img
        class="absolute max-sm:animate-spin-slow top-0 w-full h-full object-cover rounded-md max-sm:rounded-full"
        :src="songImg"
        :style="[isPlay == false ? 'animation-play-state: paused' : '']" />
    </div>
    <div class="md:ml-2 shrink-0 flex items-center justify-between lg:w-[30vw]">
      <div class="flex shrink-0 flex-1 bars ml-1 flex-col justify-center items-start max-sm:w-[30vw] relative !w-full">
        <div class="" v-if="ISMobile().isMobile">
          <songNameMobile :musicName="musicName" :singerName="singerName"></songNameMobile>
        </div>
        <div class="" v-else>
          <RunHouse class="text-sm" :data="[musicName, singerName].join(' - ')"></RunHouse>
          <Bars class="text-sm mt-[.5rem] w-full max-sm:!hidden" :data="leftBars"></Bars>
        </div>
      </div>
    </div>

    <!-- <!== 控制条 ==> -->
    <div class="flex justify-center flex-1 relative lg:w-[30vw] max-sm:!justify-end max-sm:pr-12">
      <div class="flex justify-center items-center gap-8 text-xl">
        <i class="fa-solid fa-backward-step text-pink-300 max-md:hidden"></i>
        <i
          class="fa-solid text-pink-300 shrink-0 text-4xl w-5 max-sm:text-2xl"
          :class="[isPlay ? 'fa-pause' : 'fa-play ']"
          @click="play"></i>
        <i class="fa-solid fa-forward-step text-pink-300 max-md:hidden"></i>
      </div>
    </div>

    <div class="lg:w-[30vw] items-center justify-end flex">
      <div class="mr-10 left-0 max-md:!hidden">
        <timeText class="text-xs opacity-90" :CurTime="currentTime" :totalTime="duration" />
      </div>
      <Bars class="text-sm mr-6 max-md:hidden" :data="rightBars"></Bars>
      <Bars class="text-sm mr-6 hidden max-md:block" :data="[rightBars[rightBars.length - 1]]"></Bars>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { bars } from '#/index'
import { SongApi } from '@/Api/song'
import { toast } from '@/plugins/toast'
import router from '@/router'
import { playControl, ISMobile } from '@/stores'
import { Music } from '@/utils'
import { storeToRefs } from 'pinia'

let progress = ref(0)

let { musicName, singerName, songImg, currentTime, isPlay, playUrl, duration, playId } = storeToRefs(playControl())
let mp3 = Music
// let timer: undefined | NodeJS.Timeout

mp3.addEventListener('timeupdate', () => {
  currentTime.value = mp3.getCurrentTime()
  progress.value = Math.floor((currentTime.value / duration.value) * 100)
})
//播放完成事件
mp3.addEventListener('ended', () => (isPlay.value = false))

let leftBars = [
  {
    name: '收藏',
    ico: ['fa-regular fa-heart', 'fa-solid'],
    fun: function (e: Event) {
      let target = e.target as HTMLElement
      target.classList.toggle(this.ico[1])
      target.style.color = '#ff0000'
    },
  },
  {
    name: '评论',
    ico: 'fa-regular fa-comment-dots',
  },
  {
    name: '下载',
    ico: 'fa-solid fa-download',
  },
] as bars[]

let rightBars = [
  {
    name: '音量',
    ico: ['fa-solid fa-volume-high', 'fa-volume-low', 'fa-volume-xmark'], //大中无
    fun: function (e: Event & { target: HTMLElement }) {
      e.target.classList.toggle(this.ico[2])
      console.log(e.target)
    },
  },
  {
    name: '模式',
    ico: 'fa-solid fa-repeat',
    fun: function (e: Event & { target: HTMLElement }) {},
  },
  {
    name: '列表',
    ico: 'fa-solid fa-list-ol',
  },
] as bars[]

//全局键盘事件
//BUG 时好时坏
document.addEventListener('keyup', async (e: KeyboardEvent) => {
  // console.log(e.target.nodeName)

  if (e !== null && e.target !== null) {
    console.log(e)
    // if (e.target.nodeNama !== 'BODY') return
    if (e.key == ' ') {
      await play()
    }
  }
})

/**
 * @description 播放
 */

async function play() {
  if (isPlay.value) mp3.pause()
  else {
    try {
      await mp3.play(playUrl.value)
    } catch (error) {
      let t = await SongApi.getSongUrl(playId.value)
      await mp3.play(t.data[0].url)
      playControl().playUrl = t.data[0].url
    }
  }
}

/**
 * 跳转播放
 * @param e
 */
function jump(e: MouseEvent) {
  let dom = e.target as HTMLElement
  try {
    let position = e.offsetX / dom.offsetWidth
    mp3.setCurrentTime(duration.value * position)
  } catch (err) {
    toast.error(err as string)
    // location.reload()
  }
}

function go() {
  if (router.currentRoute.value.path == '/play') router.back()
  router.push('/play')
}

onMounted(() => (playControl().isPlay = false))
</script>

<style scoped lang="scss">
.playBar {
  transition: 0.3s all ease;
  @apply w-full relative flex lg:justify-between flex-nowrap p-2;

  .playBar-progress {
    #idot {
      display: block;
    }

    &:hover {
      #idot {
        display: block;
      }
    }
  }

  .play_bg {
    height: 3.5rem;
    width: 3.5rem;
    position: relative;

    i {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffffee;
      font-size: 2rem;
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &:hover i {
      opacity: 0.6;
      z-index: 100;
    }
  }
}
</style>
