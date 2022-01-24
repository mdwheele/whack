<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="max-w-sm">
      <div class="text-center">
        <h1 class="mb-1 text-4xl font-bold">Sign into Whack</h1>
        <p class="text-lg text-gray-500">We suggest using whatever username you want.</p>
      </div>

      <form class="mt-8 space-y-4" @submit.prevent="showPasswordModal = true">
        <input type="text" v-model="username" placeholder="Username" class="border border-gray-400 px-3 py-2 text-gray-800 w-full rounded text-lg" />
        <Button @click="authenticate" full color="purple" size="lg" :disabled="username.length === 0">Sign In</Button>
        <div class="flex items-start space-x-2 bg-gray-100 rounded px-3 py-2">
          <Icon name="sparkles" outline class="mt-1 text-gray-400 w-5 h-5 flex-shrink-0" />
          <p class="text-gray-400 text-sm">Prepare your hearts and minds for the greatest, bestest chat experience you've ever lived through.</p>
        </div>
      </form>

      <Modal v-model="showPasswordModal">
        <div class="flex flex-col items-center">
          <div class="text-center">
            <h2 class="mb-2 text-4xl font-bold">Draw Your Password!</h2>
            <p class="text-lg text-gray-500">You read that correctly. Draw a damn doodle and remember it. You'll need it next time you use Whack.</p>
          </div>

          <div class="mt-4 space-y-4">
            <DoodlePassword @finish="e => { canLogin = true; password = e; }" />
            <Button @click="authenticate" full color="purple" size="lg" :disabled="!canLogin">Sign In</Button>

            <button 
              @click="authenticate" 
              :disabled="!canLogin"
              :aria-disabled="!canLogin"
              class="w-full text-white text-center py-2 rounded text-lg text-semibold"
              :class="[
                canLogin ? 'bg-purple-900 hover:bg-purple-800' : 'bg-gray-300 cursor-not-allowed'
              ]"
            >
              Sign In
            </button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthentication } from '@/composables/auth'
import DoodlePassword from '@/components/DoodlePassword.vue'
import Modal from '@/components/Common/Modal.vue'
import Button from '@/components/Common/Button.vue'
import Icon from 'vue-heroicon-next'

export default {
  name: 'Login',

  components: { Button, DoodlePassword, Icon, Modal },

  setup() {
    const router = useRouter()
    const { login, token } = useAuthentication()
    const username = ref('')
    const password = ref('')
    const showPasswordModal = ref(false)
    const canLogin = ref(false)

    async function authenticate() {
      try {
        await login(username.value, password.value)
      } catch (error) {
        console.error(error.response.data.message)
      }

      if (token.value) {
        router.push({ name: 'channels.show', params: { id: 'eZdpQS3pckL' } })
      }
    }

    return {
      username,
      password,
      authenticate,
      showPasswordModal,
      canLogin
    }
  }
}
</script>
