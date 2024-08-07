import { playControl, playList } from '@/stores'
import { ElMessageBox } from 'element-plus'
let times = 3
class Music {
  private audio: HTMLAudioElement
  constructor() {
    this.audio = new Audio()
  }

  async play(url: string): Promise<void> {
    if (this.audio.src === url) {
      this.audio.play()
    } else {
      this.audio.src = url
      try {
        await this.audio.play()
      } catch (error) {
        if (times > 0) {
          console.log('retry~')
          playControl().playMusicById(playControl().playId)
          times--
        } else {
          console.log('play error~')
          if (playList().playMode != 'SingleLoop') {
            playControl().playNext()
            ElMessage.warning('播放出现错误，已为您切换下一首')
          } else {
            // window.location.reload()
            ElMessageBox.alert('播放失败，刷新试试吧~', '提示', {
              confirmButtonText: '确定',
            })
          }
          times = 3
        }
      }
    }
    if (playControl().currentTime >= playControl().duration) playControl().currentTime = 0
    this.setCurrentTime(playControl().currentTime)
    playControl().isPlay = true
  }

  pause() {
    this.audio.pause()
    playControl().isPlay = false
  }

  stop(): void {
    this.audio.pause()
    this.audio.currentTime = 0
  }

  setVolume(volume: number): void {
    this.audio.volume = volume
  }

  setMuted() {
    this.audio.muted = !this.audio.muted
  }

  getCurrentTime(): number {
    return this.audio.currentTime
  }

  getDuration(): number {
    return this.audio.duration
  }

  setCurrentTime(arg0: number) {
    this.audio.currentTime = arg0
  }

  addEventListener(event: string, callback: EventListenerOrEventListenerObject): void {
    this.audio.addEventListener(event, callback)
  }

  removeEventListener(event: string, callback: EventListenerOrEventListenerObject): void {
    this.audio.removeEventListener(event, callback)
  }
}

export default new Music()
