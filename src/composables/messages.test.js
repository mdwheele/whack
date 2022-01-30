/**
 * @jest-environment ./tests/ExpressEnvironment
 */

import { useAuthentication } from './auth'
import { useChannels } from './channels'
import { useMessages } from './messages'

const DATA_URI_PASSWORD = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

test('messages feature test', async () => {
  const { login } = useAuthentication(global.address)
  const { create } = useChannels(global.address)
  
  await login('whack', DATA_URI_PASSWORD)
  const channel = await create('whack-dev')

  const { send, listAll, findById, del } = useMessages(global.address)

  // Send a message!
  const message = await send(channel.id, 'Hello there friend!')
  expect(await listAll()).toHaveLength(1)
  
  // Retrieve a message!
  const freshMessage = await findById(message.id)
  expect(freshMessage.id).toBe(message.id)
  
  // Delete a message!
  await del(message.id)
  expect(await listAll()).toHaveLength(0)
}, 60000)