import { getPlayUrl } from '#/song/get-url'
import { Song as s_info } from '#/song/songInfo'
import { Music } from '@/utils'
import { fee } from '@/utils/doc'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import playList from './playList'

export const playControl = defineStore(
  'playControl',
  () => {
    let volume = ref<number>(100)
    let isPlay = ref<boolean>(false)
    let currentTime = ref<number>(0.01)
    let duration = ref<number>(0.01)
    let musicName = ref<string>('快选择音乐播放吧~')
    let singerName = ref<string>('')
    let songImg = ref<string>('img/logo.png')
    let playUrl = ref<string>('undefined')
    let playId = ref<number>(0)

    let { playList1, playIndex } = toRefs(playList())

    async function playNext() {
      // 下一首
      let nextId = 0
      if (playList1.value?.length) {
        if (playIndex.value != playList1.value.length - 1) {
          nextId = playList1.value[playIndex.value + 1].id
          playIndex.value++
        } else {
          nextId = playList1.value[0].id
          playIndex.value = 0
        }
        try {
          // const { playMusicById } = await import('@/utils/play')

          await playMusicById(nextId)
        } catch (error) {
          console.log(error)
          playNext()
        }
      }
    }
    async function playPrev() {
      // 上一首
      let prevId = 0
      if (playList1.value?.length) {
        if (playIndex.value != 0) {
          prevId = playList1.value[playIndex.value - 1].id
          playIndex.value--
        } else {
          prevId = playList1.value[playList1.value.length - 1].id
          playIndex.value = playList1.value.length
        }
        try {
          // const { playMusicById } = await import('@/utils/play')
          await playMusicById(prevId)
        } catch (error) {
          playPrev()
        }
      }
    }

    async function playMusic(i: s_info) {
      const { SongApi } = await import('@/Api/song')
      let url = await SongApi.getSongUrl(i.id)
      try {
        await setStore(i, url)
      } catch (error) {
        playNext()
        throw new Error('无版权无法播放')
      }
    }

    async function playMusicById(id: number) {
      const { SongApi } = await import('@/Api/song')

      let url = await SongApi.getSongUrl(id)
      let song = (await SongApi.getSongDetail(id)).songs[0]
      try {
        await setStore(song, url)
      } catch (error) {
        throw new Error('无版权无法播放')
      }
    }

    async function setStore(song: s_info, url: getPlayUrl) {
      playUrl.value = url.data[0].url
      console.log(song, url)
      songImg.value = song.al.picUrl
      musicName.value = song.name
      console.log(musicName.value, song.name)

      singerName.value = song.ar.length > 0 ? song.ar?.map((item: any) => item.name).join('、') : song.ar[0].name
      isPlay.value = true
      playId.value = song.id

      let a = song.fee.toString()
      //无版权无法播放
      if (url.data[0].url === null && song.fee === 0) {
        ElMessage.info({ duration: 3000, message: fee[a] })
        throw new Error('无版权无法播放')
      }
      if (fee[a] && song.fee != 0) {
        ElMessage.info({ duration: 3000, message: fee[a] })
      }
      currentTime.value = 0
      await Music.play(playUrl.value)
      duration.value = Music.getDuration()
    }

    return {
      //
      duration,
      isPlay,
      volume,
      singerName,
      musicName,
      songImg,
      playUrl,
      currentTime,
      playId,
      playNext,
      playPrev,

      playMusic,
      playMusicById,
    }
  },

  {
    persist: true,
  },
)
