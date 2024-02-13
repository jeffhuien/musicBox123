import { ListSongs } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import Axios from '@/plugins/axios/axios'
import { store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

class List extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  public async getList(uid: string) {
    return await this.request<UserList>({
      url: '/user/playlist',
      params: {
        uid,
      },
    })
  }

  public async getListDetail(id: string) {
    return await this.request<any>({
      url: '/playlist/detail',
      params: {
        id,
      },
      data: {
        cookie: store.get('cookie'),
      },
    })
  }

  public async getListSongs(id: string) {
    return await this.request<ListSongs>({
      url: '/playlist/track/all',
      params: {
        id,
      },
    })
  }
}

const ListApi = new List({
  baseURL: '',
  method: 'get',
})

export { ListApi }
