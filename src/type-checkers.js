const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export function isHeading(data) {
  const {_type, style} = data
  return _type === 'block' && HEADINGS.includes(style)
}

export function isList(data) {
  const {_type, listItem} = data
  return _type === 'block' && !!listItem
}

export function isText(data) {
  const {_type} = data
  return _type === 'block' && !isList(data) && !isHeading(data)
}

export function getInternalBlockType(data) {
  if (isText(data)) {
    return 'text'
  }
  if (isList(data)) {
    return 'list'
  }
  if (isHeading(data)) {
    return 'heading'
  }
  return 'custom'
}
