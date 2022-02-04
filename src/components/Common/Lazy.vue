<template>
  <div ref="el">
    <slot v-if="shouldRender" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export default {
  setup() {
    const shouldRender = ref(false)
    const el = ref()

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        shouldRender.value = true
        stop()
      }
    })

    return { el, shouldRender }
  }
}
</script>