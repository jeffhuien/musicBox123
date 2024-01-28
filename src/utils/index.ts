import { getPlayUrl } from '#/song/get-url'
import { Song as s_info } from '#/song/songInfo'
import { SongApi } from '@/Api/song'
import { toast } from '@/plugins/toast'
import { playControl } from '@/stores'
import Music from './Audio'
import { fee } from './doc'
import env from './env'
import store from './store'

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

async function setStore(song: s_info, url: getPlayUrl) {
  playControl().playUrl = url.data[0].url
  playControl().songImg = song.al.picUrl
  playControl().musicName = song.name
  playControl().singerName = song.ar.length > 0 ? song.ar?.map((item: any) => item.name).join('、') : song.ar[0].name
  playControl().isPlay = true
  playControl().playId = song.id

  let a = song.fee.toString()
  //无版权无法播放
  if (url.data[0].url === null && song.fee === 0) {
    toast.info(fee[a], { duration: 3000 })
    throw new Error('无版权无法播放')
  }

  if (fee[a] && song.fee != 0) {
    toast.info(fee[a], { duration: 3000 })
  }
  await Music.play(playControl().playUrl)

  playControl().currentTime = 0
  playControl().duration = Music.getDuration()
}

async function playMusic(i: s_info) {
  let url = await SongApi.getSongUrl(i.id)
  try {
    await setStore(i, url)
  } catch (error) {
    playControl().playNext()
    throw new Error('无版权无法播放')
  }
}

async function playMusicById(id: number) {
  let url = await SongApi.getSongUrl(id)
  console.log(url)

  let song = (await SongApi.getSongDetail(id)).songs[0]
  console.log(song)

  try {
    await setStore(song, url)
  } catch (error) {
    throw new Error('无版权无法播放')
  }
}

export { Music, env, fee, formatTime, getDeviceSize, getIsMobile, playMusic, playMusicById, store }
