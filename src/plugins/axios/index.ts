// /*
//  * @Author: GAO GAO
//  * @Date: 2024-01-06 15:24:52
//  */
// import { env, store } from '@/utils'
// import Axios from './axios'
// // import store from '@/utils/store'

// // let csrfToken = store.get('csrfToken')

// // if (!csrfToken) {
// //   let { res } = (await new Axios({}).request({
// //     url: '/api/csrf_token',
// //   })) as any
// //   store.set('csrfToken', res.csrfToken)
// // }

// const Api = new Axios({
//   baseURL: env.VITE_API_URL,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//     // 'X-CSRFToken': store.get('csrfToken'),
//   },
//   withCredentials: true,
//   method: 'get',
// })
// console.log(123)

// console.log(Api)

// export { Api }

// import './axios'
// import '@/Api'
export function setupAxios() {}
