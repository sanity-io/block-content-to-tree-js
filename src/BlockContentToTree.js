const objectAssign = require('object-assign')
const migrate = require('./migrate')
const builtInHandlers = require('./type-handlers')
const {isList} = require('./type-checkers')

function parseListBlocks(blocks, typeHandlers) {
  return typeHandlers.list(blocks)
}

function parseSingleBlock(block, typeHandlers) {
  const type = block._type
  const typeHandler = typeHandlers[type]

  // Not a block type, wrap it into .attributes and decouple the _type
  if (!typeHandler) {
    const attributes = objectAssign({}, block)
    delete attributes._type
    return {
      type: type,
      attributes: attributes
    }
  }
  return typeHandler(block)
}

class BlockContentToTree {
  constructor(options) {
    this.typeHandlers = builtInHandlers
    this.options = objectAssign({staticKeys: true}, options)
  }

  // Accepts an array of blocks, or a single block.
  // Returns same object type as input
  convert(data) {
    if (!Array.isArray(data) && (!data || !data._type)) {
      throw new Error(
        `Input must be an Array or an Object (with a ._type) - got ${data}`
      )
    }

    const content = migrate(data, this.options)

    if (Array.isArray(content)) {
      const parsedData = []
      let listBlocks = []

      content.forEach((block, index, blocks) => {
        if (isList(block)) {
          // Each item in a list comes in its own block
          // We bundle those togther in a single list object
          listBlocks.push(block)
          const nextBlock = blocks[index + 1] || {}
          // If next block is not a similar listItem, this list is complete
          if (nextBlock.listItem !== block.listItem) {
            const completeList = Array.from(listBlocks)
            listBlocks = []
            parsedData.push(parseListBlocks(completeList, this.typeHandlers))
          }
        } else {
          parsedData.push(parseSingleBlock(block, this.typeHandlers))
        }
      })
      return parsedData
    }

    return parseSingleBlock(content, this.typeHandlers)
  }
}

module.exports = BlockContentToTree
