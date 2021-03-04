import axios from 'axios'
import { Toast } from 'vant'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // 是否跨域请求中发送cookies
  timeout: 5000 // 设置超时时长
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.globalUniqueID = window.sessionStorage.getItem('globalUniqueID')
    // do something before request is sent
    // 在请求前对于请求进行处理，如设置token或设置请求头信息
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 通过与服务端约定的返回状态码进行请求处理，例如如下状态码不为'1'时判断为请求失败弹出报错信息
    if (res.code !== '1') {
      Toast.fail(res.msg || '系统错误请稍后再试')

      return Promise.reject(res.msg || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug

    Toast.fail(error.msg || '未知错误请稍后再试')

    return Promise.reject(error)
  }
)

export default service
