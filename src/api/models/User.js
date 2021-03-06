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

  static async findById(id) {
    const [user] = await knex('users').where('id', id)

    if (!user) {
      throw new Error(`User does not exist.`)
    }

    return new User(user.id, user.username, user.password)
  }

  async joinChannel(rid) {
    const [channelRecord] = await knex('channels').where('rid', rid)

    if (!channelRecord) {
      throw new Error(`Channel does not exist.`)
    }

    await knex('user_channel_assoc')
      .insert({
        user_id: this.id,
        channel_id: channelRecord.id
      })  
  }

  async leaveChannel(rid) {
    const [channelRecord] = await knex('channels').where('rid', rid)

    if (!channelRecord) {
      throw new Error(`Channel does not exist.`)
    }

    await knex('user_channel_assoc')
      .where({
        user_id: this.id,
        channel_id: channelRecord.id
      })  
      .del()
  }
}

module.exports = User