<template>
  <HeadlessMenuItem v-slot="{ active }">
    <button :class="[active ? 'bg-blue-600 text-white' : 'text-gray-700', 'block w-full text-left px-6 py-1']">
      <slot />
    </button>
  </HeadlessMenuItem>
</template>

<script>
import { MenuItem as HeadlessMenuItem } from '@headlessui/vue'

export default {
  name: 'MenuItem',
  components: { HeadlessMenuItem }
}
</script>