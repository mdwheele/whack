/**
 * @jest-environment ./tests/ExpressEnvironment
 */

import { useAuthentication } from './auth'

test('can authenticate', async () => {
  const { login, user, token } = useAuthentication(global.address)

  expect(user.value).toBeUndefined()

  await login('whack', 'whack')

  expect(user.value.username).toBe('whack')
  expect(user.value.password).toBe('whack')

  expect(token.value).toContain('v2.public')
})