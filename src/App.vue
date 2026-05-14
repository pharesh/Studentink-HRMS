<template>
  <div class="app">
    <AppSidebar />
    <div class="main">
      <AppTopbar />
      <div class="content">
        <RouterView />
      </div>
    </div>
    <ModalContainer />
  </div>
</template>

<script setup>
import AppSidebar    from '@/components/layout/AppSidebar.vue'
import AppTopbar     from '@/components/layout/AppTopbar.vue'
import ModalContainer from '@/components/modals/ModalContainer.vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/useAppStore'
import { watch } from 'vue'

const route    = useRoute()
const appStore = useAppStore()

// Keep mode in sync when user navigates directly via URL
watch(() => route.name, (name) => {
  if (!name) return
  if (name.startsWith('nests'))   appStore.setMode('nests')
  else if (name.startsWith('ess'))     appStore.setMode('ess')
  else if (name.startsWith('payroll')) appStore.setMode('payroll')
  else appStore.setMode('hrms')
}, { immediate: true })
</script>
