<template>
  <button :class="['border rounded py-1.5 px-4 font-bold transition-all', colorClasses]">
    <slot/>
  </button>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Button',

  props: {
    color: {
      type: String,
      validator: val => ['green', 'white'].includes(val),
      default: 'white'
    },

    disabled: Boolean
  },

  setup(props) {
    const colorClasses = computed(() => {
      if (props.disabled) {
        return 'border-gray-200 bg-gray-200 text-gray-600 '
      } 

      return {
        green: 'border-green-800 bg-green-800 text-white',
        white: 'border-gray-400 bg-white text-gray-800'
      }[props.color]
    })

    return {
      colorClasses
    }
  }
}
</script>
