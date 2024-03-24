import loading from './loading'
import queryUserList from './queryUserList'
import searchHistory from './searchHistory'
import playList from './playList'
import auth from './auth'
import { defineStore } from 'pinia'
import { playControl } from './playControl'
import { ColorModeConfig, MusicConfig } from '#/config'

interface configItem {
  [key: string]: any
  quality: MusicConfig
  colorMode: ColorModeConfig
}

const main = defineStore(
  'main',
  () => {
    const menuClose = ref(false)
    const listClose = ref(true)
    const config = ref<configItem>({
      quality: MusicConfig.standard,
      colorMode: ColorModeConfig.system,
    })
    const isMobile = ref(false)
    const loginShow = ref(false)

    let s = ref(0)
    return { isMobile, loginShow, menuClose, listClose, config, s }
  },
  {
    persist: true,
  },
)

export { main, loading, playList, playControl, searchHistory, queryUserList, auth }
