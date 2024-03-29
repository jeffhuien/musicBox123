import { playControl } from '@/stores'

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
        console.log('retry~')
        playControl().playMusicById(playControl().playId)
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
