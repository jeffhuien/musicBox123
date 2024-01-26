import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getIsMobile } from '@/utils'

export default defineStore('IsMobile', () => {
  const isMobile = ref(false)
  function check() {
    if (getIsMobile()) isMobile.value = true
    else isMobile.value = false
  }
  check()
  window.onresize = () => {
    check()
  }
  return { isMobile }
})
