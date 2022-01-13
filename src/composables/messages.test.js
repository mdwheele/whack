/**
 * @jest-environment ./tests/ExpressEnvironment
 */

import { useAuthentication } from './auth'
import { useChannels } from './channels'
import { useMessages } from './messages'

test('messages feature test', async () => {
  const { login } = useAuthentication(global.address)
  const { create } = useChannels(global.address)
  
  await login('whack', 'whack')
  const channel = await create('whack-dev')

  const { send, listAll, findById, update, del } = useMessages(global.address)

  // Send a message!
  const message = await send(channel.id, 'Hello there friend!')
  expect(await listAll()).toHaveLength(1)
  
  // Retrieve a message!
  const freshMessage = await findById(message.id)
  expect(freshMessage.id).toBe(message.id)
  
  // Update a message!
  await update(message.id, 'An updated salutation, friend!')
  expect((await findById(message.id)).body).toBe('An updated salutation, friend!')

  // Delete a message!
  await del(message.id)
  expect(await listAll()).toHaveLength(0)
})