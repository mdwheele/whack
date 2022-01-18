<template>
  <slot name="trigger" :open="open" :isOpen="isOpen" />

  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="fixed z-10 inset-0 overflow-y-auto" @close="close">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-800 bg-opacity-60 transition-opacity" />
        </TransitionChild>

        <div class="h-screen flex items-center justify-center">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <slot :close="close" :isOpen="isOpen" />
          </div>
        </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Icon from 'vue-heroicon-next'

export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Icon,
  },
  setup() {
    const isOpen = ref(false)

    function open() {
      isOpen.value = true
    }
    
    function close() {
      isOpen.value = false
    }

    return {
      isOpen,
      open,
      close
    }
  },
}
</script>