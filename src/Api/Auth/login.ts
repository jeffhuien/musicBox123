import Axios from '@/plugins/axios/axios'
import { store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

class Login extends Axios {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public async ByPhone(phone: string, password: string) {
    return await this.request<any>({
      url: '/cellphone',
      params: {
        phone,
        password,
      },
    })
  }

  public async ByEmail(uid: string) {
    return await this.request<any>({
      url: '/user/playlist',
      params: {
        uid,
      },
    })
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
}

const loginApi = new Login({
  baseURL: '/login',
  method: 'post',
  data: {
    cookie: store.get('cookie'),
  },
})

export { loginApi }
