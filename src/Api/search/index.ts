import { Hot } from '#/search/hot'
import { SearchSongs } from '#/search/searchSongs'
import { searchSuggest } from '#/search/searchSuggest'
import Axios from '@/plugins/axios/axios'
import { AxiosRequestConfig } from 'axios'

class Search extends Axios {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public async Suggest(keywords: string) {
    return await this.request<searchSuggest>({
      url: '/suggest',
      params: {
        keywords,
      },
    })
  }

  public async Hot() {
    return await this.request<Hot>({
      url: '/hot',
    })
  }

  public async SearchSongs(keywords: string) {
    return await this.request<SearchSongs>({
      baseURL: '/api/cloudsearch',
      params: {
        keywords,
      },
    })
  }
}

const SearchApi = new Search({
  baseURL: '/api/search',
  method: 'get',
})

export { SearchApi }
