import { getPlayUrl } from '#/song/get-url'
import { songInfo } from '#/song/songInfo'
import Axios from '@/plugins/axios/axios'
import { main } from '@/stores'
import { AxiosRequestConfig } from 'axios'
class Song extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  public async getSongUrl(id: number | string, level: string = main().config.quality) {
    return this.request<getPlayUrl>({
      url: '/url/v1',
      method: 'get',
      params: {
        id,
        level,
        timestamp: new Date().getTime(),
      },
    })
  }

  public async check(id: number | string) {
    return this.request<{ success: boolean }>({
      baseURL: '/api',
      url: '/check/music',
      params: {
        id,
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
  baseURL: '/api/song',
  method: 'get',
})
export { SongApi }
