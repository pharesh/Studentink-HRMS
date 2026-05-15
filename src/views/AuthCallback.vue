<template>
  <div class="auth-screen">
    <!-- Loading state -->
    <div v-if="status === 'loading'" class="auth-card">
      <div class="auth-spinner"></div>
      <div class="auth-title">Signing you in…</div>
      <div class="auth-sub">Verifying your session with Studentink</div>
    </div>

    <!-- Error state -->
    <div v-else-if="status === 'error'" class="auth-card">
      <div class="auth-icon-error">✕</div>
      <div class="auth-title">Authentication Failed</div>
      <div class="auth-sub">{{ errorMessage }}</div>
      <a :href="mainAppUrl" class="btn btn-primary" style="margin-top:20px;text-decoration:none;display:inline-block">
        ← Back to Studentink
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const route      = useRoute()
const router     = useRouter()
const authStore  = useAuthStore()
const mainAppUrl = import.meta.env.VITE_MAIN_APP_URL || '/'

const status       = ref('loading')
const errorMessage = ref('')

onMounted(async () => {
  const { user_id, username, academy } = route.query

  if (!user_id || !username || !academy) {
    status.value       = 'error'
    errorMessage.value = 'Missing SSO parameters. Please launch HRMS from the Studentink portal.'
    return
  }

  try {
    await authStore.ssoLogin(user_id, username, academy)
    router.replace({ name: 'hrms-dashboard' })
  } catch (err) {
    status.value       = 'error'
    errorMessage.value =
      err?.response?.data?.message ||
      'Could not verify your identity. Please try again or contact admin.'
  }
})
</script>

<style scoped>
.auth-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f3;
}
.auth-card {
  background: #fff;
  border: 1px solid #e0ddd6;
  border-radius: 14px;
  padding: 44px 52px;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  min-width: 320px;
}
.auth-spinner {
  width: 44px;
  height: 44px;
  border: 3px solid #e6f1fb;
  border-top-color: #185FA5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 20px;
}
@keyframes spin { to { transform: rotate(360deg); } }
.auth-icon-error {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  background: #fcebeb;
  color: #a32d2d;
  margin: 0 auto 18px;
}
.auth-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}
.auth-sub {
  font-size: 13px;
  color: #888780;
  line-height: 1.6;
  max-width: 280px;
  margin: 0 auto;
}
</style>
