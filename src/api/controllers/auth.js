const auth = require('basic-auth')
const ms = require('ms')
const User = require('../models/User')
const { sign } = require('../utils/paseto')
const config = require('../config')
const { compare } = require('../utils/image')

exports.login = async (req, res) => {
  const { name: username, pass: password } = auth(req)

  if (username.length === 0) {
    throw { status: 400, message: 'Usernames must be at least 1 character'}
  }

  if (!password) {
    throw { status: 401, message: 'Invalid password' }
  }

  const user = await User.findOrCreate({ username, password }) 

  const confidence = await compare(user.password, password)

  if (confidence < 0.95) {
    throw { status: 401, message: 'Invalid password' }
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