type keys = 'cookie'

export default {
  set(key: keys, data: any) {
    localStorage.setItem(key, data)
  },
  get(key: keys) {
    const cacheStore = localStorage.getItem(key)
    return cacheStore
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}
