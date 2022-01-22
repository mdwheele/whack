const knex = require('../utils/database')
const nanoid = require('../utils/nanoid')

var slimeId = 0

class Channel {
  constructor(name) {
    this.id = null
    this.rid = null
    this.name = name
    this.owner = null
  }

  static fromRecord(record) {
    const instance = new Channel(record.channels.name)

    instance.id = record.channels.id
    instance.rid = record.channels.rid
    instance.owner = record.channels.owner

    instance._record = record

    return instance
  }

  static async create(attributes) {
    const { name, owner } = attributes

    const query = knex.table('channels').where('name', name)

    const [channel] = await query

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
    const channels = await this.fetch(query => {
      query.whereNull('archived_at')
    })

    return channels.map(Channel.fromRecord)
  }

  static async findById(id) {
    const [channel] = await this.fetch(query => {
      query.where('id', id)
        .whereNull('archived_at')
    })

    if (!channel) {
      throw { status: 404, message: 'Channel not found.' }
    }

    return Channel.fromRecord(channel)
  }

  static async findByRid(rid) {
    const [channel] = await this.fetch(query => {
      query.where('rid', rid)
        .whereNull('archived_at')
    })

    if (!channel) {
      throw { status: 404, message: 'Channel not found.' }
    }

    return Channel.fromRecord(channel)
  }

  static async findByName(name) {    
    const [channel] = await this.fetch(query => {
      query.where('name', name)
        .whereNull('archived_at')
    })

    if (!channel) {
      throw { status: 404, message: 'Channel not found.' }
    }

    return Channel.fromRecord(channel)
  }

  static async filter(callback = async knex => knex) {
    const records = await this.fetch(callback)

    return records.map(Channel.fromRecord)
  }

  /**
   * @private 
   */
  static async fetch(callback = async knex => knex) {
    const query = knex('channels')
      .select(
        'channels.*',
        knex('user_channel_assoc')
          .count('*')
          .whereRaw('?? = ??', ['channels.id', 'user_channel_assoc.channel_id'])
          .as('members_count')
      )
      .options({ nestTables: true })

    await callback(query)

    return query
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
      name: this.name,
      meta: {
        members: this._record[''].members_count
      }
    }
  }
}

module.exports = Channel