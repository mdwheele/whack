const fs = require('fs')
const path = require('path')
const { sign, verify } = require("../paseto")
const paseto = require('paseto')
const crypto = require('crypto')

const env = JSON.parse(JSON.stringify(process.env))

setupTestKeys()

test('can create a paseto token with payload', async () => {
  const token = await sign({
    sub: 'some.user@example.com'
  })

  expect(token.length).toBeGreaterThan(0)
})

test('can retrieve payload data from verified token', async () => {
  const token = await sign({
    sub: 'some.user@example.com'
  })

  const payload = await verify(token)

  expect(payload.sub).toBe('some.user@example.com')
})

test('it will not verify tokens that have been tampered with', async () => {
  const token = await sign({
    sub: 'some.user@example.com'
  })

  expect.assertions(1)

  try {
    const payload = await verify(`${token}spicy`)
  } catch(error) {
    expect(error).toHaveProperty('message', 'invalid signature')
  }
})

function setupTestKeys() {
  beforeAll(async () => {
    const privateKey = await paseto.V2.generateKey('public')
  
    const publicKey = crypto.createPublicKey({
        key: privateKey,
        format: 'pem'
    })
  
    fs.writeFileSync(path.resolve(__dirname, './resources/key'), privateKey.export({ type: 'pkcs8', format: 'pem' }))
    fs.writeFileSync(path.resolve(__dirname, './resources/key.pub'), publicKey.export({ type: 'spki', format: 'pem' }))
  
    process.env.PASETO_PRIVATE_KEY = path.resolve(__dirname, './resources/key')
    process.env.PASETO_PUBLIC_KEY = path.resolve(__dirname, './resources/key.pub')
  })
  
  afterAll(() => {
    process.env = env
  
    try {
      fs.unlinkSync(path.resolve(__dirname, './resources/key'))
      fs.unlinkSync(path.resolve(__dirname, './resources/key.pub'))
    } catch (error) {}
  })
}