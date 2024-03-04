import { ListSongs } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import Axios from '@/plugins/axios/axios'
import { env, store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

class List extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  public async getListDetail(id: string) {
    return await this.request<any>({
      url: '/detail',
      params: {
        id,
      },
      data: {
        cookie: store.get('cookie'),
      },
    })
  }
  public async getList(uid: string) {
    return await this.request<UserList>({
      baseURL: env.VITE_API_URL + '/user/playlist',

      params: {
        uid,
      },
    })
  }
  public async collect(t: number, id: string) {
    return await this.request<any>({
      url: '/subscribe',
      method: 'post',
      params: {
        t,
        id,
      },
      data: {
        cookie: store.get('cookie'),
      },
    })
  }
  public async getListSongs(id: string) {
    return await this.request<ListSongs>({
      url: '/track/all',
      params: {
        id,
      },
    })
  }
}

const ListApi = new List({
  baseURL: 'api/playlist',
  method: 'get',
})

export { ListApi }
