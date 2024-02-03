<template>
  <div class="playBar p-1 w-full relative lg:justify-between flex-nowrap !bg-opacity-100 z-50 flex items-center">
    <!-- 进度条 -->
    <div class="playBar-progress group w-full h-[0.2rem] hover:cursor-pointer absolute -top-[0.07rem] left-0">
      <el-slider
        :model-value="currentTime"
        :max="duration"
        @update:model-value="setProgress"
        :format-tooltip="(val:number) => formatTime(val)"></el-slider>
    </div>

    <div class="flex overflow-hidden w-1/3 max-sm:w-1/2">
      <div class="play_bg shrink-0 !w-12 !h-12 relative" @click="go">
        <i class="fa-solid fa-angles-up left-0"></i>
        <!-- <!== 歌曲封面 ==> -->
        <img
          class="absolute max-sm:animate-spin-slow top-0 w-full h-full object-cover rounded-md max-sm:rounded-full"
          :src="songImg"
          :style="[isPlay == false ? 'animation-play-state: paused' : '']" />
      </div>
      <div class="md:ml-2 flex items-center justify-between max-sm:w-[50vw] lg:w-[20vw] overflow-hidden">
        <div class="flex shrink-0 flex-1 bars ml-1 flex-col justify-center items-start relative !w-full">
          <template class="" v-if="main().isMobile">
            <songNameMobile :musicName="musicName" :singerName="singerName"></songNameMobile>
          </template>
          <template class="" v-else>
            <RunHouse class="text-sm" :data="[musicName, singerName].join(' - ')"></RunHouse>
            <Bars class="text-sm mt-[.5rem] w-full max-sm:!hidden" :data="leftBars"></Bars>
          </template>
        </div>
      </div>
    </div>
    <!-- <!== 控制条 ==> -->
    <div class="flex justify-center flex-1 relative lg:w-1/3 w-1/4 max-sm:!justify-end max-sm:pr-12">
      <div class="flex justify-center items-center gap-8 text-xl">
        <i class="fa-solid fa-backward-step text-pink-300 max-md:hidden" @click="playPrev"></i>
        <i
          class="fa-solid text-pink-300 shrink-0 text-4xl w-5 max-sm:text-2xl"
          :class="[isPlay ? 'fa-pause' : 'fa-play ']"
          @click="play"></i>
        <i class="fa-solid fa-forward-step text-pink-300 max-md:hidden" @click="playNext"></i>
      </div>
    </div>

    <div class="lg:w-1/3 items-center justify-end flex">
      <div class="mr-10 left-0 max-md:!hidden">
        <timeText class="text-xs opacity-90" :CurTime="currentTime" :totalTime="duration" />
      </div>
      <Bars class="text-sm mr-6 max-md:hidden" :data="rightBars"></Bars>
      <Bars class="text-sm mr-6 hidden max-md:block" :data="[rightBars[rightBars.length - 1]]"></Bars>
    </div>

    <div
      ref="playListEl"
      class="animate__animated hidden animate__slideOutRight h-[60vh] overflow-hidden w-2/5 max-sm:w-full absolute right-0 bottom-[4.8rem] max-sm:bottom-16 z-50 bg-white border rounded-md shadow-lg">
      <div class="flex text-xs justify-between items-center p-2">
        <div class="">正在播放:</div>
        <div class="">共{{ playList().playList1?.length }}首</div>
      </div>
      <el-scrollbar height="100%" ref="scrollbar" v-if="playList().playList1">
        <p
          @click="playMusicById(i.id), (playList().playIndex = index)"
          v-for="(i, index) in playList().playList1"
          :index="index"
          :class="[index == playList().playIndex ? 'text-sky-500 opacity-100 ' : '', i.fee == 0 ? 'text-gray-400' : '']"
          class="p-1 px-4 rounded-sm hover:bg-gray-200">
          <span class="text-sm"> {{ i.name }} </span>
          <span class="text-xs text-gray-400"> - {{ i.singerName }}</span>
          <span
            class="text-xs inline-block opacity-100 text-yellow-500 ml-3 border border-yellow-500 rounded-md p-1 px-2 scale-75"
            v-if="i.fee === 1">
            VIP
          </span>
          <span
            class="text-xs inline-block bg-gray-400 opacity-100 text-white ml-3 border border-gray-100 rounded-md p-1 scale-75"
            v-if="i.fee === 0">
            无音源
          </span>
          <span class="float-right text-xs text-gray-400">
            {{ i.time }}
          </span>
        </p>
      </el-scrollbar>

      <div class="w-full h-full flex justify-center items-center static text-sm text-gray-400" v-else>
        列表内没有音乐哦
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { bars } from '#/index'
import { SongApi } from '@/Api/song'
import { playControl, main, playList } from '@/stores'
import { Music, playMusicById, formatTime } from '@/utils'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { Arrayable } from 'element-plus/es/utils/typescript'

let mp3 = Music
let playListEl = ref<HTMLElement>()
let scrollbar = ref()
let { musicName, singerName, songImg, currentTime, isPlay, playUrl, duration, playId } = storeToRefs(playControl())
let { playNext, playPrev } = playControl()

function setProgress(v: Arrayable<number>) {
  mp3.setCurrentTime(Array.isArray(v) ? v[0] : v)
}

mp3.addEventListener('timeupdate', () => {
  currentTime.value = mp3.getCurrentTime()
})
//播放完成事件
mp3.addEventListener('ended', () => {
  playNext()
})

let leftBars = [
  {
    name: '收藏',
    ico: ['fa-regular fa-heart', 'fa-solid'],
    fun: {
      click: function (e: Event) {
        let ico = ['fa-regular fa-heart', 'fa-solid']
        let target = e.target as HTMLElement
        target.classList.toggle(ico[1])
        target.style.color = '#ff0000'
      },
    },
  },
  {
    name: '评论',
    ico: 'fa-regular fa-comment-dots',
    fun: {
      click: function (e: Event) {},
    },
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
    fun: {
      click: function (e: Event & { target: HTMLElement }) {
        let ico = ['fa-solid fa-volume-high', 'fa-volume-low', 'fa-volume-xmark'] //大中无
        e.target.classList.toggle(ico[2])
        console.log(e.target)
      },
    },
  },
  {
    name: '模式',
    ico: 'fa-solid fa-repeat',
    fun: function (e: Event & { target: HTMLElement }) {},
  },
  {
    name: '列表',
    id: 'playListEl',
    ico: 'fa-solid fa-list-ol',
    fun: {
      click: function (e: Event & { target: HTMLElement }) {
        playListEl.value?.classList.remove('hidden')
        playListEl.value?.classList.toggle('animate__slideInRight')
        playListEl.value?.classList.toggle('animate__slideOutRight')
        main().listClose = !main().listClose
      },
      blur: function (e: Event & { target: HTMLElement }) {
        playListEl.value?.classList.toggle('animate__slideOutRight')
        playListEl.value?.classList.toggle('animate__slideInRight')
        main().listClose = !main().listClose
      },
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
.play_bg {
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

:deep(.el-slider) {
  --el-slider-border-radius: none;
  --el-slider-height: 2px;
  --el-slider-button-size: 0px;
  --el-slider-button-wrapper-offset: -16px;
  align-items: start;
  :hover {
    --el-slider-button-size: 10px;
  }
  .el-slider__button {
    @apply border-none bg-red-400;
  }
}

:deep(.el-popper) {
  @apply bg-red-400;
  .el-popper__arrow {
    @apply hidden;
  }
}
</style>
