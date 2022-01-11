const knex = require('../src/api/utils/database')

afterAll(async(done) => {
  await knex.destroy()
  done()
})

test('we have whack_test database', async () => {
  const [records] = await knex.raw('SHOW DATABASES')
  const databases = records.map(record => record.Database)

  expect(databases).toContain('whack_test')
})