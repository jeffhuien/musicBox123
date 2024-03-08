import { RecommendListType, banner, historyListType } from '#/index'
import Axios from '@/plugins/axios/axios'
import { store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

class Common extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  //首页信息
  public async getIndexInfo() {
    return await this.request<banner>({
      url: '/banner?type=0',
      data: {
        cookie: store.get('cookie'),
      },
    })
  }

  /**首页信息*/
  public async getLists(limit = 30) {
    return await this.request<RecommendListType>({
      url: '/personalized',
      params: {
        limit: 30,
      },
      data: {
        cookie: store.get('cookie'),
      },
    })
  }

  /**首页信息*/
  public async getHistoryList() {
    return await this.request<historyListType>({
      url: '/record/recent/song',
      data: {
        cookie: store.get('cookie'),
      },
    })
  }

  public async getLyric(id: number) {
    return await this.request<{
      lrc: { lyric: string }
    }>({
      url: '/lyric',
      params: {
        id,
      },
    })
  }

  public async check(id: number | string) {
    return this.request<{ success: boolean }>({
      baseURL: '/check/music',
      params: {
        id,
      },
    })
  }
}

const CommonApi = new Common({
  baseURL: 'api/',
  method: 'post',
  maxRate: 123,
})

export { CommonApi }
