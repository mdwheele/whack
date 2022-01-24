<template>
  <!-- Chat / Messages / Main Content -->
  <div class="flex-1 flex flex-col bg-white" v-if="channel">
    <div class="flex items-center justify-between px-4 h-12 border-y border-slate-200">
      <!-- Channel Settings / Modal -->
      <Modal>
        <template #trigger="{ open }" >
          <button @click="open" class="px-2 py-0.5 flex items-center space-x-1 rounded hover:bg-slate-50">
            <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
            <span class="font-bold text-lg leading-6">{{ channel.name }}</span>
            <Icon name="chevron-down" class="w-3 h-3 flex-shrink-0" />
          </button>
        </template>

        <template #default="{ close }">
          <div class="flex flex-col">
            <div class="flex items-center justify-between">
              <h2 class="flex items-center space-x-1">
                <Icon name="hashtag" class="mt-0.5 w-5 h-5 flex-shrink-0" />
                <span class="text-xl font-bold text-gray-800">{{ channel.name }}</span>
              </h2>
              <button @click="close">
                <Icon name="x" outline class="w-5 h-5 text-gray-500 flex-shrink-0" />
              </button>
            </div>

            <div class="mt-4 border-b -mx-6 px-6">
              <nav>
                <ul class="-mb-px flex items-center text-sm text-gray-600 space-x-6 cursor-pointer">
                  <li class="py-1 border-b-2 border-blue-700 font-semibold text-gray-900">About</li>
                  <li class="py-1 hover:text-gray-900 border-b-2 border-transparent">Members</li>
                </ul>
              </nav>
            </div>

            <div class="-mx-6 -mb-6 py-4 px-6 bg-gray-100 space-y-4">
              <div class="flex items-start justify-between p-4 bg-white text-sm border rounded-xl">
                <div>
                  <h3 class="font-semibold text-gray-800">Channel name</h3>
                  <p class="text-gray-600"># {{ channel.name }}</p>
                </div>
                
                <button class="text-blue-800 hover:underline">Edit</button>
              </div>
              
              <div class="flex items-start justify-between p-4 bg-white text-sm border rounded-xl">
                <div>
                  <h3 class="font-semibold text-gray-800">A bunch of text!</h3>
                  <p class="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum neque quisquam sit? Magni, voluptates totam iste ipsa placeat quia molestiae vel sequi, esse, consequuntur modi quas excepturi blanditiis nobis delectus repellat aperiam facilis! Repellendus in unde saepe accusantium laboriosam dignissimos dolor, facilis error non itaque iusto aspernatur modi magni voluptatibus.</p>
                </div>
                
                <button class="text-blue-800 hover:underline">Edit</button>
              </div>
            </div>
          </div>
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
          <h3 class="mb-1 font-semibold text-gray-800">You're looking at the <span class="text-blue-800">#{{ channel.name }}</span> channel</h3>
          <p class="leading-5 text-gray-400">This is the one channel that will always include everyone. It's a great spot for announcements and team-wide conversations. <a href="#" class="text-blue-700 hover:underline">Edit description</a></p>
        </div>
      </div>  

      <!-- Messages -->
      <div v-for="message in messages" :key="message.id" class="py-2 px-6 flex items-start space-x-2 hover:bg-slate-50">
        <div class="bg-white rounded p-2">
          <div class="bg-blue-500 rounded-full w-4 h-4 p-1" />
        </div>

        <div>
          <div class="space-x-2">
            <span class="font-bold text-gray-800">{{ message.author.username }}</span>
            <span class="text-gray-400 text-sm">{{ formatTimeString(message.created_at) }}</span>
          </div>

          <p class="text-gray-600">{{ message.body }}</p>
        </div>
      </div>
    </div>

    <div class="z-10 px-6 h-16" v-if="isMemberOfChannel">
      <!-- Chat Box -->
      <div class="-mt-2 flex flex-col">
        <div class="relative flex-1">
          <div @input="form.message = $event.target.innerText" contenteditable="true" class="bg-white py-2 px-3 w-full focus:outline-none absolute bottom-0 rounded-t-lg border border-b-0 border-gray-200 max-h-48 overflow-y-auto">{{ form.message }}</div>
        </div>

        <!-- Toolbar -->
        <div class="flex items-center justify-between h-12 bg-white rounded-b-lg border border-t-0 border-gray-200 p-2">
          <div class="space-x-2">
            <button class="group p-1 rounded hover:bg-gray-100">
              <Icon name="emoji-happy" outline class="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
            </button>
            <button class="group p-1 rounded hover:bg-gray-100">
              <Icon name="at-symbol" class="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
            </button>
          </div>

          <Button @click="sendCurrentMessage" icon="paper-airplane" icon-classes="rotate-90" color="green" :disabled="form.message.length === 0" />
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center bg-gray-100 py-6 space-y-4" >
      <p class="text-lg text-gray-800">You are viewing #{{ channel.name }}</p>
      <div>
        <button @click="join(channel.id)" class="rounded border border-gray-300 bg-green-800 hover:bg-green-700 py-2 px-3 text-white text-sm tracking-wide hover:shadow-sm">Join Channel</button>
      </div>
      <AppLink :to="{ name: 'channel.browser' }" class="underline text-gray-600">Back to Channel browser</AppLink>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watchEffect, onMounted } from 'vue'
import { useChannels } from '@/composables/channels'
import { useMessages } from '@/composables/messages'
import { useRoute } from 'vue-router'

import Icon from 'vue-heroicon-next'
import Modal from '@/components/Common/Modal.vue'
import Button from '@/components/Common/Button.vue'

export default {
  name: 'Channel',

  components: { Button, Icon, Modal },

  setup() {
    const { findById, joinedChannels, join } = useChannels()
    const { send } = useMessages()
    const route = useRoute()

    const channel = ref(null)
    const messages = ref([])

    const form = reactive({
      message: ''
    })

    const isMemberOfChannel = computed(() => {
      return joinedChannels.value.some(joinedChannel => channel.value.id === joinedChannel.id)
    })

    watchEffect(async () => {
      if (route.params.id) {
        channel.value = await findById(route.params.id)
        messages.value = []
      }
    })

    async function sendCurrentMessage() {
      const message = await send(channel.value.id, form.message)

      message.body = window.atob(message.body)

      messages.value.push(message)

      form.message = ''
    }

    return { 
      form, 
      isMemberOfChannel,
      channel,
      join,
      sendCurrentMessage,
      messages,
      formatTimeString: date => (new Date(date)).toLocaleTimeString()
    }
  }
}
</script>