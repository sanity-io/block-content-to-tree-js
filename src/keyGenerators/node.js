const crypto = require('crypto')

const getStaticKey = (item, length) =>
  crypto
    .createHash('sha1')
    .update(JSON.stringify(item))
    .digest('hex')
    .slice(0, length)

const getRandomKey = (item, length) =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)

module.exports = (item, options = {}) => {
  const length = options.length || 8
  return options.staticKeys
    ? getStaticKey(item, length)
    : getRandomKey(item, length)
}
