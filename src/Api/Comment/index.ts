import { MusicComment } from '#/Comment/MusicComment'
import { SongListComment } from '#/Comment/SongListComment'

import Axios from '@/plugins/axios/axios'
import { store } from '@/utils'
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

  public async getSongComment(id: string, lim?: string, off?: string) {
    return await this.request<MusicComment>({
      url: '/music',
      params: {
        id,
        limit: lim ? lim : '',
        offset: off ? off : '',
      },
    })
  }

  public async CommitComment(id: string, content: string) {
    return await this.request<any>({
      url: '/music',
      method: 'post',
      params: {
        id,
        content,
      },
      data: {
        cookie: store.get('cookie'),
      },
    })
  }
}

const CommentApi = new Comment({
  baseURL: 'api/comment',
  method: 'get',
})

export { CommentApi }
