/**
 * @jest-environment ./tests/ExpressEnvironment
 */

import { useAuthentication } from './auth'

const DATA_URI_PASSWORD = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

test('can authenticate', async () => {
  const { login, user, token } = useAuthentication(global.address)

  expect(user.value).toBeUndefined()

  await login('whack', DATA_URI_PASSWORD)

  expect(user.value.username).toBe('whack')
  expect(user.value.password).toBe(DATA_URI_PASSWORD)

  expect(token.value).toContain('v2.public')
})