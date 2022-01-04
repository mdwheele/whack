const { V2: paseto } = require('paseto')
const { createPrivateKey, createPublicKey } = require('crypto')
const config = require('../config')
const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '../../..')

const private = createPrivateKey(fs.readFileSync(path.resolve(projectRoot, config.paseto.private)))
const public = createPublicKey(fs.readFileSync(path.resolve(projectRoot, config.paseto.public)))

const PASETO_AUD = 'whack'
const PASETO_ISS = 'whack'

async function sign(payload) {
  return await paseto.sign(payload, private, {
    audience: PASETO_AUD,
    issuer: PASETO_ISS,
    expiresIn: '2 hours'
  })
}

async function verify(token) {
  return await paseto.verify(token, public, {
    audience: PASETO_AUD,
    issuer: PASETO_ISS,
    clockTolerance: '1 min'
  })
}

/**
 * 
 * @param {import('express').Request} req 
 */
async function authenticate(req) {
  const token = req.cookies.token

  try {
    const payload = await verify(token)

    req.res.locals.uid = payload.uid
    req.res.locals.username = payload.sub

    return true
  } catch(error) {
    throw new Error('Invalid token')
  }
}

module.exports = { sign, verify, authenticate }