const Channel = require("../models/Channel")
const User = require("../models/User")
const { io, Events } = require('../socket')

exports.index = async (req, res) => {
  const order = req.query.order

  const channels = await Channel.filter(query => {
    if (order && order.name) {
      query.orderBy('name', order.name === 'desc' ? 'desc' : 'asc')
    }
  })

  res.json(channels.map(channel => channel.toJSON()))
}

exports.show = async (req, res) => {
  const channel = await Channel.findByRid(req.params.id)

  res.json(channel.toJSON())
}

exports.create = async (req, res) => {
  const channel = await Channel.create({
    name: req.body.name,
    owner: res.locals.uid
  })

  res.json(channel.toJSON())
}

exports.update = async (req, res) => {
  res.json({})
}

exports.archive = async (req, res) => {
  const channel = await Channel.findByRid(req.params.id)

  await channel.archive()

  res.send()
}

exports.join = async (req, res) => {
  const user = await User.findById(res.locals.uid)

  await user.joinChannel(req.params.id)

  const socket = Array.from(io().sockets.sockets.values()).find(socket => socket.locals.uid === res.locals.uid)

  if (socket) {
    socket.join(req.params.id)
  }

  res.send()
}

exports.leave = async (req, res) => {
  const user = await User.findById(res.locals.uid)

  await user.leaveChannel(req.params.id)

  const socket = Array.from(io().sockets.sockets.values()).find(socket => socket.locals.uid === res.locals.uid)

  if (socket) {
    socket.leave(req.params.id)
  }

  res.send()
}