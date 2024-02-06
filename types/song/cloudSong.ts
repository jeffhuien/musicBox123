interface CloudSongType {
  data: {
    simpleSong: {
      name: string
      id: number
      /**
       * 歌手信息
       */
      ar: [{ id: 6520; name: '张振宇'; tns: []; alias: [] }]
      /**
       * 专辑信息
       */
      al: {
        id: string
        name: string
        picUrl: string
      }
      dt: number //时长
    }[]
    count: number //共计歌曲
    size: string //已用容量（B字节）
    maxSize: string //共计容量
    code: number
  }[]
}
