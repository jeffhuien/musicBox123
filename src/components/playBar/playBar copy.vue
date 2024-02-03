<template>
  <div class="playBar z-50">
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

    <div class="flex overflow-hidden">
      <div class="play_bg w-full h-full" @click="go">
        <i class="fa-solid fa-angles-up left-0"></i>
        <!-- <!== 歌曲封面 ==> -->
        <img
          class="absolute max-sm:animate-spin-slow top-0 w-full h-full object-cover rounded-md max-sm:rounded-full"
          :src="songImg"
          :style="[isPlay == false ? 'animation-play-state: paused' : '']" />
      </div>
      <div class="md:ml-2 flex items-center justify-between w-32 lg:w-[30vw] overflow-hidden">
        <div
          class="flex shrink-0 flex-1 bars ml-1 flex-col justify-center items-start max-sm:w-[30vw] relative !w-full">
          <div class="" v-if="main().isMobile">
            <songNameMobile :musicName="musicName" :singerName="singerName"></songNameMobile>
          </div>
          <div class="" v-else>
            <RunHouse class="text-sm" :data="[musicName, singerName].join(' - ')"></RunHouse>
            <Bars class="text-sm mt-[.5rem] w-full max-sm:!hidden" :data="leftBars"></Bars>
          </div>
        </div>
      </div>
    </div>
    <!-- <!== 控制条 ==> -->
    <div class="flex justify-center flex-1 relative lg:w-[30vw] max-sm:!justify-end max-sm:pr-12">
      <div class="flex justify-center items-center gap-8 text-xl">
        <i class="fa-solid fa-backward-step text-pink-300 max-md:hidden" @click="playPrev"></i>
        <i
          class="fa-solid text-pink-300 shrink-0 text-4xl w-5 max-sm:text-2xl"
          :class="[isPlay ? 'fa-pause' : 'fa-play ']"
          @click="play"></i>
        <i class="fa-solid fa-forward-step text-pink-300 max-md:hidden" @click="playNext"></i>
      </div>
    </div>

    <div class="lg:w-[30vw] items-center justify-end flex">
      <div class="mr-10 left-0 max-md:!hidden">
        <timeText class="text-xs opacity-90" :CurTime="currentTime" :totalTime="duration" />
      </div>
      <Bars class="text-sm mr-6 max-md:hidden" :data="rightBars"></Bars>
      <Bars class="text-sm mr-6 hidden max-md:block" :data="[rightBars[rightBars.length - 1]]"></Bars>
    </div>

    <div
      ref="playListEl"
      class="animate__animated h-[60vh] overflow-hidden max-md:w-2/5 xl:w-1/4 max-sm:w-full absolute right-0 bottom-[4.8rem] z-50 bg-white border rounded-md shadow-lg">
      <el-scrollbar height="100%" ref="scrollbar">
        <p
          @click="playMusicById(i.id), (playList().playIndex = index)"
          v-for="(i, index) in playList().playList1"
          :index="index"
          :class="[index == playList().playIndex ? 'text-sky-500 opacity-100 bg-gray-200' : '']"
          class="p-1 px-4 rounded-sm hover:bg-gray-200 opacity-50">
          <span class="text-sm"> {{ i.name }} </span>
          <span class="text-xs"> - {{ i.singerName }}</span>
        </p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { bars } from '#/index'
import { SongApi } from '@/Api/song'
import { playControl, main, playList } from '@/stores'
import { Music, playMusicById } from '@/utils'
import { storeToRefs } from 'pinia'
import router from '@/router'
let progress = ref(0)
let mp3 = Music
let playListEl = ref<HTMLElement>()
let scrollbar = ref()
let { musicName, singerName, songImg, currentTime, isPlay, playUrl, duration, playId } = storeToRefs(playControl())
let { playNext, playPrev } = playControl()

mp3.addEventListener('timeupdate', () => {
  currentTime.value = mp3.getCurrentTime()
  progress.value = Math.floor((currentTime.value / duration.value) * 100)
})
//播放完成事件
mp3.addEventListener('ended', () => {
  playNext()
})

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
    fun: function (e: Event & { target: HTMLElement }) {
      playListEl.value?.classList.remove('hidden')
      playListEl.value?.classList.toggle('animate__slideInRight')
      playListEl.value?.classList.toggle('animate__slideOutRight')
    },
  },
] as bars[]

//全局键盘事件
//BUG 时好时坏
document.addEventListener('keyup', async (e: KeyboardEvent) => {
  if (e.key == ' ') {
    await play()
  }
})

async function play() {
  if (isPlay.value) mp3.pause()
  else {
    try {
      await mp3.play(playUrl.value)
    } catch (error) {
      let t = await SongApi.getSongUrl(playId.value)
      await mp3.play(t.data[0].url)
      playUrl.value = t.data[0].url
    }
  }
}

function jump(e: MouseEvent) {
  let dom = e.target as HTMLElement
  try {
    let position = e.offsetX / dom.offsetWidth
    mp3.setCurrentTime(duration.value * position)
  } catch (err) {
    ElMessage.error(err as string)
  }
}

function go() {
  if (router.currentRoute.value.path == '/play') router.back()
  router.push('/play')
}

onMounted(() => {
  isPlay.value = false
  scrollbar.value.setScrollTop(200)
})
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
