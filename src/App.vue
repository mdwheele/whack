<template>
  <div class="flex flex-col h-screen">
    <!-- "Header" / Possible Header Component -->
    <div class="h-10 bg-slate-800">
    </div>

    <div class="flex-1 flex">
      <!-- Channel Browser / Sidebar -->
      <div class="w-64 flex flex-col bg-slate-700">

        <div class="flex items-center justify-between px-4 h-12 border-y border-slate-500">
            <!-- InstanceSettingsButton -->
            <!--   <Button icon="chevron-down" text-size="lg">Whack Chat</Button> -->
            <button class="flex items-center space-x-1 text-white">
              <span class="font-semibold text-lg">Whack Chat</span>
              <Icon name="chevron-down" class="w-3 h-3 flex-shrink-0 " />
            </button>

            <!-- ComposeMessageButton -->
            <div class="inline-flex rounded-full p-1.5 bg-white">
              <Icon name="pencil-alt" outline class="w-5 h-5 flex-shrink-0" />
            </div>
        </div>

        <!-- Possible Collapsible List Component Thing -->
        <div class="mt-3">
          <!-- ListHeader -->
          <div class="flex items-center justify-between text-slate-300 px-2.5 py-1">
            <div class="flex items-center space-x-1">
              <button class="p-1.5 rounded hover:bg-slate-600">
                <Icon name="chevron-down" class="w-4 h-4" />
              </button>
              <span class="text-sm">Channels</span>
            </div>

            <div>
              <!-- <Button icon="dots-vertical /> -->
              <button class="p-1.5 rounded hover:bg-slate-600">
                <Icon name="dots-vertical" class="w-4 h-4" />
              </button>
              <button class="p-1.5 rounded hover:bg-slate-600">
                <Icon name="plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <!-- ListItem (Active Channel) -->
            <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300', 'bg-sky-700']">
              <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
              <span class="text-sm truncate">general</span>
            </button>

            <!-- ListItem (Active Channel) -->
            <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
              <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
              <span class="text-sm truncate">random</span>
            </button>

            <!-- ListItem (Active Channel) -->
            <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
              <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
              <span class="text-sm truncate">really-long-channel-name-to-test-padding</span>
            </button>

            <!-- ListItem (Active Channel) -->
            <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
              <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
              <span class="text-sm truncate">whack-dev</span>
            </button>

          </div>
        </div>

      </div>
      
      <!-- Chat / Messages / Main Content -->
      <div class="flex-1 flex flex-col bg-white">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Icon from 'vue-heroicon-next'

export default {
  name: 'App',
  components: { Icon },

  setup() {
    const layout = ref('Application')

    return {
      layout
    }
  }
}
</script>
