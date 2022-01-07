const knex = require('../utils/database')
const nanoid = require('../utils/nanoid')
const User = require('./User')

class Message {
  constructor() {
    this.id = null
    this.rid = null
    this.body = null
    this.channelId = null
    this.authorId = null
    this.createdAt = null
    this.updatedAt = null
  }

  static async send(attributes) {
    const { authorId, channelId, body } = attributes
    const rid = nanoid()
    const now = new Date()

    const [id] = await knex('messages').insert({
      rid,
      channel_id: channelId,
      author_id: authorId,
      body,
      created_at: now,
      updated_at: now
    })

    const [record] = await this.fetch(query => {
      query.where('messages.id', id)
    })

    return Message.fromRecord(record)
  }

  static async findByRid(rid) {
    const [record] = await this.fetch(query => {
      return query.where('messages.rid', rid)
    })

    if (!record) {
      throw new Error('Message not found.')
    }

    return Message.fromRecord(record) 
  }

  static async filter(callback = async knex => knex) {
    const records = await this.fetch(callback)

    return records.map(Message.fromRecord)
  }

  /**
   * @private 
   */
  static async fetch(callback = async knex => knex) {
    const query = knex('messages')
      .join('users', 'messages.author_id', 'users.id')
      .join('channels', 'messages.channel_id', 'channels.id')
      .options({ nestTables: true })

    await callback(query)

    return query
  }

  static fromRecord(record) {
    const instance = new Message()

    instance.id = record.messages.id
    instance.rid = record.messages.rid
    instance.authorId = record.users.id
    instance.channelId = record.channels.id
    instance.body = record.messages.body
    instance.createdAt = new Date(record.messages.created_at)
    instance.updatedAt = new Date(record.messages.updated_at)

    instance._record = record

    return instance 
  }

  async update(body) {
    const now = new Date()

    await knex('message')
      .where('id', this.id)
      .update({
        body: this.body,
        updated_at: now
      })

    this.body = body
    this.updatedAt = now
  }

  async delete() {
    await knex('messages')
      .where('id', this.id)
      .del()
  }

  toJSON() {
    return {
      id: this.rid,
      channel: this._record.channels.rid,
      author: {
        username: this._record.users.username,
      },
      body: this.body,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString()
    }
  }
}

module.exports = Message