import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const myAxios = axios.create({
  // 基地址
  baseURL: isDev ? 'http://localhost:8081/api' : '线上地址',
  // 请求超时时间
  timeout: 100000
})
// 配置为true 跨域携带cookie
myAxios.defaults.withCredentials = true

// 请求拦截器
myAxios.interceptors.request.use(
  config => {
    // 请求前可以做一些东西 比如携带token什么的
    return config
  },
  err => {
    // 请求错误做一些东西
    return Promise.reject(err)
  }
)

// 响应拦截器
myAxios.interceptors.response.use(
  response => {
    console.log(response)
    // code为0正常返回数据
    if (response.data.code === 0) {
      return response.data
    }
    // // 未登录则跳转到登录页
    // if (response.data.code === 40100) {
    //   const redirectUrl = window.location.href
    //   window.location.href = `/login?redirect=${redirectUrl}`
    // }
    // 响应错误
    showFailToast(response.data.message || '服务异常')
    return Promise.reject(response.data)
  },
  err => {
    // Do something with response error
    return Promise.reject(err)
  }
)

export default myAxios
