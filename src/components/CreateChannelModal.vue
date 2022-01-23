<template>
  <Modal>
    <template #trigger="{ open }">
      <div @click.prevent="open">Create a channel</div>
    </template>

    <template #default="{ close }">
      <div class="flex items-center justify-between">
        <h2>Create a channel</h2>
        <div class="hover:bg-gray-100 text-gray-600 p-2 rounded">
          <Icon name="x" class="w-5 h-5 flex-shrink-0" />
        </div>
      </div>

      <p>Channels are where your team communicates. They're best when organized around a topic — #marketing, for example</p>

      <!-- <TextInput label="Name" help="..." icon="hashtag" placeholder="..." max-length="80" -->
      <div>
        <label for="text-input-1">Name</label>
        <div>
          <input id="text-input-1" type="text" />
        </div>
      </div>

      <div>
        <Button>Create</Button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Button from '@/components/Common/Button.vue'
import Modal from '@/components/Common/Modal.vue'
import MenuItem from '@/components/Common/MenuItem.vue'
import Icon from 'vue-heroicon-next'

export default {
  name: 'CreateChannelModal',
  components: { Button, Icon, MenuItem, Modal },

  setup() {
    function log(msg) {
      console.log(msg)
    }

    return {
      log
    }
  }
}
</script>