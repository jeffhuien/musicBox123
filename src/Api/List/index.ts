import { ListSongs } from '#/List/ListSongs'
import { UserListReqType } from '#/List/userList'
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
    return await this.request<UserListReqType>({
      baseURL: env.VITE_API_URL + '/user/playlist',
      params: {
        uid,
      },
    })
  }

  /**
   *
   * @param t 1 收藏，2 取消收藏
   * @param id 歌单id
   * @returns
   */
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
  // TODO 分页获取
  public async getListSongs(id: string) {
    return await this.request<ListSongs>({
      url: '/track/all',
      params: {
        id,
        limit: 60,
        offset: 0,
      },
    })
  }
}

const ListApi = new List({
  baseURL: 'api/playlist',
  method: 'get',
})

export { ListApi }
