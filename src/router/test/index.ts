/*
 * @Author: GAO GAO
 * @Date: 2023-10-12 17:53:24
 */

import { RouteRecordRaw } from 'vue-router'
import { autoRegister } from '../autoRegister'

export default [
  {
    name: 'test',
    path: '/test',
    children: [...autoRegister(['@/test'])],
  },
] as RouteRecordRaw[]
