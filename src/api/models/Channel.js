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

    const instance = new Channel(name)

    instance.id = id
    instance.rid = rid
    instance.owner = owner

    return instance
  }

  static async all() {
    const channels = await knex('channels')

    return channels.map(channel => {
      const instance = new Channel(channel.name)

      instance.id = channel.id
      instance.rid = channel.rid
      instance.owner = channel.owner_id

      return instance
    })
  }

  static async findByRid(rid) {
    const [channel] = await knex('channels').where('rid', rid)

    const instance = new Channel(channel.name)

    instance.id = channel.id
    instance.rid = channel.rid
    instance.owner = channel.owner_id

    return instance
  }

  async archive() {
    await knex('channels').where('id', this.id).del()
  }

  toJSON() {
    return {
      id: this.rid,
      name: this.name
    }
  }
}

module.exports = Channel