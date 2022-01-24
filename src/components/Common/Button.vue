<template>
  <button :class="['flex items-center space-x-2 border rounded py-1.5 px-4 font-bold transition-all', colorClasses]">
    <Icon v-if="icon" :name="icon" :class="['w-5 h-5 flex-shrink-0', iconClasses]" />
    <slot/>
  </button>
</template>

<script>
import { computed } from 'vue'
import Icon from 'vue-heroicon-next'

export default {
  name: 'Button',

  components: { Icon },

  props: {
    color: {
      type: String,
      validator: val => ['green', 'white'].includes(val),
      default: 'white'
    },

    icon: {
      type: String,
      required: false
    },

    iconClasses: {
      type: String,
      required: false
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
