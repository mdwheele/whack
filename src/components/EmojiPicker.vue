<template>
  <div class="relative">
    <button @click="toggle" class="group p-1 rounded hover:bg-gray-100">
      <Icon name="emoji-happy" outline class="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
    </button>

    <div v-if="isOpen" class="absolute origin-bottom-right left-0 bottom-24">
      <div class="flex flex-col border border-gray-300 shadow-lg bg-white rounded-md overflow-hidden">
        <!-- Categories -->
        <div class="px-3 border-b border-gray-300 flex items-center space-x-2">
          <button class="pt-2 pb-1.5 px-0.5 border-b-[3px] border-green-800 text-gray-500">
            <Icon name="clock" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="emoji-happy" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="clock" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="clock" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="clock" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="clock" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="light-bulb" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="clock" outline class="w-6 h-6 shrink-0 " />
          </button>
          <button class="py-2 px-0.5 text-gray-400 hover:text-gray-500">
            <Icon name="flag" outline class="w-6 h-6 shrink-0 " />
          </button>
        </div>

        <div class="p-3">
          <div class="flex items-center border border-gray-400 rounded py-1 px-2 space-x-2 focus-within:ring-4 focus-within:border-blue-500 ring-blue-200">
            <Icon name="search" outline class="w-4 h-4 shrink-0 text-gray-500" />
            <input type="text" v-model="filter" class="w-full focus:outline-none placeholder:text-gray-500 text-gray-600" placeholder="Search" />
          </div>
        </div>

        <!-- Scrollable flex-1 area -->
        <div class="flex-auto h-0 overflow-y-auto min-h-[240px]">
          <div class="px-3">
            <template v-for="(emojis, category) in results" :key="category">
              <div v-show="emojis.length > 0">
                <h3 class="bg-white sticky top-0 pb-0.5 mb-2 font-bold text-sm">{{ category }}</h3>
                <div class="mb-3 -ml-1">
                  <button @click="select(emoji)" v-for="emoji in emojis" :key="emoji.emoji" class="rounded hover:bg-gray-200 pl-2 pr-3 py-0.5" v-tippy :content="`:${emoji.slug}:`">
                    {{ emoji.emoji }}
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Fixed "toolbar" -->
        <!-- <div class="bg-gray-100 h-16 border-t border-gray-300">
        </div> -->
      </div>
    </div>  
  </div>
</template>

<script>
import Icon from 'vue-heroicon-next'

import { ref } from 'vue'
import useEmoji from '@/composables/emoji'

export default {
  name: 'EmojiPicker',
  components: { Icon },

  setup(props, { emit }) {
    const isOpen = ref(false)
    const filter = ref('')
    const { results } = useEmoji(filter)

    return {
      isOpen,
      results,
      filter,
      toggle() {
        isOpen.value = !isOpen.value
      },
      select(emoji) {
        emit('selected', emoji)
        isOpen.value = false
      }
    }
  }
}
</script>