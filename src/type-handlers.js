import getContent from './ContentNester'

const block = singleBlock => {
  return {
    type: 'block',
    style: singleBlock.style,
    content: getContent(singleBlock.spans)
  }
}

const list = listBlocks => {
  return {
    type: 'list',
    itemStyle: listBlocks[0].listItem,
    items: listBlocks.map(listBlock => {
      return {
        type: 'block',
        style: listBlock.style,
        content: getContent(listBlock.spans)
      }
    })
  }
}

export default {
  block,
  list
}
