const knex = require('../utils/database')

class User {
  constructor(id, username, password) {
    this.id = id
    this.username = username
    this.password = password
  }

  static async findOrCreate(attributes) {
    const { username, password } = attributes

    const [user] = await knex('users').where({ username })

    if (!user) {
      const [id] = await knex('users').insert({ username, password })

      return new User(id, username, password)
    }

    return new User(user.id, user.username, user.password)

  }
}

module.exports = User