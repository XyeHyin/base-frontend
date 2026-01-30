import request from './request'

// ==================== 类型定义 ====================

export interface LoginRequest {
  username: string
  password: string
  captcha?: string
  captchaKey?: string
  rememberMe?: boolean
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  userId: number
  username: string
  nickname: string
  avatar: string
}

export interface RegisterRequest {
  username: string
  password: string
  confirmPassword: string
  nickname?: string
  email?: string
  phone?: string
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  email: string
  phone: string
  avatar: string
  gender: number
  status: number
  roles: string[]
  permissions: string[]
  createTime: string
}

// ==================== API接口 ====================

export const authApi = {
  /**
   * 用户登录
   */
  login(data: LoginRequest): Promise<LoginResponse> {
    return request.post('/auth/login', data)
  },

  /**
   * 用户注册
   */
  register(data: RegisterRequest): Promise<void> {
    return request.post('/auth/register', data)
  },

  /**
   * 退出登录
   */
  logout(): Promise<void> {
    return request.post('/auth/logout')
  },

  /**
   * 刷新Token
   */
  refreshToken(refreshToken: string): Promise<LoginResponse> {
    return request.post('/auth/refresh', null, {
      params: { refreshToken }
    })
  },

  /**
   * 获取当前用户信息
   */
  getUserInfo(): Promise<UserInfo> {
    return request.get('/auth/info')
  }
}
