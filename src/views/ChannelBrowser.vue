<template>
  <div class="flex-1 flex flex-col bg-white">
    <div class="flex items-center justify-between px-4 h-12 border-y border-slate-200">
      <h2 class="font-bold text-lg leading-6">Channel browser</h2>
    
      <!-- Create Channel Button --> 
      <button class="rounded py-1.5 px-3 border border-gray-300 hover:bg-gray-100 flex items-center space-x-2 text-xs font-semibold transition-all duration-200" v-tippy="{ placement: 'bottom-end' }" content="View all members of this channel">
        Create Channel
      </button>
    </div>

    <div class="p-5 pb-1 border-b border-gray-300">
      <!-- Possible <TextInput icon="search" placeholder="..." /> -->
      <div class="flex items-center space-x-2 py-1.5 px-2 border border-gray-300 rounded focus-within:ring-4 ring-blue-200 focus-within:border-blue-700" >
        <Icon name="search" outline class="w-4 h-4 text-gray-600 flex-shrink-0" />
        <input v-model="searchTerm" class="flex-1 focus:outline-none placeholder-gray-500" type="text" placeholder="Search by channel name or description" />
      </div>

      <div class="mt-8 flex justify-between">
        <span class="text-sm text-gray-800">4 recommended results</span>
      </div>
    </div>

    <!-- Channel List -->
    <div class="flex-auto h-0 overflow-y-auto">
      <!-- Channels -->
      <div class="divide-y divide-gray-300">
        <AppLink 
          v-for="channel in results" :key="channel.item.id" 
          :to="{ name: 'channels.show', params: { id: channel.item.id }}"
          class="block group relative py-4 px-6 hover:bg-slate-50"
        >
          <h3 class="font-bold text-gray-800 text-sm">#{{ channel.item.name }}</h3>
          <div class="flex items-center space-x-2 text-gray-500 text-sm">
            <div class="flex items-center space-x-1 text-green-800">
              <Icon name="check" outline class="w-3 h-3 flex-shrink-0" />
              <span>Joined</span>
            </div>
            <span class="text-xs">&#x2E31;</span>
            <span>1 member</span>
          </div>

          <!-- Quick Actions -->
          <div class="hidden group-hover:block absolute right-4 top-4 pt-0.5">
            <button class="rounded border border-gray-300 bg-white hover:bg-gray-100 py-1 px-5 text-gray-900 hover:shadow-sm">
              Leave
            </button>
          </div>
        </AppLink>
      </div>

      <div class="my-12 flex justify-center">
        <button class="rounded border border-gray-300 bg-green-800 hover:bg-green-700 py-2 px-3 text-white text-sm tracking-wide hover:shadow-sm">Create Channel</button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-heroicon-next'
import { useChannels } from '@/composables/channels'
import { useFuse } from '@vueuse/integrations/useFuse'

import { ref, onMounted } from 'vue'

export default {
  name: 'ChannelBrowser',
  components: { Icon },

  setup() {
    const searchTerm = ref('')
    const channels = ref([])
    const { listAll } = useChannels()

    onMounted(async () => {
      channels.value = await listAll()
    })

    const { results } = useFuse(searchTerm, channels, { 
      matchAllWhenSearchEmpty: true,
      fuseOptions: { keys: ['name'] }
    })

    return {
      searchTerm,
      results
    }
  }
}
</script>
