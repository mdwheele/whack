import axios from '../axios'
import { isNode } from 'browser-or-node'

// This is only here for the Jest test suite.
if (isNode) {
  var btoa = require('btoa')
  var atob = require('atob')
}

export function useMessages(url) {
  async function send(channel, body) {
    // Markdown content must be base64-encoded 
    // before creating the message
    const b64body = btoa(body)

    const response = await axios.post(`${url}/api/messages`, {
      channel,
      body: b64body
    })

    return response.data
  }

  async function update(id, body) {
    // Markdown content must be base64-encoded 
    // before creating the message
    const b64body = btoa(body)

    const response = await axios.put(`${url}/api/messages/${id}`, {
      body: b64body
    })

    return response.data
  }

  async function findById(id) {
    const response = await axios.get(`${url}/api/messages/${id}`)

    response.data.body = atob(response.data.body)

    return response.data
  }

  async function listAll() {
    const response = await axios.get(`${url}/api/messages`)

    return response.data.map(message => ({
      ...message,
      body: atob(message.body)
    }))
  }

  async function del(id) {
    await axios.delete(`${url}/api/messages/${id}`)
  }

  return {
    send,
    update,
    findById,
    listAll,
    del
  }
}