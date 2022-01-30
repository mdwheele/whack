const knex = require('../src/api/utils/database')

afterAll(done => {
  knex.destroy().then(() => {
    done()
  })
})

test('we have whack_test database', async () => {
  const [records] = await knex.raw('SHOW DATABASES')
  const databases = records.map(record => record.Database)

  expect(databases).toContain('whack_test')
})