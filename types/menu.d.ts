import { RouteNames } from '@/enum/routeName'
interface menu {
  name: string
  item: {
    ico: string
    name: string
    toName: RouteNames
  }[]
}

export { menu }
