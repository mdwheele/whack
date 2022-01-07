const Channel = require("../models/Channel")
const User = require("../models/User")


exports.index = async (req, res) => {
  const channels = await Channel.all()

  res.json(channels)
}

exports.show = async (req, res) => {
  const channel = await Channel.findByRid(req.params.id)

  res.json(channel)
}

exports.create = async (req, res) => {
  const channel = await Channel.create({
    name: req.body.name,
    owner: res.locals.uid
  })

  res.json(channel)
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

  res.send()
}

exports.leave = async (req, res) => {
  const user = await User.findById(res.locals.uid)

  await user.leaveChannel(req.params.id)

  res.send()
}