import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    setTimeout: 5000
  })

  // 2.axios的拦截器
  // 2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
