import { getPlayUrl } from '#/song/get-url'
import { songInfo } from '#/song/songInfo'
import Axios from '@/plugins/axios/axios'
import { AxiosRequestConfig } from 'axios'
class Song extends Axios {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public async getSongUrl(id: number | string, level: string = 'standard') {
    return this.request<getPlayUrl>({
      url: '/url/v1',
      method: 'get',
      params: {
        id,
        level,
      },
    })
  }

  public async getSongDetail(id: number | string) {
    return this.request<songInfo>({
      url: '/detail',
      method: 'get',
      params: {
        ids: id,
      },
    })
  }
}

const SongApi = new Song({
  baseURL: '/song',
  method: 'get',
})

export { SongApi }
