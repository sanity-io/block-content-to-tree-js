import builtInHandlers from './type-handlers'
import {isList} from './type-checkers'


class Adapter {

  constructor() {
    this.typeHandlers = builtInHandlers
  }

  // Accepts an array of blocks, or a single block.
  // Returns same object type as input
  parse(data) {
    if (Array.isArray(data)) {
      const parsedData = []
      let listBlocks = []

      data.forEach((block, index, blocks) => {
        if (isList(block)) {
          // Each item in a list comes in its own block
          // We bundle those togther in a single list object
          listBlocks.push(block)
          const nextBlock = blocks[index + 1] || {}
          // If next block is not a similar listItem, this list is complete
          if (nextBlock.listItem !== block.listItem) {
            const completeList = Array.from(listBlocks)
            listBlocks = []
            parsedData.push(this.parseListBlocks(completeList))
          }
        } else {
          parsedData.push(this.parseSingleBlock(block))
        }
      })
      return parsedData
    }

    if (!data || !data._type) {
      throw new Error(`Input must be an Array or an Object (with a ._type) - got ${data}`)
    }

    return this.parseSingleBlock(data)
  }

  parseListBlocks(blocks) {
    return this.typeHandlers.list(blocks)
  }


  parseSingleBlock(block) {
    const type = block._type
    const typeHandler = this.typeHandlers[type]

    // Not a block type, wrap it into .attributes and decouple the _type
    if (!typeHandler) {
      const attributes = {...block}
      delete attributes._type
      return {
        type: type,
        attributes: attributes
      }
    }
    return typeHandler(block)
  }

}

export default Adapter
