import { ListSongs } from './List/ListSongs'

export interface bars {
  name: string
  ico: string[] | string
  fun: Function
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
