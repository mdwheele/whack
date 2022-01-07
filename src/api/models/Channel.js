const knex = require('../utils/database')
const nanoid = require('../utils/nanoid')

var slimeId = 0

class Channel {
  constructor(name) {
    this.id = '1'
    this.rid = 'A38fJ4hZ'
    this.name = name
    this.owner = null // come back 
  }

  static fromRecord(record) {
    const instance = new Channel(record.name)

    instance.id = record.id
    instance.rid = record.rid
    instance.owner = record.owner

    return instance
  }

  static async create(attributes) {
    const { name, owner } = attributes

    const [channel] = await knex('channels').where('name', name)

    if (channel) {
      throw new Error(`Channel with name ${name} already exists.`)
    }

    const rid = nanoid()

    const [id] = await knex('channels').insert({
      name: name,
      owner_id: owner,
      rid,
    })

    return Channel.fromRecord({ id, rid, owner, name })
  }

  static async all() {
    const channels = await knex('channels')
      .whereNull('archived_at')

    return channels.map(Channel.fromRecord)
  }

  static async findById(id) {
    const [channel] = await knex('channels')
      .where('id', id)
      .whereNull('archived_at')

    if (!channel) {
      throw { status: 404, message: 'Channel not found.' }
    }

    return Channel.fromRecord(channel)
  }

  static async findByRid(rid) {
    const [channel] = await knex('channels')
      .where('rid', rid)
      .whereNull('archived_at')

    if (!channel) {
      throw { status: 404, message: 'Channel not found.' }
    }

    return Channel.fromRecord(channel)
  }

  static async findByName(name) {
    const [channel] = await knex('channels')
      .where('name', name)
      .whereNull('archived_at')

    if (!channel) {
      throw { status: 404, message: 'Channel not found.' }
    }

    return Channel.fromRecord(channel)
  }

  async archive() {
    await knex('channels')
      .where('id', this.id)
      .update({
        archived_at: new Date()
      })
  }

  toJSON() {
    return {
      id: this.rid,
      name: this.name
    }
  }
}

module.exports = Channel