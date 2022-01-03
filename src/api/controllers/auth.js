const auth = require('basic-auth')
const User = require('../models/User')
const { sign } = require('../utils/paseto')

exports.login = async (req, res) => {
  const { name: username, pass: password } = auth(req)

  const user = await User.findOrCreate({ username, password }) 

  if (user.password !== password) {
    throw new Error('Invalid password')
  }

  const token = await sign({
    sub: user.username
  })

  res.cookie('token', token, { 
    maxAge: 2 * 3600000 /* 2h */,
    httpOnly: true,
    secure: true,
    domain: 'localhost:3000'
  })

  res.json({
    token
  })
}