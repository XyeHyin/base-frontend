import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type ThemeType = 'light' | 'dark' | 'auto'

export const useAppStore = defineStore('app', () => {
  // 状态
  const collapsed = ref(false)
  const theme = ref<ThemeType>('light')
  const language = ref('zh-CN')

  // 计算属性
  const isDark = computed(() => {
    if (theme.value === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme.value === 'dark'
  })

  // 方法
  function toggleCollapse() {
    collapsed.value = !collapsed.value
  }

  function setTheme(newTheme: ThemeType) {
    theme.value = newTheme
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function setLanguage(lang: string) {
    language.value = lang
  }

  return {
    collapsed,
    theme,
    language,
    isDark,
    toggleCollapse,
    setTheme,
    setLanguage
  }
}, {
  persist: {
    pick: ['theme', 'language', 'collapsed']
  }
})
