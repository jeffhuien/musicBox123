import { ListSongs } from '#/List/ListSongs'
import { UserList } from '#/List/userList'
import Axios from '@/plugins/axios/axios'
import { AxiosRequestConfig } from 'axios'

class List extends Axios {
  constructor(config?: AxiosRequestConfig) {
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
  public async getListSongs(id: number) {
    return await this.request<ListSongs>({
      url: '/playlist/track/all',
      params: {
        id,
      },
    })
  }
}

const ListApi = new List({
  baseURL: '/api',
  method: 'get',
})

export { ListApi }
