import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi, type LoginRequest, type LoginResponse, type UserInfo } from '@/api/auth'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const userInfo = ref<UserInfo | null>(null)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username || '')
  const nickname = computed(() => userInfo.value?.nickname || '')
  const avatar = computed(() => userInfo.value?.avatar || '')
  const roles = computed(() => userInfo.value?.roles || [])

  // 登录
  async function login(loginData: LoginRequest): Promise<LoginResponse> {
    const res = await authApi.login(loginData)
    token.value = res.accessToken
    refreshToken.value = res.refreshToken
    
    // 登录成功后立即获取用户信息
    await getUserInfo()
    
    return res
  }

  // 获取用户信息
  async function getUserInfo(): Promise<UserInfo> {
    const res = await authApi.getUserInfo()
    userInfo.value = res
    return res
  }

  // 退出登录
  async function logout() {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('退出登录失败', error)
    } finally {
      resetState()
      router.push('/login')
    }
  }

  // 重置状态
  function resetState() {
    token.value = null
    refreshToken.value = null
    userInfo.value = null
  }

  // 刷新Token
  async function refreshAccessToken(): Promise<string | null> {
    if (!refreshToken.value) return null
    try {
      const res = await authApi.refreshToken(refreshToken.value)
      token.value = res.accessToken
      refreshToken.value = res.refreshToken
      return res.accessToken
    } catch (error) {
      resetState()
      return null
    }
  }

  return {
    // 状态
    token,
    refreshToken,
    userInfo,
    // 计算属性
    isLoggedIn,
    username,
    nickname,
    avatar,
    roles,
    // 方法
    login,
    getUserInfo,
    logout,
    resetState,
    refreshAccessToken
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage,  // 使用 localStorage，浏览器关闭后仍然保留
    pick: ['token', 'refreshToken']
  }
})
