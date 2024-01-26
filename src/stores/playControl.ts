import { ref } from 'vue'
import { defineStore } from 'pinia'
export default defineStore('playControl', () => {
  let volume = ref<number>(100)
  let isPlay = ref<boolean>(false)
  let currentTime = ref<number>(0.01)
  let duration = ref<number>(0.01)
  let musicName = ref<string>('快选择音乐播放吧~')
  let singerName = ref<string>('')
  let songImg = ref<string>('/img/logo.png')
  let playUrl = ref<string>('undefined')
  let playId = ref<number>(0)

  return { duration, isPlay, volume, singerName, musicName, songImg, playUrl, currentTime, playId }
})
