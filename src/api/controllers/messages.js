const Message = require('../models/Message')
const Channel = require('../models/Channel')
const { default: validator } = require('validator')
const { io, Events } = require('../socket')
const atob = require('atob')

exports.index = async (req, res) => {
  const filter = req.query.filter

  const messages = await Message.filter(query => {
    if (filter && filter.channel) {
      query.where('channels.rid', filter.channel)
    }

    query.orderBy('messages.id', 'asc')
  })

  res.json(messages.map(message => message.toJSON()))
}

exports.show = async (req, res) => {
  const message = await Message.findByRid(req.params.id)

  res.json(message.toJSON())
}

exports.create = async (req, res) => {
  if (!validator.isBase64(req.body.body)) { 
    throw new Error('Message body must be base64-encoded.')
  }

  const channel = await Channel.findByRid(req.body.channel)

  const message = await Message.send({
    authorId: res.locals.uid,
    channelId: channel.id, 
    body: req.body.body
  })

  io().to(channel.rid).emit(Events.Message, { ...message.toJSON(), body: atob(message.body) })

  res.json(message.toJSON())
}

exports.update = async (req, res) => {
  const message = await Message.findByRid(req.params.id)

  if (!validator.isBase64(req.body.body)) { 
    throw { status: 400, message: 'Message body must be base64-encoded.' }
  }

  await message.update(res.locals.uid, req.body.body)

  res.json(message.toJSON())
}

exports.delete = async (req, res) => {
  const message = await Message.findByRid(req.params.id)

  await message.delete(res.locals.uid)

  res.send()
}
