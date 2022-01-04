const { customAlphabet } = require('nanoid')
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

function nanoid() {
  return customAlphabet(alphabet, 11)()
}

module.exports = nanoid