import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { env, store } from '@/utils'
import router from '@/router'
import { auth } from '@/stores'

export default class Axios {
  protected instance
  constructor(config: AxiosRequestConfig) {
    // if (config?.baseURL || config.baseURL === '') {
    //   config.baseURL = env.VITE_API_URL + config.baseURL
    // }
    // if (!config.baseURL) config['baseURL'] = env.VITE_API_URL
    this.instance = axios.create(config) //初始化axios
    this.interceptors() //拦截器
  }

  public async request<T>(config: AxiosRequestConfig) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config)
        resolve(response.data)
      } catch (error: AxiosError | any) {
        ElMessage.error(error.message)
        reject(error)
      }
    })
  }

  private interceptors() {
    this.interceptorsRequest() //请求拦截器
    this.interceptorsResponse() //响应拦截器
    // throw new Error("Method not implemented.");
  }

  private interceptorsRequest() {
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config
      },
      function (error) {
        // 对请求错误做些什么
        console.log('出错了')

        return Promise.reject(error)
      },
    )
  }

  private interceptorsResponse() {
    // 添加响应拦截器
    this.instance.interceptors.response.use(
      function (response) {
        // 对响应数据做点什么
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        if (response.data.code == 302 && response?.data.msg == null) {
          ElMessage.warning('登录已过期，请重新登录~~')
          store.remove('cookie')
          auth().$reset()
          router.push('/login')
        }
        return response
      },
      function (error) {
        // console.log(instance.defaults)
        try {
          if (error.response.data.code == 301 && error.response.data.msg == '需要登录') {
            if (auth().isLogin) {
              ElMessage.warning('登录已过期，请重新登录~~')
              store.remove('cookie')
              auth().$reset()
            } else {
              ElMessage.warning('需要登录~~')
              router.push('/login')
            }
          }
        } catch (error) {
          ElMessage.error('服务错误，请尝试刷新~~')
        }
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
      },
    )
  }
}
