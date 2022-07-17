import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 导出基准地址，原因：有些地方不是通过axios发请求，但也想用基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})
// 请求拦截器，如果有token进行头部携带
instance.interceptors.request.use(config => {
// 这一块是写拦截业务逻辑
// 进行请求配置的修改: 如果本地有token就在头部携带
// 1.获取用户信息对象
  const { profile } = store.state.user
  // 2.判断是否有token
  if (profile.token) {
    // 设置请求头
    config.headers.Authorization = `Bearer ${profile.token}`
  }
}, err => {
  return Promise.reject(err)
})
// 响应拦截器：1.剥离无效数据(res=>res.data),把res数据包的一层data去掉 2.处理token失效
instance.interceptors.response.use(res => res.data, err => {
// 处理401状态码
  if (err.response && err.response.status === 401) {
    // 1.清空无效信息
    store.commit('user/setUser', {})
    // 2.跳转到登录页
    // 3.将当前页面的参数传给登录页面
    // 当前路由地址的获取方式：
    // 在组件中：this.$route.path(不带参数)  this.$route.fullPath(带参数的完整地址)
    // 在js模块中：router.currentRoute.value.fullPath  router.currentRoute是ref响应式数据
    // encodeURIComponent() 转换uri编码，防止解析地址出现问题(比如将&转换为%%)
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
