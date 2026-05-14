import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const activeModal = ref(null)

  function openModal(id) {
    activeModal.value = id
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    activeModal.value = null
    document.body.style.overflow = ''
  }

  function isOpen(id) {
    return activeModal.value === id
  }

  return { activeModal, openModal, closeModal, isOpen }
})
