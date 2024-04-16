import { MusicComment } from '#/Comment/MusicComment'
import { SongListComment } from '#/Comment/SongListComment'

import Axios from '@/plugins/axios/axios'
import { store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

type CommentType = {
  t: 1 | 2
  type: number
  id: number
  content: string
  commentId?: number
}
class Comment extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  public async getListComment(id: number) {
    return await this.request<SongListComment>({
      url: '/playlist',
      params: {
        id,
      },
    })
  }

  public async getSongComment(id: number, lim?: string, off?: string) {
    return await this.request<MusicComment>({
      url: '/music',
      params: {
        id,
        limit: lim ? lim : '',
        offset: off ? off : '',
      },
    })
  }

  /**
   *
   * @param t 1 发送, 2 回复
   * @param type 0:歌曲 1:mv  2:歌单  3:专辑  4:电台  5:视频  6: 动态
   * @param id 对应资源 id
   * @param content 要发送的内容
   * @param commentId 回复的评论 id (回复评论时必填)
   * @returns
   */
  public async sendComment(data: CommentType) {
    return await this.request<any>({
      params: {
        ...data,
      },
      data: {
        cookie: store.get('cookie'),
      },
    })
  }

  public async getComment(id: number, limit?: string, offset?: string) {
    return this.request<any>({
      url: '/mv',
      params: {
        id,
        limit: limit ? limit : '',
        offset: offset ? offset : '',
      },
    })
  }
}
const CommentApi = new Comment({
  baseURL: 'api/comment',
  method: 'get',
})

export { CommentApi }
