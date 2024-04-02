import { RouteRecordRaw } from 'vue-router'

export function autoRegister(FPath: string[]) {
  const testRoute = import.meta.glob('@/test/*.vue', { eager: true, import: 'default' })
  // const layout = import.meta.glob('@/layout/**/*.vue', { eager: true })
  // const views = import.meta.glob('@/views/**/*.vue', { eager: true })
  function getRoute() {
    let route: RouteRecordRaw[] = []
    Object.entries(testRoute).forEach(([key, value]) => {
      let name = key.split('.')[0]
      let n = name.split('/')[2] + '.' + name.split('/')[3]
      let path = name.split('/')[3]
      route.push({
        name: n,
        component: value as FileReader,
        path,
      })
    })
    return route
  }
  return getRoute()
}
