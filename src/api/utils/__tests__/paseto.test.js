const { sign, verify } = require("../paseto")

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