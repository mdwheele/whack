<template>
  <div class="flex flex-col h-screen items-center justify-center">
    <DoodlePassword @finish="e => dataUrl = e" />

    <pre class="bg-gray-50 text-gray-800 p-2 border break-words">{{ dataUrl }}</pre>

    <img :src="dataUrl" />
  </div>
</template>

<script>
import DoodlePassword from './components/DoodlePassword.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'App',
  components: { DoodlePassword },

  setup() {
    const dataUrl = ref(null)

    return {
      dataUrl
    }
  }
}
</script>
