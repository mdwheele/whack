const knex = require('../utils/database')

class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  static async findOrCreate(attributes) {
    const { username, password } = attributes

    const [user] = await knex('users').where({ username })

    if (!user) {
      await knex('users').insert({ username, password })

      return new User(username, password)
    }

    return new User(user.username, user.password)
  }
}

module.exports = User