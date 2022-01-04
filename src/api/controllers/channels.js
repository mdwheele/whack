const Channel = require("../models/Channel")


exports.index = async (req, res) => {
  const channels = await Channel.all()

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
  res.json({})
}

exports.leave = async (req, res) => {
  res.json({})
}