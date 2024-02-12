import { RecommendListType, banner } from '#/index'
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

  //首页信息
  public async getLists() {
    return await this.request<RecommendListType>({
      url: '/personalized?limit=30',
      data: {
        cookie: store.get('cookie'),
      },
    })
  }
}

const CommonApi = new Common({
  method: 'post',
  maxRate: 123,
})

export { CommonApi }
