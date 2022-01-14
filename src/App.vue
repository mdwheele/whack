<template>
  <div class="flex flex-col h-screen">
    <component :is="layout" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

import Application from '@/layouts/Application.vue'
import Empty from '@/layouts/Empty.vue'
import Playground from '@/layouts/Playground.vue'

export default {
  name: 'App',
  components: { Application, Empty, Playground },

  setup() {
    const layout = ref('Application')

    return {
      layout
    }
  }
}
</script>
