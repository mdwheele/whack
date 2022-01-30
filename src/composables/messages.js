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

    try {
      const response = await axios.post(`/api/messages`, {
        channel,
        body: b64body
      }, {
        baseURL: url
      })

      response.data.body = body
  
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async function findById(id) {
    const response = await axios.get(`/api/messages/${id}`, { baseURL: url })

    response.data.body = atob(response.data.body)

    return response.data
  }

  async function listAll() {
    try {
      const response = await axios.get(`/api/messages`, { baseURL: url })

      return response.data.map(message => ({
        ...message,
        body: atob(message.body)
      }))
    } catch (error) {
      console.log('error')
    }
  }

  async function listByChannel(channelId) {
    if (!channelId) {
      return []
    }

    const response = await axios.get(`/api/messages?filter[channel]=${channelId}`, { baseURL: url })

    return response.data.map(message => ({
      ...message,
      body: atob(message.body)
    }))
  }

  async function del(id) {
    await axios.delete(`/api/messages/${id}`, { baseURL: url })
  }

  return {
    send,
    findById,
    listAll,
    listByChannel,
    del
  }
}