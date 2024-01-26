import { defineStore } from 'pinia'

export default defineStore('userList', () => {
  // 定义一个数组来存储搜索历史
  const userList = ref<string[]>([])

  // 添加搜索历史
  function add(keyword: string) {
    if (!userList.value.includes(keyword)) {
      userList.value.unshift(keyword)
    }
  }

  function remove(keyword: string) {
    userList.value.splice(userList.value.indexOf(keyword), 1)
  }

  return { userList, add, remove }
})
