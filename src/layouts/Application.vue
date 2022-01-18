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
      <button class="relative w-7 h-7 bg-white rounded" v-tippy content="mdwheele">
        <div class="absolute -bottom-0.5 -right-0.5 rounded-full bg-green-600 w-2.5 h-2.5 p-1 ring-2 border border-slate-800 ring-slate-800" />
      </button>
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
    
    <!-- Chat / Messages / Main Content -->
    <div class="flex-1 flex flex-col bg-white">
      <div class="flex items-center justify-between px-4 h-12 border-y border-slate-200">
        <!-- Channel Settings / Modal -->
        <Modal>
          <template #trigger="{ open }" >
            <button @click="open" class="px-2 py-0.5 flex items-center space-x-1 rounded hover:bg-slate-50">
              <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
              <span class="font-bold text-lg leading-6">general</span>
              <Icon name="chevron-down" class="w-3 h-3 flex-shrink-0" />
            </button>
          </template>

          <template #default>
            <h1>Hello, World 2!</h1>
          </template>
        </Modal>

        <!-- Channel List /who --> 
        <button class="rounded py-1 px-2 border flex items-center space-x-2" v-tippy="{ placement: 'bottom-end' }" content="View all members of this channel">
          <!-- Avatar Placeholder -->
          <div class="w-4 h-4 rounded-full bg-slate-500" />
          <span class="text-sm text-slate-500">1</span>
        </button>
      </div>

      <div class="flex-auto h-0 overflow-y-auto">
        <!-- Channel Banner / Description -->
        <div class="px-6 py-12 flex items-start space-x-3">
          <div class="p-2 bg-slate-200 rounded">
            <Icon name="speakerphone" outline class="w-5 h-5 flex-shrink-0 text-gray-800" />
          </div>

          <div>
            <h3 class="mb-1 font-semibold text-gray-800">You're looking at the <span class="text-blue-800">#general</span> channel</h3>
            <p class="leading-5 text-gray-400">This is the one channel that will always include everyone. It's a great spot for announcements and team-wide conversations. <a href="#" class="text-blue-700 hover:underline">Edit description</a></p>
          </div>
        </div>  

        <!-- Messages -->
        <div v-for="i in 20" :key="i" class="py-2 px-6 flex items-start space-x-2 hover:bg-slate-50">
          <div class="bg-white rounded p-2">
            <div class="bg-blue-500 rounded-full w-4 h-4 p-1" />
          </div>

          <div>
            <div class="space-x-2">
              <span class="font-bold text-gray-800">mdwheele</span>
              <span class="text-gray-400 text-sm">12:05 AM</span>
            </div>

            <p class="text-gray-600">👋 &nbsp; Hi everyone!</p>
          </div>
        </div>
      </div>

      <div class="z-10 px-6 h-16">
        <!-- Chat Box -->
        <div class="-mt-2 flex flex-col">
          <div class="relative flex-1">
            <div @input="message = $event.target.innerText" contenteditable="true" class="bg-white py-2 px-3 w-full focus:outline-none absolute bottom-0 rounded-t-lg border border-b-0 border-gray-200 max-h-48 overflow-y-auto">{{ message }}</div>
          </div>

          <!-- Toolbar -->
          <div class="flex items-center justify-between h-12 bg-white rounded-b-lg border border-t-0 border-gray-200 py-2 px-3">
            <div class="space-x-2">
              <button class="group p-1 rounded hover:bg-gray-100">
                <Icon name="emoji-happy" class="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
              </button>
              <button class="group p-1 rounded hover:bg-gray-100">
                <Icon name="at-symbol" class="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
              </button>
            </div>

            <button>
              <Icon name="paper-airplane" class="w-5 h-5 rotate-90 flex-shrink-0 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Icon from 'vue-heroicon-next'
import Modal from '@/components/Common/Modal.vue'

export default {
  name: 'Application',
  components: { Icon, Modal },

  setup() {
    const message = ref('')

    return { message }
  }
}
</script>