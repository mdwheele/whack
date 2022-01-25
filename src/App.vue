<template>
  <div class="flex flex-col h-screen">
    <component :is="layout" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Application from '@/layouts/Application.vue'
import Empty from '@/layouts/Empty.vue'
import Playground from '@/layouts/Playground.vue'

export default {
  name: 'App',
  components: { Application, Empty, Playground },

  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout || 'Application')

    return {
      layout
    }
  }
}
</script>
