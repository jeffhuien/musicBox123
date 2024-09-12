import { store } from '@/utils'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
// import router from '@/router'
import { auth } from '@/stores'

let router = useRouter()

export default class Axios {
  protected instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config) //初始化axios
    this.interceptors() //拦截器
  }

  public async request<T>(config: AxiosRequestConfig) {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config)
        resolve(response.data)
      } catch (error: AxiosError | any) {
        // ElMessage.error(error.message)
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
        // console.log(config)
        if (!config.data) {
          config.data = {}
        }

        config.data['cookie'] = store.get('cookie')
        // if (config.url?.includes('cloud')) {
        //   // 将 Cookie 添加到请求的 data 字段中
        //   config.data = config.data || {}
        //   config.data['cookie'] = store.get('cookie')
        //   console.log(config)
        // }
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
          auth().isLogin = false
          router.push('/login')
        }
        return response
      },
      function (error) {
        try {
          if (error.response.data.code == 301 && error.response.data.msg == '需要登录') {
            if (auth().isLogin) {
              ElMessage.warning('登录已过期，请重新登录~~')
              store.remove('cookie')
              auth().isLogin = false
            } else {
              ElMessage.warning('需要登录~~')
              router.push('/login')
            }
          } else if (
            Math.abs(error.response.data.code) >= 400 &&
            error.response.data.code < 500
          ) {
            ElMessage.error(error.response.data.message)
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
