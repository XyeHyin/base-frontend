<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stats = ref([
  { title: '用户总数', value: 1234, icon: '👥', color: '#18a058' },
  { title: '今日访问', value: 567, icon: '📊', color: '#2080f0' },
  { title: '消息数量', value: 89, icon: '💬', color: '#f0a020' },
  { title: '收入统计', value: 12345, icon: '💰', color: '#d03050' }
])
</script>

<template>
  <div class="dashboard">
    <!-- 欢迎区域 -->
    <div class="mb-6 p-6 bg-white rounded-xl shadow-sm">
      <h2 class="text-2xl font-bold text-gray-800">欢迎回来 👋</h2>
      <p class="text-gray-500 mt-2">这是你的仪表盘，祝你有美好的一天！</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <n-card v-for="stat in stats" :key="stat.title" class="hover:shadow-lg transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">{{ stat.title }}</p>
            <p class="text-3xl font-bold mt-2" :style="{ color: stat.color }">
              {{ stat.value.toLocaleString() }}
            </p>
          </div>
          <div class="text-4xl">{{ stat.icon }}</div>
        </div>
      </n-card>
    </div>

    <!-- 快速操作 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <n-card title="快速操作">
        <div class="grid grid-cols-2 gap-4">
          <n-button type="primary" block>创建用户</n-button>
          <n-button type="info" block>查看报表</n-button>
          <n-button type="warning" block>系统设置</n-button>
          <n-button type="error" block>日志管理</n-button>
        </div>
      </n-card>

      <n-card title="系统信息">
        <n-descriptions :column="1" label-placement="left">
          <n-descriptions-item label="框架版本">Spring Boot 3.4.1</n-descriptions-item>
          <n-descriptions-item label="Java版本">Java 21 LTS</n-descriptions-item>
          <n-descriptions-item label="数据库">PostgreSQL 15</n-descriptions-item>
          <n-descriptions-item label="缓存">Redis 7</n-descriptions-item>
          <n-descriptions-item label="前端框架">Vue 3.5 + Naive UI</n-descriptions-item>
        </n-descriptions>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
</style>
