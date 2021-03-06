import axios from '../axios'
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { sortBy } from 'lodash'

const joinedChannels = ref([])

const sortedChannels = computed(() => {
  return sortBy(joinedChannels.value, ['name'])
})

export function useChannels(url) {
  const loading = ref(false)

  if (getCurrentInstance()) {
    onMounted(async () => {
      joinedChannels.value = await listJoinedChannels()
    })
  }

  async function create(name) {
    try {
      loading.value = true

      const response = await axios.post(`/api/channels`, {
        name
      }, {
        baseURL: url
      })
  
      return response.data
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function findById(id) {
    const response = await axios.get(`/api/channels/${id}`, {
      baseURL: url
    })

    return response.data
  }

  async function listAll() {
    const response = await axios.get(`/api/channels`, {
      baseURL: url
    })

    return response.data
  }

  async function listJoinedChannels() {
    const response = await axios.get(`/api/me/channels`, {
      baseURL: url,
    })

    return response.data
  }

  async function join(id) {
    await axios.post(`/api/channels/${id}/join`, {}, {
      baseURL: url
    })

    joinedChannels.value = await listJoinedChannels()
  }

  async function leave(id) {
    await axios.post(`/api/channels/${id}/leave`, {}, {
      baseURL: url
    })

    joinedChannels.value = await listJoinedChannels()
  }

  async function archive(id) {
    await axios.delete(`/api/channels/${id}`, {
      baseURL: url
    })

    joinedChannels.value = await listJoinedChannels()
  }

  return {
    create,
    findById,
    listAll,
    listJoinedChannels,
    join,
    leave,
    archive,
    joinedChannels: sortedChannels,
    loading,
  }
}