<template>
  <div class="">
    <DoodlePassword @finish="dataUri = $event" />
    <pre>{{ dataUri }}</pre>
    <img class="w-64 h-64" :src="dataUri" />
  </div>
</template>

<script>
import DoodlePassword from '@/components/DoodlePassword.vue'

export default {
  name: 'Empty',
  components: { DoodlePassword },

  data() {
    return {
      dataUri: ''
    }
  }
}
</script>
