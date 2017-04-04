import getContent from './ContentNester'

const block = singleBlock => {
  return {
    type: 'text',
    style: singleBlock.style,
    content: getContent(singleBlock.spans)
  }
}

const list = listBlocks => {
  return {
    type: 'list',
    style: listBlocks[0].listItem,
    items: listBlocks.map(listBlock => {
      return {
        type: 'text',
        content: getContent(listBlock.spans)
      }
    })
  }
}

export default {
  block,
  list
}
