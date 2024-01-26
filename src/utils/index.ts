import { Song } from '#/List/ListSongs'
import { SongApi } from '@/Api/song'
import { playControl } from '@/stores'
import { toast } from '@/plugins/toast'
import { fee } from './doc'
import Music from './Audio'
import store from './store'
import env from './env'

/**
 *
 * @param time ms
 * @returns 00:00
 * @example formatTime(130)=>02:10
 */
function formatTime(time: number, type: 'ms' | 'min' = 'min') {
  if (type == 'ms') time = time / 1000

  return `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${Math.floor(time % 60)
    .toString()
    .padStart(2, '0')}`
}

//获取设备尺寸
function getDeviceSize() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  return { width, height }
}
//获取设备尺寸，是移动设备就返回true
function getIsMobile() {
  if (getDeviceSize().width < 768) {
    return true
  }
  return false
}

async function playMusic(i: Song) {
  let url = await SongApi.getSongUrl(i.id)
  playControl().playUrl = url.data[0].url
  playControl().songImg = i.al.picUrl
  playControl().musicName = i.name
  playControl().singerName = i.ar.map((item) => item.name).join('、')
  playControl().isPlay = true
  playControl().playId = i.id
  let a = i.fee.toString()
  // console.log()

  if (url.data[0].url === null && i.fee === 0) {
    toast.info(fee[a], { duration: 3000 })
  }
  if (fee[a] && i.fee != 0) {
    toast.info(fee[a], { duration: 3000 })
  }
  await Music.play(playControl().playUrl)
  playControl().currentTime = 0

  playControl().duration = Music.getDuration()
}
export { Music, env, fee, formatTime, getDeviceSize, getIsMobile, store, playMusic }
