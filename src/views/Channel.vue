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

    <div ref="chatWindow" class="flex-auto h-0 overflow-y-auto">
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
      <div v-for="(message, index) in messages" :key="message.id" class="py-2 px-6 flex items-start space-x-4 hover:bg-slate-50" :data-recent-message="index >= messages.length - 5">
        <Identicon :seed="message.author.username" theme="retro" class="mt-1 w-10 h-10 rounded" />

        <div class="flex-1">
          <div class="space-x-2">
            <span class="font-bold text-gray-800">{{ message.author.username }}</span>
            <span class="text-gray-400 text-sm">{{ formatTimeString(message.created_at) }}</span>
          </div>

          <div class="prose max-w-none" v-html="markdown(message.body)" />
        </div>
      </div>
    </div>
  
    <div class="px-6 h-32" v-if="isMemberOfChannel">
      <!-- Chat Box -->
      <div>
        <textarea @keydown.enter.exact="sendCurrentMessage" v-model="form.message" class="resize-none bg-white py-2 px-3 w-full focus:outline-none rounded-t-lg border border-b-0 border-gray-200"></textarea>

        <!-- Toolbar -->
        <div class="-mt-1.5 flex items-center justify-between h-12 bg-white rounded-b-lg border border-t-0 border-gray-200 p-2">
          <div class="flex items-center space-x-2">
            <EmojiPicker @selected="insertAtCursor($event.emoji)" />
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
import { ref, reactive, computed, watchEffect, nextTick } from 'vue'
import { useChannels } from '@/composables/channels'
import { useMessages } from '@/composables/messages'
import { useSockets, Events } from '@/composables/sockets'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'

import Icon from 'vue-heroicon-next'
import Identicon from 'vue-identicon'
import Modal from '@/components/Common/Modal.vue'
import Button from '@/components/Common/Button.vue'
import EmojiPicker from '@/components/EmojiPicker.vue'

export default {
  name: 'Channel',

  components: { Button, EmojiPicker, Icon, Identicon, Modal },

  setup() {
    const { findById, joinedChannels, join } = useChannels()
    const { listByChannel, send } = useMessages()
    const { socket } = useSockets()
    const route = useRoute()

    const chatWindow = ref(null)
    const channel = ref(null)
    const messages = ref([])

    if (socket.listeners(Event.Message).length === 0) {
      socket.on(Events.Message, message => {
        if (message.channel !== channel.value.id) {
          return
        }

        messages.value.push(message)

        // This is a little dirty... it'd be nice if we didn't have
        // to use next tick.
        nextTick(() => {
          if (!chatWindow.value) {
            return
          }

          if (shouldScrollToBottom()) {
            chatWindow.value.scrollTop = chatWindow.value.scrollHeight
          }
        })
      })
    }

    /**
     * The last few messages are marked with a data attribute called 
     * "data-recent-message" and if these are in view when a chat message
     * is received, then we should scroll to the bottom.
     */
    function shouldScrollToBottom() {
      const scrollToBottomMessages = Array.from(document.querySelectorAll('[data-recent-message=true]'))

      return scrollToBottomMessages.some(el => {
        const bounding = el.getBoundingClientRect()

        return (
          bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
      })
    }

    const form = reactive({
      message: ''
    })

    const isMemberOfChannel = computed(() => {
      return joinedChannels.value.some(joinedChannel => channel.value.id === joinedChannel.id)
    })

    watchEffect(async () => {
      if (route.params.id) {
        channel.value = await findById(route.params.id)
        messages.value = await listByChannel(channel.value.id)
      }
    })

    async function sendCurrentMessage() {
      const outboundMessage = await send(channel.value.id, form.message)

      form.message = ''
    }

    const md = MarkdownIt({
      html: true,
      linkify: true,
      typographer: true
    })

    // Remember old renderer, if overridden, or proxy to default renderer
    const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
      // If you are sure other plugins can't add `target` - drop check below
      var aIndex = tokens[idx].attrIndex('target');

      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
      }

      // pass token to default renderer.
      return defaultRender(tokens, idx, options, env, self);
    };

    function markdown(body) {
      return md.render(body)
    }

    function insertAtCursor(text) {
      form.message += text
    }

    return { 
      form, 
      isMemberOfChannel,
      channel,
      join,
      insertAtCursor,
      sendCurrentMessage,
      messages,
      chatWindow,
      formatTimeString: date => (new Date(date)).toLocaleTimeString(),
      markdown
    }
  }
}
</script>

<style>
  @media
  not screen and (min-device-pixel-ratio: 2),
  not screen and (min-resolution: 192dpi) {
    span.emoji {
      margin-right: 10px;
    }
  }
</style>