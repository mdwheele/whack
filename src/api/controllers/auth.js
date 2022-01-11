const auth = require('basic-auth')
const ms = require('ms')
const User = require('../models/User')
const { sign } = require('../utils/paseto')
const config = require('../config')

exports.login = async (req, res) => {
  const { name: username, pass: password } = auth(req)

  const user = await User.findOrCreate({ username, password }) 

  if (user.password !== password) {
    throw new Error('Invalid password')
  }

  const token = await sign({
    sub: user.username,
    uid: user.id
  })

  res.cookie('token', token, { 
    maxAge: ms('2h'),
    httpOnly: true,
    secure: true,
    domain: `${config.server.hostname}`,
    signed: true
  })

  res.json({
    token
  })
}