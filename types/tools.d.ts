declare module NProgress {
  function start()
  function done()
  function configure(option: any)
}

interface PlayerOption {
  el?: string
  url?: string
  id?: string
  width?: number | string
  height?: number | string
  fluid?: boolean
  definitionActive?: 'click' | 'hover'
}

declare class Player {
  constructor(option?: PlayerOption)
  src: string
  play(): void
  pause(): void
  stop(): void
  start(url: string): void
  emit(event: string, data: any): void
}
