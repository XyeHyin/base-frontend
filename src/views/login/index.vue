<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/stores/user'
import type { FormInst, FormRules } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const message = useMessage()
const userStore = useUserStore()

const formRef = ref<FormInst | null>(null)
const loading = ref(false)

const formData = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 50, message: '用户名长度2-50个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 100, message: '密码长度6-100个字符', trigger: 'blur' }
  ]
}

async function handleLogin() {
  try {
    await formRef.value?.validate()
    loading.value = true
    
    await userStore.login({
      username: formData.username,
      password: formData.password,
      rememberMe: formData.rememberMe
    })
    
    message.success('登录成功')
    
    // 跳转到目标页面
    const redirect = (route.query.redirect as string) || '/dashboard'
    await router.replace(redirect)
  } catch (error: any) {
    console.error('登录失败:', error)
    message.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
    <div class="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">XyeHyin</h1>
        <p class="text-gray-500 mt-2">Base Backend 管理系统</p>
      </div>

      <!-- 登录表单 -->
      <n-form ref="formRef" :model="formData" :rules="rules" size="large">
        <n-form-item path="username">
          <n-input 
            v-model:value="formData.username" 
            placeholder="请输入用户名"
            :input-props="{ autocomplete: 'username' }"
          >
            <template #prefix>
              <n-icon><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></n-icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="password">
          <n-input 
            v-model:value="formData.password" 
            type="password" 
            placeholder="请输入密码"
            show-password-on="click"
            :input-props="{ autocomplete: 'current-password' }"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <n-icon><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></n-icon>
            </template>
          </n-input>
        </n-form-item>

        <div class="flex justify-between items-center mb-6">
          <n-checkbox v-model:checked="formData.rememberMe">记住我</n-checkbox>
          <n-button text type="primary">忘记密码？</n-button>
        </div>

        <n-button 
          type="primary" 
          block 
          :loading="loading" 
          @click="handleLogin"
        >
          登 录
        </n-button>
      </n-form>

      <!-- 其他登录方式 -->
      <div class="mt-6 text-center">
        <p class="text-gray-400 text-sm">
          还没有账号？ 
          <n-button text type="primary">立即注册</n-button>
        </p>
      </div>

      <!-- 测试账号提示 -->
      <div class="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-500">
        <p>测试账号：admin / admin123</p>
        <p>测试账号：test / 123456</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
