import axios from '../axios'
import { isNode } from 'browser-or-node'

// This is only here for the Jest test suite.
var btoa, atob

if (isNode) {
  btoa = require('btoa')
  atob = require('atob')
} else {
  btoa = window.btoa
  atob = window.atob
}

export function useMessages(url) {
  async function send(channel, body) {
    // Markdown content must be base64-encoded 
    // before creating the message
    const b64body = btoa(body)

    const response = await axios.post(`/api/messages`, {
      channel,
      body: b64body
    }, {
      baseURL: url
    })

    return response.data
  }

  async function update(id, body) {
    // Markdown content must be base64-encoded 
    // before creating the message
    const b64body = btoa(body)

    const response = await axios.put(`/api/messages/${id}`, {
      body: b64body
    }, {
      baseURL: url
    })

    return response.data
  }

  async function findById(id) {
    const response = await axios.get(`/api/messages/${id}`, {}, { baseURL: url })

    response.data.body = atob(response.data.body)

    return response.data
  }

  async function listAll() {
    const response = await axios.get(`/api/messages`, {}, { baseURL: url })

    return response.data.map(message => ({
      ...message,
      body: atob(message.body)
    }))
  }

  async function del(id) {
    await axios.delete(`/api/messages/${id}`, {}, { baseURL: url })
  }

  return {
    send,
    update,
    findById,
    listAll,
    del
  }
}