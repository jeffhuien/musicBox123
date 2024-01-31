import { ref } from 'vue'
import { defineStore } from 'pinia'
import playList from './playList'
import { playMusicById } from '@/utils'
export default defineStore('playControl', () => {
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
        await playMusicById(prevId)
      } catch (error) {
        playPrev()
      }
    }
  }
  return { duration, isPlay, volume, singerName, musicName, songImg, playUrl, currentTime, playId, playNext, playPrev }
})
