import loading from './loading'
import queryUserList from './queryUserList'
import searchHistory from './searchHistory'
import playList from './playList'
import auth from './auth'
import { defineStore } from 'pinia'
import { getIsMobile } from '@/utils'
import { playControl } from './playControl'

const main = defineStore(
  'main',
  () => {
    let menuClose = ref(false)
    let listClose = ref(true)
    const isMobile = ref(false)
    const loginShow = ref(false)
    function check() {
      if (getIsMobile()) isMobile.value = true
      else isMobile.value = false
    }

    check()
    window.onresize = () => {
      check()
    }
    return { isMobile, loginShow, menuClose, listClose }
  },
  {
    persist: true,
  },
)

export { main, loading, playList, playControl, searchHistory, queryUserList, auth }
