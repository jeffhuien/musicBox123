import { RecommendListType, bannerType, historyListType, lyricType } from '#/index'
import Axios from '@/plugins/axios/axios'
import { auth } from '@/stores'
import { store } from '@/utils'
import { AxiosRequestConfig } from 'axios'

class Common extends Axios {
  constructor(config: AxiosRequestConfig) {
    super(config)
  }

  //首页轮播图
  public async getBannerImg() {
    return await this.request<bannerType>({
      url: '/banner?type=0',
    })
  }

  /**推荐歌单*/
  public async getLists(limit = 30) {
    return await this.request<RecommendListType>({
      url: '/personalized',
      params: {
        limit: 30,
      },
    })
  }
  /**精品歌单*/
  public async getHighQualityList(before?: string, limit = 10) {
    return await this.request<RecommendListType>({
      url: '/top/playlist/highquality',
      params: {
        before: before ? before : '',
        limit,
      },
    })
  }
  /**网友热碟*/
  public async getHOTList() {
    return await this.request<any>({
      url: '/top/playlist?limit=10&order=new',
    })
  }
  /**新歌速递*/
  public async getNEWSong() {
    return await this.request<any>({
      url: '/personalized/newsong',
    })
  }

  /**历史播放*/
  public async getHistoryList() {
    return await this.request<historyListType>({
      url: '/record/recent/song',
    })
  }

  public async getLyric(id: number) {
    return await this.request<lyricType>({
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
  // 喜欢音乐
  public async like(id: number, like?: boolean) {
    return this.request<{ success: boolean }>({
      url: '/like',

      params: {
        id,
        like,
      },
    })
  }

  // 喜欢音乐
  public async likelist(id: number) {
    return this.request<{ ids: [] }>({
      url: '/likelist',

      params: {
        uid: id,
      },
    })
  }

  public async singerList(uid: number) {
    return this.request({
      url: '/user/follows',
      params: {
        uid,
      },
    })
  }

  public async mvList() {
    return this.request<{ data: [] }>({
      url: '/mv/sublist',
      data: {
        cookie: store.get('cookie'),
      },
    })
  }
}

const CommonApi = new Common({
  baseURL: 'api/',
  method: 'post',
  data: {
    cookie: store.get('cookie'),
  },
})

export { CommonApi }
