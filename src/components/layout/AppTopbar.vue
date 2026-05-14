<template>
  <div class="topbar">
    <div class="topbar-left">
      <button class="hamburger" @click="appStore.toggleSidebar()" aria-label="Toggle menu">☰</button>
      <div class="page-title">{{ appStore.pageTitle }}</div>
    </div>
    <div class="topbar-right">
      <span class="topbar-badge">{{ appStore.modeLabel }}</span>
      <div class="avatar-sm">NS</div>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/useAppStore'
const appStore = useAppStore()
</script>
