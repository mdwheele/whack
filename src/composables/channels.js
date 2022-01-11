import axios from '../axios'

export function useChannels(url) {
  async function create(name) {
    const response = await axios.post(`${url}/api/channels`, {
      name
    })

    return response.data
  }

  async function findById(id) {
    const response = await axios.get(`${url}/api/channels/${id}`)

    return response.data
  }

  async function listAll() {
    const response = await axios.get(`${url}/api/channels`)

    return response.data
  }

  async function join(id) {
    await axios.post(`${url}/api/channels/${id}/join`)
  }

  async function leave(id) {
    await axios.post(`${url}/api/channels/${id}/leave`)
  }

  async function archive(id) {
    await axios.delete(`${url}/api/channels/${id}`)
  }

  return {
    create,
    findById,
    listAll,
    join,
    leave,
    archive
  }
}