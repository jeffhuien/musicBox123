import { UserListReqType } from '#/List/userList'
import { CloudSongType } from '#/song/cloudSong'
import Axios from '@/plugins/axios/axios'
import { AxiosRequestConfig } from 'axios'

class Auth extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  public async getInfo(id: number) {
    return this.request<any>({
      url: `/detail`,
      params: {
        uid: id,
      },
    })
  }

  public async getAccount() {
    return this.request<any>({
      url: `/account`,
    })
  }

  public async getLevel() {
    return this.request<any>({
      url: `/level`,
    })
  }

  public async getCloud(page: { limit: number; offset: number }) {
    return this.request<CloudSongType>({
      url: '/cloud',
      params: {
        ...page,
      },
    })
  }

  public async getList(uid?: string) {
    return await this.request<UserListReqType>({
      url: '/playlist',
      params: {
        uid,
      },
    })
  }

  async getPlayUrl(id: string) {
    return await this.request<any>({
      baseURL: '/api',
      url: '/song/url/v1',
      params: {
        id,
        timestamp: new Date().getTime(),
      },
    })
  }
}

class Login extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  public async checkStatus(key: string) {
    return await this.request<any>({
      url: `/qr/check?key=${key}&timestamp=${Date.now()}`,
    })
  }

  public async getLoginStatus(cookie: string | null = '') {
    return await this.request<any>({
      url: `/status?timestamp=${Date.now()}`,
      data: {
        cookie,
      },
    })
  }

  public async getAnonimousCookie() {
    return await this.request<{
      cookie: string
    }>({
      baseURL: `/api/register/anonimous`,
      method: 'get',
    })
  }

  public async login() {
    const { data } = await this.request<any>({
      url: `/qr/key?timestamp=${Date.now()}`,
    })
    let key = data.unikey
    const res2 = await this.request<{
      code: number
      data: { qrimg: string; qrurl: string }
    }>({
      url: `/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
    }) //返回二维码
    return { key, res2 }
  }

  public async logout() {
    return await this.request<any>({
      baseURL: '/api/logout',
    })
  }
}

export const loginApi = new Login({
  baseURL: '/api/login',
  method: 'post',
})
export const AuthApi = new Auth({
  baseURL: '/api/user',
  method: 'post',
})
