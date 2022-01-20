import { ref } from 'vue'
import axios from '../axios'

export function useAuthentication(url) {
  const user = ref(undefined)
  const token = ref(undefined)

  async function login(username, password) { 
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
  }

  async function isLoggedIn() {
    try {
      const response = await axios.get(`/api/me`, {}, {
        baseURL: url,
        withCredentials: true,
      })
  
      return response.status === 200
    } catch (error) {
      return false
    }
  }

  return {
    user,
    token,
    login,
    isLoggedIn
  }
}