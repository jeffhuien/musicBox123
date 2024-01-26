import { getPlayUrl } from '#/song/get-url'

import Axios from '@/plugins/axios/axios'
import { AxiosRequestConfig } from 'axios'

class Song extends Axios {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public async getSongUrl(id: number | string, level: string = 'standard') {
    return this.request<getPlayUrl>({
      method: 'get',
      params: {
        id,
        level,
      },
    })
  }
}

const SongApi = new Song({
  baseURL: '/api/song/url/v1',
  method: 'get',
})

export { SongApi }
