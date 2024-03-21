import { MusicComment } from '#/Comment/MusicComment'
import { SongListComment } from '#/Comment/SongListComment'

import Axios from '@/plugins/axios/axios'
import { env, store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

class Comment extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  public async getListComment(id: string) {
    return await this.request<SongListComment>({
      url: '/playlist',
      params: {
        id,
      },
    })
  }

  public async getSongComment(id: string) {
    return await this.request<MusicComment>({
      url: '/music',
      params: {
        id,
        limit: 100,
      },
    })
  }
}

const CommentApi = new Comment({
  baseURL: 'api/comment',
  method: 'get',
})

export { CommentApi }
