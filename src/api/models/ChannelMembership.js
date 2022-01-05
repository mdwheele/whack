const knex = require("../utils/database")
const Channel = require("./Channel")

class ChannelMembership {
  /**
   * @returns {Channel[]}
   */
  static async byUser(userId) {
    const channels = await knex('user_channel_assoc')
      .select('channels.*')
      .join('channels', 'channels.id', 'user_channel_assoc.channel_id')
      .where('user_channel_assoc.user_id', userId)

    return channels.map(Channel.fromRecord)
  }
}

module.exports = ChannelMembership