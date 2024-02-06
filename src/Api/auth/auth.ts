import { UserList } from '#/List/userList'
import Axios from '@/plugins/axios/axios'
import { auth } from '@/stores'
import { env, store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

class Auth extends Axios {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public async getInfo() {
    return this.request<any>({
      url: `/level`,
      data: {
        cookie: store.get('cookie'),
      },
    })
  }
  public async getLevel() {
    return this.request<any>({
      url: `/level`,
      data: {
        cookie: store.get('cookie'),
      },
    })
  }
  public async getCloud(lim?: string | number, off?: string | number) {
    return this.request<CloudSongType>({
      url: '/cloud',
      params: {
        limit: lim ? lim : '',
        offset: off ? off : '',
      },
      data: {
        cookie: store.get('cookie'),
      },
    })
  }

  public async getList(uid?: string) {
    if (!uid) {
      uid = auth().user?.data.account.id.toString()
    }
    console.log(this)

    return await this.request<UserList>({
      url: '/playlist',
      params: {
        uid,
      },
    })
  }
}

const AuthApi = new Auth({
  baseURL: '/user',
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-CSRFToken': localStorage.getItem('cookie'),
    // Authorization: localStorage.getItem('cookie'),
  },
  data: {
    cookie: store.get('cookie'),
  },
})
export { AuthApi }
