import { defineStore } from 'pinia'

interface playListType {
  id: number
  name: string
  singerName: string
  fee: number
  time: string
}

export default defineStore('playList', () => {
  // 播放列表
  let playList1 = ref<playListType[]>()
  // 当前播放的歌曲
  let playIndex = ref(1)
  // 当前播放模式
  let playMode = ref<'loop' | 'as'>('loop')

  return {
    playList1,
    playIndex,
    playMode,
  }
})
