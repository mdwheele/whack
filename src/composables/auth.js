import { ref } from 'vue'
import axios from '../axios'

export function useAuthentication(url) {
  const user = ref(undefined)
  const token = ref(undefined)
  const loading = ref(false)

  async function login(username, password) { 
    loading.value = true

    try {
      const response = await axios.post(`/api/login`, {}, {
        baseURL: url,
        auth: {
          username,
          password
        },
        withCredentials: true,
      })
  
      token.value = response.data.token
  
      user.value = {
        username,
        password
      }
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }    
  }

  async function isLoggedIn() {
    try {
      loading.value = true

      const response = await axios.get(`/api/me`, {}, {
        baseURL: url,
        withCredentials: true,
      })
  
      return response.status === 200
    } catch (error) {
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    login,
    isLoggedIn
  }
}