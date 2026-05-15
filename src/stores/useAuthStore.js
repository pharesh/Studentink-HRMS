import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

const TOKEN_KEY = 'auth_token'
const USER_KEY  = 'user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || null)
  const user  = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))

  const isLoggedIn = computed(() => !!token.value)

  const userName = computed(() =>
    user.value?.name || user.value?.username || user.value?.ContactNumber || ''
  )

  const userAvatar = computed(() => {
    const n = userName.value
    return n ? n.slice(0, 2).toUpperCase() : 'HR'
  })

  const academyId = computed(() =>
    localStorage.getItem('academy_id') || ''
  )

  // Matches the existing /verify-token API contract:
  // POST { user_id, mobile, academy_hash } → { token, user, academyId? }
  async function ssoLogin(userId, username, academy) {
    const { data } = await api.post('/verify-token', {
      user_id:      userId,
      mobile:       username,
      academy_hash: academy,
    })

    token.value = data.token
    user.value  = data.user

    localStorage.setItem(TOKEN_KEY, data.token)
    localStorage.setItem('is_logged_in', 'true')
    localStorage.setItem(USER_KEY, JSON.stringify(data.user))

    // Persist SSO creds for silent re-auth on 401
    localStorage.setItem('sso_creds', JSON.stringify({
      user_id:      userId,
      mobile:       username,
      academy_hash: academy,
    }))

    // Persist academy id so sub-components can read it
    const aid = data.user?.academyId || data.user?.academy_id || data.academyId || data.academy_id
    if (aid) {
      sessionStorage.setItem('academy_id', String(aid))
      localStorage.setItem('academy_id', String(aid))
    }

    return data
  }

  function logout() {
    token.value = null
    user.value  = null
    ;['auth_token', 'is_logged_in', 'user', 'sso_creds', 'academy_id'].forEach(k =>
      localStorage.removeItem(k)
    )
    sessionStorage.removeItem('academy_id')
  }

  return { token, user, isLoggedIn, userName, userAvatar, academyId, ssoLogin, logout }
})
