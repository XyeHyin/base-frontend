<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="profile">
    <n-card title="个人中心">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- 头像区域 -->
        <div class="flex flex-col items-center">
          <n-avatar :size="120" round>
            {{ userStore.nickname?.charAt(0) || 'U' }}
          </n-avatar>
          <n-button class="mt-4" size="small">更换头像</n-button>
        </div>

        <!-- 信息区域 -->
        <div class="flex-1">
          <n-descriptions :column="2" label-placement="left">
            <n-descriptions-item label="用户名">
              {{ userStore.username }}
            </n-descriptions-item>
            <n-descriptions-item label="昵称">
              {{ userStore.nickname || '-' }}
            </n-descriptions-item>
            <n-descriptions-item label="邮箱">
              {{ userStore.userInfo?.email || '-' }}
            </n-descriptions-item>
            <n-descriptions-item label="手机号">
              {{ userStore.userInfo?.phone || '-' }}
            </n-descriptions-item>
            <n-descriptions-item label="角色">
              <n-tag v-for="role in userStore.roles" :key="role" type="success" class="mr-2">
                {{ role }}
              </n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="注册时间">
              {{ userStore.userInfo?.createTime || '-' }}
            </n-descriptions-item>
          </n-descriptions>

          <n-divider />

          <div class="flex gap-4">
            <n-button type="primary">编辑资料</n-button>
            <n-button>修改密码</n-button>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
</style>
