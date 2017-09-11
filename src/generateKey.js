module.exports = (item, options = {}) => {
  const length = options.length || 8
  return options.staticKeys
    ? getStaticKey(item, length)
    : getRandomKey(item, length)
}

function getStaticKey(item) {
  return checksum(JSON.stringify(item))
    .toString(36)
    .replace(/[^A-Za-z0-9]/g, '')
}

function getRandomKey(item, length) {
  return Math.random()
    .toString(36)
    .slice(2, length + 2)
}

/* eslint-disable no-bitwise */
function checksum(str) {
  let hash = 0
  const strlen = str.length
  if (strlen === 0) {
    return hash
  }

  for (let i = 0; i < strlen; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash &= hash // Convert to 32bit integer
  }

  return hash
}
