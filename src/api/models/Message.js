const knex = require('../utils/database')
const nanoid = require('../utils/nanoid')

class Message {
  constructor(userId, channelId, body) {
    this.userId = userId
    this.channelId = channelId
    this.body = body

    this.id = null
    this.rid = null
    this.createdAt = null
    this.updatedAt = null
  }

  static async send(attributes) {
    const { userId, channelId, body } = attributes
    const rid = nanoid()
    const now = new Date()

    // TODO: Guard that body is b64-encoded... OR
    // ... do it for them if not.

    const [channel] = await knex('channels').where('rid', channelId)

    const [id] = await knex('messages').insert({
      rid,
      channel_id: channel.id,
      author_id: userId,
      body,
      created_at: now,
      updated_at: now
    })

    const instance = new Message(userId, channelId, body)

    instance.id = id
    instance.rid = rid
    instance.createdAt = now
    instance.updatedAt = now

    return instance
  }

  static async findByRid(rid) {
    const [record] = await knex('messages')
      .select('messages.*', 'messages.rid as message_rid', 'channels.rid as channel_rid')
      .join('channels', 'messages.channel_id', 'channels.id')
      .where('messages.rid', rid)

    if (!record) {
      throw new Error('Message not found.')
    }

    return Message.fromRecord(record) 
  }

  static async query(callback = async knex => await knex) {
    const query = knex('messages')
      .select('*', 'messages.rid as message_rid', 'channels.rid as channel_rid')
      .join('channels', 'messages.channel_id', 'channels.id')
      .join('users', 'messages.author_id', 'users.id')

    const records = await callback(query)

    return records.map(Message.fromRecord)
  }

  static fromRecord(record) {
    const instance = new Message(record.author_id, record.channel_rid, record.body)

    instance.id = record.id
    instance.rid = record.message_rid
    instance.createdAt = new Date(record.created_at)
    instance.updatedAt = new Date(record.updated_at)

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
      channel: this.channelId,
      body: this.body,
      created_at: this.createdAt.toISOString(),
      updated_at: this.updatedAt.toISOString()
    }
  }
}

module.exports = Message