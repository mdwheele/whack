const ChannelMembership = require("../models/ChannelMembership")

exports.show = async (req, res) => {
  res.json({})
}

exports.channels = async (req, res) => {
  const order = req.query.order

  const channels = await ChannelMembership.byUser(res.locals.uid, order)

  res.json(channels.map(channel => channel.toJSON()))
}