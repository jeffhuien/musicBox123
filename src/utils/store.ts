interface IData {
  expire?: number
  token?: string
  data?:
    | {
        name?: string
      }
    | any
}

export default {
  set(key: string, data: IData | any, expire?: number): any {
    let cache: IData = data
    if (expire) cache.expire = new Date().getTime() + expire * (86400 * 1000) //expire天token
    localStorage.setItem(key, JSON.stringify(cache))
  },
  get(key: string): IData | null | string | any {
    const cacheStore = localStorage.getItem(key)
    if (cacheStore) {
      const cache = JSON.parse(cacheStore) as IData
      const expire = cache.expire
      if (expire && expire < new Date().getTime()) {
        localStorage.removeItem(key)
        return null
      }
      return cache
    }
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
}
