const Message = require('../models/Message')

exports.index = async (req, res) => {
  const messages = await Message.query(query => {
    if (req.query.order && ['asc', 'desc'].includes(req.query.order)) {
      query.orderBy('messages.id', req.query.order)
    }

    return query
  })

  res.json(messages.map(message => message.toJSON()))
}

exports.show = async (req, res) => {
  const message = await Message.findByRid(req.params.id)

  res.json(message.toJSON())
}

exports.create = async (req, res) => {
  const message = await Message.send({
    userId: res.locals.uid,
    channelId: req.body.channel, 
    body: req.body.body
  })

  res.json(message.toJSON())
}

exports.update = async (req, res) => {
  res.json({})
}

exports.delete = async (req, res) => {
  const message = await Message.findByRid(req.params.id)

  if (message.userId !== res.locals.uid) {
    throw new Error('Only the author of a message can delete it.')
  }

  await message.delete()

  res.send()
}
