import { ListSongs } from './List/ListSongs'
import { Song, songInfo } from './song/songInfo'

export interface bars {
  name: string
  ico: string[] | string
  id?: string
  fun: {
    click?: Function
    change?: Function
    blur?: Function
  }
}

export interface musicLocal {
  volume: number
  currentTime: number
  musicName: string
  singerName: string
  songImg: string
  playUrl: string
}

export interface provideData {
  searchData: ListSongs | undefined
}

export interface userListType {
  id: string //uid
  ls: listsType[]
}

export interface listsType {
  //uLists
  name: string
  id: string
  img: string
  count: number
}

export interface banner {
  banners: {
    imageUrl: string
    targetId: number
    adid: string | null
    targetType: number
    titleColor: string
    typeTitle: string
    url: string | null
    exclusive: boolean
    monitorImpress: string | null
    monitorClick: string | null
    monitorType: string | null
    monitorImpressList: string | null
    monitorClickList: string | null
    monitorBlackList: string | null
    extMonitor: string | null
    extMonitorInfo: string | null
    adSource: string | null
    adLocation: string | null
    adDispatchJson: string | null
    encodeId: string
    program: string | null
    event: string | null
    video: string | null
    song: string | null
    scm: string
    bannerBizType: string
  }[]
}

export interface RecommendListType {
  result: {
    id: number
    type: number
    name: string
    copywriter: string
    picUrl: string
    canDislike: boolean
    trackNumberUpdateTime: number
    playCount: number
    trackCount: number
    highQuality: boolean
    alg: string
  }[]
}

export interface historyListType {
  code: number
  data: {
    total: number
    list: {
      resourceId: string
      playTime: number //时间戳
      resourceType: string
      data: Song
    }[]
  }
}
