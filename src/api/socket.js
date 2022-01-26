const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const { verify } = require('./utils/paseto')
const config = require('./config')
const ChannelMembership = require('./models/ChannelMembership')

let io = null

function attachWebSocketServer(server) {
  io = new Server(server, {
    cors: {
      origin: "https://whack.chat:8080"
    }
  })

  let parser = cookieParser(config.cookie.secret)

  // Authenticate the socket.io connection...
  io.use(async (socket, next) => {
    parser(socket.request, null, next)

    const token = socket.request.signedCookies.token

    try {
      const payload = await verify(token)
    
      socket.locals = socket.locals || {}

      socket.locals.uid = payload.uid
      socket.locals.username = payload.sub
    
      const channels = await ChannelMembership.byUser(socket.locals.uid)

      channels.forEach(channel => {
        socket.join(channel.rid)
      })
    } catch (error) {
      next(new Error('Unable to authenticate web-socket connection'))
    }
  })

  io.on(Events.Connection, socket => {
    socket.on(Events.Message, message => {
      console.log(`Sending message to users in ${message.channel}. Current rooms are ${io.of("/").adapter.rooms}`)
      io.to(message.channel).emit(Events.Message, message)
    })

    socket.on(Events.Disconnecting, () => {
      console.log(`${socket.id} is disconnecting...`)
    })

    socket.on(Events.Disconnect, () => {
      console.log(`${socket.id} has disconnected...`)
    })
  })
}

const Events = {
  Connection: 'connection',
  Message: 'message',
  Disconnect: 'disconnect',
  Disconnecting: 'disconnecting',
}

module.exports = {
  attachWebSocketServer,
  Events,
  io: () => io,
}