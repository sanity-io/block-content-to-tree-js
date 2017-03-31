export function isList(data) {
  const {_type, listItem} = data
  return _type === 'block' && !!listItem
}

export function isText(data) {
  const {_type} = data
  return _type === 'block' && !isList(data)
}

export function getInternalBlockType(data) {
  if (isText(data)) {
    return 'text'
  }
  if (isList(data)) {
    return 'list'
  }
  return 'custom'
}
