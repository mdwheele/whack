const ChannelMembership = require("../models/ChannelMembership")

exports.show = async (req, res) => {
  res.json({})
}

exports.channels = async (req, res) => {
  const channels = await ChannelMembership.byUser(res.locals.uid)

  res.json(channels)
}