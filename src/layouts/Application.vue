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
      <Menu>
        <template #trigger>
          <div class="mt-1.5 relative rounded bg-white p-0.5" v-tippy content="mdwheele">
            <Identicon seed="mdwheele" class="w-6 h-6 rounded" />
            <div class="absolute -bottom-0.5 -right-0.5 rounded-full bg-green-600 w-2.5 h-2.5 p-1 ring-2 border border-slate-800 ring-slate-800" />
          </div>
        </template>

        <template #header>  
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
        </template>

        <template #default>
          <MenuItem>Sign out</MenuItem>
        </template>
      </Menu>
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

      <!-- Sidebar Items -->
      <div class="mt-3">
        <AppLink :to="{ name: 'channel.browser' }" class="w-full py-1 pl-7 pr-4 flex items-center space-x-2" active-class="text-white bg-sky-700" inactive-class="text-slate-300 hover:bg-slate-800">
          <div class="relative">
            <Icon name="search" class="w-4 h-4 flex-shrink-0" />
          </div>
          <span class="truncate">Channel browser</span>
        </AppLink>
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
            <Menu>
              <template #trigger>
                <button class="p-1.5 rounded hover:bg-slate-600" v-tippy content="Add Channels"> 
                  <Icon name="plus" class="w-4 h-4" />
                </button>
              </template>

              <template #default>
                <AppLink :to="{ name: 'channel.browser' }">
                  <MenuItem>Browse channels</MenuItem>
                </AppLink>
                
                <!-- Create a channel -->
                <MenuItem @click.prevent="form.modal = true">Create a channel</MenuItem>
              </template>
            </Menu>
          </div>
        </div>

        <div>
          <!-- ListItem (Active Channel) -->
          <AppLink 
            v-for="channel in joinedChannels" :key="channel.id"
            :to="{ name: 'channels.show', params: { id: channel.id }}" 
            class="w-full py-1 pl-7 pr-4 flex items-center space-x-2" 
            active-class="text-white bg-sky-700"
            inactive-class="text-slate-300 hover:bg-slate-800"
          >
            <Icon name="hashtag" class="w-4 h-4 flex-shrink-0" />
            <span class="truncate">{{ channel.name }}</span>
          </AppLink>

          <!-- ListItem (Add Channels Button) -->
          <button @click="form.modal = true" :class="['w-full py-1 pl-6 pr-4 flex items-center space-x-2 text-slate-300 hover:bg-slate-800']">
            <div class="bg-slate-600 p-0.5 rounded">
              <Icon name="plus-sm" class="w-4 h-4 flex-shrink-0" />
            </div>
            <span class="truncate">Add Channels</span>
          </button>
        </div>
      </div>
    </div>

    <Modal v-model="form.modal" :initialFocus="channelNameRef">
      <template #default="{ close }">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-800">Create a channel</h2>
          <button @click.prevent="close" class="hover:bg-gray-100 text-gray-600 p-2 rounded">
            <Icon name="x" class="w-5 h-5 flex-shrink-0" />
          </button>
        </div>

        <div class="my-8">
          <p class="text-gray-400">Channels are where your team communicates. They're best when organized around a topic — #marketing, for example</p>
        </div>

        <TextInput v-model="form.name" icon="hashtag" label="Name" help="Remember! Keep it interesting." placeholder="e.g. whack-dev" max-length="80" />

        <div class="mt-8 flex justify-end">
          <Button @click="createChannel" color="green" :disabled="form.name.length === 0">Create</Button>
        </div>
      </template>
    </Modal>
    
    <router-view />
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useChannels } from '@/composables/channels'
import Button from '@/components/Common/Button.vue'
import Modal from '@/components/Common/Modal.vue'
import Menu from '@/components/Common/Menu.vue'
import MenuItem from '@/components/Common/MenuItem.vue'
import Icon from 'vue-heroicon-next'
import Identicon from 'vue-identicon'
import AppLink from '@/components/Common/AppLink.vue'
import TextInput from '@/components/Common/Form/TextInput.vue'

export default {
  name: 'Application',
  components: { Button, Icon, Identicon, Menu, MenuItem, Modal, AppLink, TextInput },

  setup() {
    const router = useRouter()
    const { joinedChannels, create, join } = useChannels()

    const form = reactive({
      modal: false,
      name: ''
    })

    const channelNameRef = ref(null)

    async function createChannel() {
      const channel = await create(form.name)
      await join(channel.id)

      form.modal = false

      router.push({ name: 'channels.show', params: { id: channel.id } })
    }

    return {
      joinedChannels,
      createChannel,
      form,
      channelNameRef,
    }
  }
}
</script>