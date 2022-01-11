/**
 * @jest-environment ./tests/ExpressEnvironment
 */

const User = require('../src/api/models/User')
const Channel = require('../src/api/models/Channel')
const knex = require('../src/api/utils/database')
const { assertDatabaseCount, assertDatabaseHas, assertDatabaseMissing } = require('./assertions')

afterAll(async () => {
  await knex.destroy()
})

test('can assert table has certain amount of rows in it', async () => {
  const user = await User.findOrCreate({
    username: 'test',
    password: 'test'
  })

  await Channel.create({
    name: 'SGVsbG8K',
    owner: user.id
  })

  await assertDatabaseCount('users', 1)
  await assertDatabaseHas('users', { username: 'test' })

  await assertDatabaseCount('channels', 1)
  await assertDatabaseHas('channels', { 
    name: 'SGVsbG8K',
    owner_id: 1
  })
  await assertDatabaseMissing('channels', { 
    name: 'foo',
    owner_id: 99
  })
})