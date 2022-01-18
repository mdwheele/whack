<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton>
        <slot name="trigger" />
      </MenuButton>
    </div>

    <transition 
      enter-active-class="transition ease-out duration-100" 
      enter-from-class="transform opacity-0 scale-95" 
      enter-to-class="transform opacity-100 scale-100" 
      leave-active-class="transition ease-in duration-75" 
      leave-from-class="transform opacity-100 scale-100" 
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="origin-top-right absolute -right-1 mt-1 w-56 rounded-md shadow-lg bg-gray-100 border border-gray-200 ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
        <div class="px-6 py-4">
          <div class="flex items-start space-x-4">
            <div class="relative w-7 h-7 bg-white rounded" />

            <div>
              <div class="font-extrabold text-sm">mdwheele</div>
              <div class="flex items-center space-x-1">
                <div class="w-2.5 h-2.5 bg-green-700 rounded-full" />
                <span class="text-xs text-gray-500">Active</span>
              </div>
            </div>
          </div>
        </div>
        <div class="py-2">
          <form method="POST" action="#">
            <MenuItem v-slot="{ active }">
              <button :class="[active ? 'bg-blue-600 text-white' : 'text-gray-700', 'block w-full text-left px-4 py-1 text-sm']">
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Icon from 'vue-heroicon-next'

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Icon,
  },
}
</script>