import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Accept':       'application/json',
    'Content-Type': 'application/json',
  },
})

// Attach Bearer token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 401 → attempt silent re-auth using stored SSO creds, then retry once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const creds = JSON.parse(localStorage.getItem('sso_creds') || 'null')
        if (creds) {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/verify-token`,
            creds
          )
          localStorage.setItem('auth_token', data.token)
          original.headers.Authorization = `Bearer ${data.token}`
          return api(original)
        }
      } catch (_) {
        // silent re-auth failed — fall through to clear session
      }
      // Clear session and show error page
      ;['auth_token', 'is_logged_in', 'user', 'sso_creds', 'academy_id'].forEach(k =>
        localStorage.removeItem(k)
      )
      window.location.hash = '#/auth/error'
    }
    return Promise.reject(error)
  }
)

export default api
