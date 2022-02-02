<template>
  <div class="relative">
    <button @click="toggle" class="group p-1 rounded hover:bg-gray-100">
      <Icon name="emoji-happy" outline class="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
    </button>

    <div class="absolute origin-bottom-right left-0 bottom-24">
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
            <input type="text" class="w-full focus:outline-none placeholder:text-gray-500 text-gray-600" placeholder="Search" />
          </div>
        </div>

        <!-- Scrollable flex-1 area -->
        <div class="flex-auto h-0 overflow-y-auto min-h-[240px]">
          <div class="px-3">
            <h3 class="bg-white sticky top-0 pb-0.5 mb-2 font-bold text-sm">Frequently Used</h3>
            <div class="mb-3 -ml-1">
              <button v-for="i in 5" :key="i" class="rounded hover:bg-gray-200 px-1 py-0.5">
                <Icon name="heart" class="w-7 h-7 shrink-0 text-red-700" />
              </button>
            </div>

            <h3 class="bg-white sticky top-0 pb-0.5 mb-2 font-bold text-sm">Getting Work Done</h3>
            <div class="mb-3 -ml-1">
              <button v-for="i in 95" :key="i" class="rounded hover:bg-gray-200 px-1 py-0.5">
                <Icon name="beaker" outline class="w-7 h-7 shrink-0 text-blue-500" />
              </button>
            </div>

            <h3 class="bg-white sticky top-0 pb-0.5 mb-2 font-bold text-sm">Smileys & People</h3>
            <div class="mb-3 -ml-1">
              <button v-for="i in 48" :key="i" class="rounded hover:bg-gray-200 px-1 py-0.5">
                <Icon name="emoji-happy" outline class="w-7 h-7 shrink-0 text-yellow-500" />
              </button>
            </div>
          </div>
        </div>

        <!-- Fixed "toolbar" -->
        <div class="bg-gray-100 h-16 border-t border-gray-300">
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import Icon from 'vue-heroicon-next'

export default {
  name: 'EmojiPicker',
  components: { Icon }
}
</script>