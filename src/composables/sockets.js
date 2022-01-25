import { io } from 'socket.io-client'

var socket = null

export const Events = {
  Connection: 'connection',
  Message: 'message',
  Disconnect: 'disconnect',
  Disconnecting: 'disconnecting',
}

export function useSockets() {
  if (!socket) {
    console.log('Connecting...')
    socket = io()
  }

  return {
    socket
  }
}