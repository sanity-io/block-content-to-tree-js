const objectAssign = require('object-assign')
const generateKey = require('./keyGenerators/node')
const knownSpanKeys = ['_type', 'text', 'marks']

function migrate(content, options) {
  if (content._type === 'block') {
    return migrateBlock(content, options)
  }

  if (Array.isArray(content)) {
    return content.map(block => migrateBlock(block, options))
  }

  throw new Error('Unrecognized block structure passed to migrate()')
}

function migrateBlock(content, options = {}) {
  if (!content.spans) {
    return content
  }

  const markDefs = []
  const children = content.spans.map(span => {
    return Object.keys(span).reduce((child, key) => {
      const knownKey = knownSpanKeys.includes(key)
      if (knownKey) {
        child[key] = span[key]
        return child
      }

      // Treat unknown keys as "custom" marks
      const markKey = generateKey(span[key], options)
      child.marks = [markKey].concat(span.marks)
      markDefs.push(
        objectAssign({}, span[key], {
          _type: key,
          _key: markKey
        })
      )

      return child
    }, {})
  })

  const migrated = objectAssign({}, content, {children, markDefs})
  delete migrated.spans
  return migrated
}

module.exports = migrate
