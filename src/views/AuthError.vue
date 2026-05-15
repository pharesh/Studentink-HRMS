<template>
  <div class="auth-screen">
    <div class="auth-card">
      <div class="auth-icon-error">✕</div>
      <div class="auth-title">Session Expired</div>
      <div class="auth-sub">Your session has ended or you do not have access to this page. Please launch HRMS from the Studentink portal.</div>
      <a :href="mainAppUrl" class="btn btn-primary" style="margin-top:20px;text-decoration:none;display:inline-block">
        ← Back to Studentink
      </a>
    </div>
  </div>
</template>

<script setup>
const mainAppUrl = import.meta.env.VITE_MAIN_APP_URL || '/'
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
