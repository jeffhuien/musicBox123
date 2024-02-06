import { ListSongs } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import { listsType, userListType } from '#/index'
import { defineStore } from 'pinia'

export default defineStore(
  'queryUserList',
  () => {
    // 定义一个数组来存储搜索历史
    const userList = ref<userListType[]>([])
    let cur = ref(0)

    function get(key: string) {
      return userList.value.findIndex((item) => item.id === key)
    }

    // 添加搜索历史
    function add(uid: string, data: UserList) {
      let t = data.playlist.map((I) => {
        return { name: I.name, id: I.id.toString(), img: I.coverImgUrl, count: I.trackCount }
      })
      if (get(uid) == -1) {
        userList.value.unshift({ id: uid, ls: t })
      }
      cur.value = 0
    }

    function update(keyword: string, data: ListSongs) {}

    function getCur(): listsType[] | boolean {
      if (userList.value.length != 0) return userList.value[cur.value].ls
      return false
    }
    function getItem(id: string) {
      if (userList.value.length != 0)
        // let res =
        return userList.value[cur.value].ls.find((i) => i.id == id)
      // return res
    }
    function remove(keyword: string) {
      if (get(keyword) != -1) userList.value.splice(get(keyword), 1)
    }
    return { userList, add, remove, update, getCur, cur, getItem }
  },
  {
    persist: true,
  },
)
