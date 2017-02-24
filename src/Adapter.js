/* eslint-disable no-console */
import builtInHandlers from './type-handlers.js'

class Adapter {

  constructor(options = {}) {
    console.log('init with options', options)
    this.typeHandlers = Object.assign({}, builtInHandlers, options.customAdaptors)
  }

  parse(blocks) {
    console.log('parsing', blocks, 'with', this.typeHandlers)
    return {
      hello: 'blocks'
    }
  }
}
export default Adapter

/* eslint-enable no-console */
