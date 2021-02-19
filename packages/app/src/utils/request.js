import router from '@/router'
import axios from 'axios'
import { stringify } from 'qs'
import { Toast } from 'vant'
// import store from '../store'
// const isProd = process.env.NODE_ENV === 'production'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建 axios 实例
const instance = axios.create({ timeout: 120000 })

// 设置post默认 Content-Type
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

// export type PendingTye = {
//   url;
//   cancel: Canceler;
// }
const pending = []
let cancel
// const pending: PendingTye[] = []
// const removePending = (config: AxiosRequestConfig) => {
//   const url = `${config.url}?${stringify(config.data)}`
//   for (const p in pending) {
//     if (pending[p].url === url) {
//       pending[p].cancel('重复请求URL: ' + url)
//       pending.splice((p as unknown as number), 1)
//     }
//   }
// }

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const url = `${config.url}?${stringify(config.data)}`
    if (pending.includes(url)) {
      config.cancelToken = new axios.CancelToken((c) => {
        cancel = c
      })
      cancel('重复请求URL: ' + url)
    } else {
      pending.push(url)
    }
    // removePending(config)
    // // 添加请求cancel
    // config.cancelToken = new axios.CancelToken((cancel) => {
    //   const url = `${config.url}?${stringify(config.data)}`
    //   pending.push({ url, cancel })
    // })

    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8') {
      // if (config.data) {
      //   config.data.orgId = store.state.park
      // }
      config.data = stringify(config.data)
    }

    // config.headers.Authorization = store.state.token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    const { data } = response
    // 去除 pending 请求
    const url = `${response.config.url}?${stringify(response.config.data)}`
    const index = pending.indexOf(url)
    pending.splice(index, 1)
    // // 去除请求过多
    // const url = `${response.config.url}?${stringify(response.config.data)}`
    // for (const p in pending) {
    //   if (pending[p].url === url) {
    //     pending.splice((p as unknown as number), 1)
    //   }
    // }
    if (data.code === 203) {
      router.push({ path: '/login' })
    }
    // 未登录或者登录失效
    if (data.code === 206) {
      // sessionStorage.setItem('returnUrl', window.location.href)
      // window.location.href = '/#/login'
      // return Promise.reject(new Error('登录失效'))
    }
    if (!data.flag) {
      Toast(data.message)
      return Promise.reject(data)
    }
    return data
  },
  (error) => {
    // 重复请求
    if (error.constructor === axios.Cancel) {
      return Promise.reject(error)
    }
    let code = error.response && error.response.status
    if (code === undefined && error.message.includes('timeout')) {
      code = 504
    }

    Toast(codeMessage[code])

    return Promise.reject(error)
  }
)

export default {
  // post请求
  post (url, params, config) {
    return instance.post(url, params, config)
  },
  // get请求
  get (url, params, config) {
    return instance.get(url, { ...config, params: params })
  },
  // mock请求
  mock (url, params) {
    return axios.get(url, { params: params }).then(response => response.data)
  },
  // upload请求
  upload (url, params) {
    return axios.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
        // Authorization: store.state.token
      }
    }).then(response => response.data)
  }
}
