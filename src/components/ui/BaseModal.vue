<template>
  <Teleport to="body">
    <div
      class="modal-overlay"
      :class="{ open: modalStore.isOpen(modalId) }"
      @click.self="modalStore.closeModal()"
      @keydown.esc="modalStore.closeModal()"
    >
      <div class="modal" :class="modalClass" role="dialog" :aria-label="title">
        <div class="modal-title">
          <span>{{ title }}</span>
          <button class="close-x" @click="modalStore.closeModal()" aria-label="Close">✕</button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useModalStore } from '@/stores/useModalStore'

const props = defineProps({
  modalId:   { type: String, required: true },
  title:     { type: String, required: true },
  modalClass: { type: String, default: '' },
})

const modalStore = useModalStore()

function onKeydown(e) {
  if (e.key === 'Escape' && modalStore.isOpen(props.modalId)) {
    modalStore.closeModal()
  }
}
onMounted(()  => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))
</script>
