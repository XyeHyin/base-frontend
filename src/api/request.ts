import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'

// 统一响应结构
export interface Result<T = any> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 分页结果
export interface PageResult<T = any> {
  records: T[]
  total: number
  current: number
  size: number
  pages: number
}

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<Result>) => {
    const res = response.data
    
    // 成功
    if (res.code === 200) {
      return res.data
    }
    
    // Token过期
    if (res.code === 401) {
      const userStore = useUserStore()
      userStore.resetState()
      window.$message?.error('登录已过期，请重新登录')
      return Promise.reject(new Error(res.message || '未授权'))
    }
    
    // 其他错误
    window.$message?.error(res.message || '请求失败')
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  (error) => {
    let message = '网络错误，请稍后重试'
    
    if (error.response) {
      const status = error.response.status
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请登录'
          const userStore = useUserStore()
          userStore.resetState()
          break
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = error.response.data?.message || '请求失败'
      }
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请稍后重试'
    }
    
    window.$message?.error(message)
    return Promise.reject(error)
  }
)

// 扩展window类型
declare global {
  interface Window {
    $message: any
    $dialog: any
    $notification: any
  }
}

export default request
