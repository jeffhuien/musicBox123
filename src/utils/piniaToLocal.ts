import type { PiniaPluginContext } from 'pinia'
// import { playControl, queryUserList, searchHistory } from '@/stores'
/** 只有该数组内的状态会被持久化存储 */
const localStoreId = [
  //
  'playControl',
  'queryUserList',
  'searchHistory',
  // 'playList',
  'main',
  'auth',
]

export default function piniaPlugin({ store }: PiniaPluginContext) {
  if (localStoreId.includes(store.$id)) {
    store.$subscribe(() => {
      localStorage.setItem(store.$id, JSON.stringify(store.$state))
    })

    try {
      const localStr = localStorage.getItem(store.$id)
      console.log(store.$id)

      if (localStr) {
        const localData = JSON.parse(localStr)
        store.$state = localData
      }
    } catch (error) {
      console.error('获取本地存储状态失败', error)
    }
  }
}
