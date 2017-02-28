/* eslint-disable no-console */

import getContent from './ContentNester'

const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

function isHeading(data) {
  const {_type, style} = data
  return _type === 'block' && !!HEADINGS.includes(style)
}

function isList(data) {
  const {_type, listItem} = data
  return _type === 'block' && !!listItem
}

function isText(data) {
  const {_type} = data
  return _type === 'block' && !isList(data) && !isHeading(data)
}

function iternalBlockType(data) {
  if (isText(data)) {
    console.log('is text')
    return 'text'
  }
  if (isList(data)) {
    console.log('is list')
    return 'list'
  }
  if (isHeading(data)) {
    console.log('is heading')
    return 'heading'
  }
  console.log('is custom')
  return 'custom'
}

const block = data => {
  switch (iternalBlockType(data)) {
    case 'text':
      return {
        type: 'text',
        style: 'plain',
        content: getContent(data.spans)
      }
    case 'list':
      return {
        type: 'text',
        style: 'plain',
        content: [
          'Normal string of text.',
        ]
      }
    case 'heading':
      return {
        type: 'text',
        style: 'h2',
        content: [
          'Normal string of text.',
        ]
      }
    default:
      return {}
  }
}

const span = data => {
  return data
}


export default {
  block: block,
  span: span
}

/* eslint-enable no-console */
