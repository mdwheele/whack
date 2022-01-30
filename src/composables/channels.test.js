/**
 * @jest-environment ./tests/ExpressEnvironment
 */

import { useAuthentication } from './auth'
import { useChannels } from './channels'

const DATA_URI_PASSWORD = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

test('channel feature test', async () => {
  const { login } = useAuthentication(global.address)

  // User logs into Whack...
  await login('whack', DATA_URI_PASSWORD)

  const { create, findById, listAll, join, leave, archive } = useChannels(global.address)

  try {
    // ... and they create a new channel called #whack-dev ...
    const channel = await create('whack-dev')

    // 1. They are able to find the channel that was created
    const channelFoundById = await findById(channel.id)
    expect(channel.id).toBe(channelFoundById.id)

    // 2. They are able to list all channels
    const channels = await listAll()
    expect(channels).toHaveLength(1)
    expect(channels[0].id).toBe(channel.id)

    // 3. They can join and leave channels
    await join(channel.id)
    await leave(channel.id)

    // 4. Finally, users can archive channels
    await archive(channel.id)
    expect(await listAll()).toHaveLength(0) 
  } catch (error) {
    console.error(error)
  }
})