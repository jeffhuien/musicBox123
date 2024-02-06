import Music from './Audio'
import { fee } from './doc'
import env from './env'
import store from './store'
// import { playMusic, playMusicById } from '@/utils/play'

/**
 *
 * @param time ms | min
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

export {
  //
  Music,
  env,
  fee,
  formatTime,
  getDeviceSize,
  getIsMobile,
  // playMusic,
  // playMusicById,
  store,
}
