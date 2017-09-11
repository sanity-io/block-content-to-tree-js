module.exports = {
  isList,
  isText,
  getInternalBlockType
}

function isList(data) {
  const {_type, listItem} = data
  return _type === 'block' && !!listItem
}

function isText(data) {
  const {_type} = data
  return _type === 'block' && !isList(data)
}

function getInternalBlockType(data) {
  if (isText(data)) {
    return 'text'
  }

  if (isList(data)) {
    return 'list'
  }

  return 'custom'
}
