<template>
  <div class="flex-1 flex items-center justify-center bg-gray-200">
    <div class="bg-white rounded-lg p-3 w-1/2">
      <input type="text" v-model="username" class="border border-black p-2 text-gray-800" />
      <div class="flex">
        <DoodlePassword @finish="password = $event" />
      </div>
      <button @click="authenticate">Login using {{ username }}</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthentication } from '@/composables/auth'
import { useRouter } from 'vue-router'
import DoodlePassword from '@/components/DoodlePassword.vue'

export default {
  name: 'Login',

  components: { DoodlePassword },

  setup() {
    const router = useRouter()
    const { login, token } = useAuthentication()
    const username = ref('')
    const password = ref('')

    async function authenticate() {
      await login(username.value, password.value)

      if (token.value) {
        router.push({ name: 'channels.show', params: { id: 'eZdpQS3pckL' } })
      }
    }

    return {
      username,
      password,
      authenticate
    }
  }
}
</script>
