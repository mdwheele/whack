<template>
  <button 
    :class="[
      'flex items-center justify-center space-x-2 border rounded font-bold transition-all', 
      full ? 'w-full' : '', 
      colorClasses,
      sizeClasses
    ]"
    :disabled="disabled"
    :aria-disabled="disabled"
  >
    <Icon v-if="icon" :name="icon" :class="['w-5 h-5 flex-shrink-0', iconClasses]" />
    <div>
      <slot/>
    </div>
    <Icon 
      v-if="loading" 
      name="refresh" 
      :class="loaderClasses" 
    />
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
      validator: val => ['green', 'white', 'purple'].includes(val),
      default: 'white'
    },

    size: {
      type: String,
      validator: val => ['base', 'lg'].includes(val),
      default: 'base'
    },

    icon: {
      type: String,
      required: false
    },

    iconClasses: {
      type: String,
      required: false
    },

    full: Boolean,

    disabled: Boolean,

    loading: Boolean,
  },

  setup(props) {
    const colorClasses = computed(() => {
      if (props.disabled) {
        return 'border-gray-200 bg-gray-200 text-gray-600 cursor-not-allowed'
      } 

      return {
        green: 'border-green-800 bg-green-800 hover:bg-green-700 active:bg-green-800 text-white',
        purple: 'border-purple-800 bg-purple-800 hover:bg-purple-700 active:bg-purple-800 text-white',
        white: 'border-gray-400 bg-white text-gray-700 hover:bg-gray-100 active:bg-white',
      }[props.color]
    })

    const sizeClasses = computed(() => {
      return {
        base: 'py-1.5 px-4 text-base',
        lg: 'py-2 text-lg text-semibold'
      }[props.size]
    })

    const loaderClasses = computed(() => {
      const classes = ['w-5 h-5 flex-shrink-0 animate-spin']

      if (!props.disabled) {
        classes.push(props.color === 'white' ? 'text-gray-400' : 'text-white')
      }

      return classes.join(' ')
    })

    return {
      colorClasses,
      sizeClasses,
      loaderClasses,
    }
  }
}
</script>
