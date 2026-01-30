<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-300">404</h1>
      <h2 class="text-2xl font-semibold text-gray-700 mt-4">页面不存在</h2>
      <p class="text-gray-500 mt-2">抱歉，您访问的页面不存在</p>
      <div class="mt-8 flex gap-4 justify-center">
        <n-button @click="goBack">返回上页</n-button>
        <n-button type="primary" @click="goHome">返回首页</n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
