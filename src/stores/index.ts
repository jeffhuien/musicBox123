import loading from './loading'
import playControl from './playControl'
import queryUserList from './queryUserList'
import searchHistory from './searchHistory'
import playList from './playList'
import { defineStore } from 'pinia'
import { getIsMobile } from '@/utils'

const main = defineStore('main', () => {
  let menuClose = ref(false)
  let listClose = ref(true)
  const isMobile = ref(false)

  function check() {
    if (getIsMobile()) isMobile.value = true
    else isMobile.value = false
  }

  check()
  window.onresize = () => {
    check()
  }
  return { isMobile, menuClose, listClose }
})

export { main, loading, playList, playControl, searchHistory, queryUserList }
