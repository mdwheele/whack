import { ref } from 'vue'
import { io } from 'socket.io-client'

var socket = null

export const Events = {
  Connection: 'connection',
  Message: 'message',
  Disconnect: 'disconnect',
  Disconnecting: 'disconnecting',
}

export function useSockets() {
  const isConnected = ref(false)

  if (!socket) {
    socket = io({
      transports: ['websocket']
    })

    socket.on('connect', () => {
      isConnected.value = true
    })
  }

  return {
    socket,
    isConnected
  }
}