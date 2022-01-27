<template>
  <div>
    <div class="flex space-x-3 items-baseline">
      <label v-if="label" for="text-input-1" class="font-bold">{{ label }}</label>
      <p v-if="help" class="text-yellow-600 text-sm tracking-wide font-semibold">{{ help }}</p>
    </div>
    <div class="flex items-center space-x-2 border border-gray-400 rounded px-3 py-2 mt-2">
      <Icon v-if="icon" :name="icon" outline class="w-5 h-5 flex-shrink-0 text-gray-500" />
      <input 
        id="text-input-1" 
        type="text" 
        ref="channelNameRef" 
        class="focus:outline-none flex-1 text-lg text-gray-600" 
        :value="modelValue" 
        @input="$emit('update:modelValue', $event.target.value)" 
        :placeholder="placeholder" 
        :maxlength="maxLength"
      />
      <span v-if="maxLength" class="text-lg text-gray-400">{{ charactersLeft }}</span>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-heroicon-next'
import { computed } from 'vue'

export default {
  components: { Icon },

  props: {
    modelValue: {
      type: String,
      required: true
    },

    label: String,
    help: String,
    icon: String,
    placeholder: String,
    maxLength: String,
  },

  setup(props) {
    const charactersLeft = computed(() => {
      if (props.maxLength === undefined) {
        return 0
      }

      return Number(props.maxLength) - props.modelValue.length
    })  
    
    return {
      charactersLeft
    }
  }
}
</script>
