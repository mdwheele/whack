const Message = require('../models/Message')
const Channel = require('../models/Channel')
const { default: validator } = require('validator')

exports.index = async (req, res) => {
  const messages = await Message.filter()

  res.json(messages)
}

exports.show = async (req, res) => {
  const message = await Message.findByRid(req.params.id)

  res.json(message)
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

  res.json(message)
}

exports.update = async (req, res) => {
  res.json({})
}

exports.delete = async (req, res) => {
  const message = await Message.findByRid(req.params.id)

  if (message.authorId !== res.locals.uid) {
    throw new Error('Only the author of a message can delete it.')
  }

  await message.delete()

  res.send()
}
