<template>
  <div class="topbar">
    <div class="topbar-left">
      <button class="hamburger" @click="appStore.toggleSidebar()" aria-label="Toggle menu">☰</button>
      <div class="page-title">{{ appStore.pageTitle }}</div>
    </div>
    <div class="topbar-right">
      <span class="topbar-badge">{{ appStore.modeLabel }}</span>

      <!-- User menu -->
      <div class="user-menu" ref="menuRef">
        <button class="user-chip" @click="open = !open">
          <div class="avatar-sm">{{ authStore.userAvatar }}</div>
          <span class="user-name">{{ authStore.userName }}</span>
          <span class="chevron">▾</span>
        </button>

        <div v-if="open" class="user-dropdown">
          <div class="user-dropdown-header">
            <div class="avatar-md">{{ authStore.userAvatar }}</div>
            <div>
              <div class="ud-name">{{ authStore.userName }}</div>
              <div class="ud-role">{{ appStore.modeLabel }}</div>
            </div>
          </div>
          <hr class="ud-divider" />
          <button class="ud-item ud-logout" @click="handleLogout">
            <span>⏻</span> Sign out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore }  from '@/stores/useAppStore'
import { useAuthStore } from '@/stores/useAuthStore'

const appStore  = useAppStore()
const authStore = useAuthStore()
const router    = useRouter()

const open   = ref(false)
const menuRef = ref(null)

function handleLogout() {
  open.value = false
  authStore.logout()
  router.replace({ name: 'auth-error' })
}

function onClickOutside(e) {
  if (menuRef.value && !menuRef.value.contains(e.target)) open.value = false
}

onMounted(()  => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.user-menu   { position: relative; }

.user-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1px solid #e0ddd6;
  border-radius: 20px;
  padding: 4px 12px 4px 4px;
  cursor: pointer;
  font-size: 13px;
  color: #3a3a4a;
  transition: background .15s;
}
.user-chip:hover { background: #f5f4f0; }

.user-name { font-weight: 500; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chevron   { font-size: 11px; color: #888; }

.avatar-md {
  width: 36px; height: 36px; border-radius: 50%;
  background: #1a1a2e; color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; flex-shrink: 0;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 220px;
  background: #fff;
  border: 1px solid #e0ddd6;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,.10);
  z-index: 9999;
  overflow: hidden;
}

.user-dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}

.ud-name { font-size: 13px; font-weight: 600; color: #1a1a2e; }
.ud-role { font-size: 11px; color: #888780; margin-top: 2px; }

.ud-divider { border: none; border-top: 1px solid #f0ede8; margin: 0; }

.ud-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  color: #3a3a4a;
  transition: background .12s;
}
.ud-item:hover { background: #f5f4f0; }

.ud-logout { color: #c0392b; }
.ud-logout:hover { background: #fdf1f0; }
</style>
