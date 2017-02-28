/* eslint-disable no-console */
import builtInHandlers from './type-handlers.js'

class Adapter {

  constructor(options = {}) {
    this.typeHandlers = Object.assign({}, builtInHandlers, options.customAdaptors)
  }

  parse(data) {
    if (Array.isArray(data)) {
      console.log(`${data.length} blocks to handle`)
      return data.map(block => {
        return this.parseSingleBlock(block)
      }).filter(Boolean)
    }
    return this.parseSingleBlock(data)
  }

  parseSingleBlock(block) {
    const type = block._type
    const typeHandler = this.typeHandlers[type]

    if (!typeHandler) {
      console.error(`No handler for type ${type}`)
      return null
    }
    console.log(`Handling type '${type}'`)
    return typeHandler(block)
  }

}

export default Adapter

/* eslint-enable no-console */
