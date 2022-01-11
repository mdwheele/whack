import { ref } from 'vue'
import axios from '../axios'

export function useAuthentication(url) {
  const user = ref(undefined)
  const token = ref(undefined)

  async function login(username, password) { 
    const response = await axios.post(`${url}/api/login`, {}, {
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

  return {
    user,
    token,
    login
  }
}