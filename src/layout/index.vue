<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore, useUserStore } from '@/stores'
import { useMessage } from 'naive-ui'

const appStore = useAppStore()
const userStore = useUserStore()
const message = useMessage()

// 菜单配置
const menuOptions = computed(() => [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: renderIcon('dashboard')
  },
  {
    label: '个人中心',
    key: 'profile',
    icon: renderIcon('user')
  }
])

function renderIcon(name: string) {
  // 简单的图标渲染
  return () => null
}

async function handleLogout() {
  await userStore.logout()
  message.success('退出成功')
}
</script>

<template>
  <n-layout class="h-screen">
    <!-- 顶部导航 -->
    <n-layout-header bordered class="h-16 px-6 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <n-button quaternary @click="appStore.toggleCollapse">
          <n-icon size="20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </n-icon>
        </n-button>
        <h1 class="text-xl font-bold text-primary">XyeHyin Base</h1>
      </div>

      <div class="flex items-center gap-4">
        <n-dropdown :options="[
          { label: '个人中心', key: 'profile' },
          { type: 'divider', key: 'd1' },
          { label: '退出登录', key: 'logout' }
        ]" @select="(key) => key === 'logout' && handleLogout()">
          <div class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg">
            <n-avatar round size="small">{{ userStore.nickname?.charAt(0) || 'U' }}</n-avatar>
            <span>{{ userStore.nickname || userStore.username }}</span>
          </div>
        </n-dropdown>
      </div>
    </n-layout-header>

    <n-layout has-sider>
      <!-- 侧边栏 -->
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="appStore.collapsed"
        show-trigger
        @collapse="appStore.collapsed = true"
        @expand="appStore.collapsed = false"
      >
        <n-menu
          :collapsed="appStore.collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>

      <!-- 主内容区 -->
      <n-layout-content class="p-6 bg-gray-50">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.text-primary {
  color: #18a058;
}
</style>
