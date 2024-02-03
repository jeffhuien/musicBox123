import Axios from '@/plugins/axios/axios'
import { AxiosRequestConfig } from 'axios'
import { env } from '@/utils'

class Auth extends Axios {
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
}

const AuthApi = new Auth({
  baseURL: 'login',
  method: 'post',
})

export { AuthApi }
