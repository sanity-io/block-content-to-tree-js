import getContent from './ContentNester'
import {getInternalBlockType} from './type-checkers'


const block = singleBlock => {
  switch (getInternalBlockType(singleBlock)) {
    case 'text':
      return {
        type: 'text',
        style: 'plain',
        content: getContent(singleBlock.spans)
      }
    case 'heading':
      return {
        type: 'text',
        style: singleBlock.style,
        content: getContent(singleBlock.spans)
      }
    default:
      return {}
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
