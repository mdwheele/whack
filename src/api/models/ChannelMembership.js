const knex = require("../utils/database")
const Channel = require("./Channel")

class ChannelMembership {
  /**
   * @returns {Channel[]}
   */
  static async byUser(userId, order = 'asc') {
    const builder = knex('user_channel_assoc')
      .select(
        'channels.*',
        knex('user_channel_assoc')
          .count('*')
          .whereRaw('?? = ??', ['channels.id', 'user_channel_assoc.channel_id'])
          .as('members_count')
      )
      .join('channels', 'channels.id', 'user_channel_assoc.channel_id')
      .where('user_channel_assoc.user_id', userId)
      .whereNull('channels.archived_at')
      .options({ nestTables: true })

    if (order.name) {
      builder.orderBy('name', order.name === 'desc' ? 'desc' : 'asc')
    }

    const channels = await builder

    return channels.map(Channel.fromRecord)
  }
}

module.exports = ChannelMembership