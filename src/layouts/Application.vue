<template>
  <!-- "Header" / Possible Header Component -->
  <div class="flex items-center h-10 bg-slate-800">
    <div class="w-64 pr-5 flex justify-end">
      <button v-tippy content="History">
        <Icon name="clock" class="w-5 h-5 flex-shrink-0 text-slate-200" />
      </button>
    </div>
    <button class="flex-1 flex items-center justify-center space-x-2 text-slate-200 bg-slate-600 hover:bg-slate-500 rounded-md py-0.5">
      <Icon name="search" class="w-4 h-4 flex-shrink-0" />
      <span class="text-sm">Search Whack Chat</span>
    </button>
    <div class="w-64 pr-3 flex items-center justify-end">
      <Dropdown>
        <template #trigger>
          <div class="mt-1.5 relative rounded bg-white p-0.5" v-tippy content="mdwheele">
            <Identicon seed="mdwheele" class="w-6 h-6 rounded" />
            <div class="absolute -bottom-0.5 -right-0.5 rounded-full bg-green-600 w-2.5 h-2.5 p-1 ring-2 border border-slate-800 ring-slate-800" />
          </div>
        </template>

        <template #default>
        </template>
      </Dropdown>
    </div>
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
          <button class="inline-flex rounded-full p-1.5 bg-white" v-tippy content="New Message">
            <Icon name="pencil-alt" outline class="w-5 h-5 flex-shrink-0" />
          </button>
      </div>

      <!-- Possible Collapsible List Component Thing -->
      <div class="mt-3">
        <!-- ListHeader -->
        <div class="flex items-center justify-between text-slate-300 px-2.5 py-1">
          <div class="flex items-center space-x-1">
            <button class="p-1.5 rounded hover:bg-slate-600">
              <Icon name="chevron-down" class="w-4 h-4" />
            </button>
            <span>Channels</span>
          </div>

          <div>
            <!-- <Button icon="dots-vertical /> -->
            <button class="p-1.5 rounded hover:bg-slate-600" v-tippy content="Section Options">
              <Icon name="dots-vertical" class="w-4 h-4" />
            </button>
            <button class="p-1.5 rounded hover:bg-slate-600" v-tippy content="Add Channels"> 
              <Icon name="plus" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <!-- ListItem (Active Channel) -->
          <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300', 'bg-sky-700']">
            <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate">general</span>
          </button>

          <!-- ListItem (Inactive Channel) -->
          <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
            <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate">random</span>
          </button>

          <!-- ListItem (Inactive Channel) -->
          <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
            <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate">really-long-channel-name-to-test-padding</span>
          </button>

          <!-- ListItem (Inactive Channel) -->
          <button :class="['w-full py-1 pl-7 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
            <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate">whack-dev</span>
          </button>

          <!-- ListItem (Add Channels Button) -->
          <button :class="['w-full py-1 pl-6 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
            <div class="bg-slate-600 p-0.5 rounded">
              <Icon name="plus-sm" class="w-4 h-4 flex-shrink-0" />
            </div>
            <span class="truncate">Add Channels</span>
          </button>
        </div>
      </div>
    </div>
    
    <router-view />
  </div>
</template>

<script>
import { ref } from 'vue'
import Icon from 'vue-heroicon-next'
import Dropdown from '@/components/Common/Dropdown.vue'
import Identicon from 'vue-identicon'

export default {
  name: 'Application',
  components: { Icon, Identicon, Dropdown }
}
</script>