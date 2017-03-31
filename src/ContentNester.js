import _omit from 'lodash.omit'

class ContentNester {

  constructor(spans) {
    this.spans = spans
  }

  run() {

    const model = {content: []}
    let nodeStack = [model]

    this.spans.forEach(span => {

      const dataAttributes = _omit(span, ['text', 'marks', '_type'])

      const marksNeeded = span.marks.sort()

      // console.info('------------------')
      // console.info('before', nodeStack.map(node => node.type), marksNeeded)

      let pos = 1

      // Start at position one. Root is always plain and should never be removed. (?)
      if (nodeStack.length > 1) {
        for (pos; pos < nodeStack.length; pos++) {
          const type = nodeStack[pos].type
          if (marksNeeded.includes(type)) { // eslint-disable-line max-depth
            // console.info('- ', type)
            const index = marksNeeded.indexOf(type)
            marksNeeded.splice(index, 1)
          } else {
            break
          }
        }
      }

      // console.info('after filter', marksNeeded, pos)

      // Keep from beginning to first miss
      nodeStack = nodeStack.slice(0, pos)

      // console.info('nodes after chop', nodeStack.map(node => node.type))

      // Add needed nodes
      let currentNode = nodeStack.slice(-1)[0]
      marksNeeded.forEach(mark => {
        const node = {
          content: [],
          type: mark
        }
        currentNode.content.push(node)
        nodeStack.push(node)
        currentNode = node
      })

      if (Object.keys(dataAttributes).length) {
        currentNode.content.push({
          type: 'object',
          attributes: dataAttributes,
          content: [
            span.text
          ]
        })
      } else {
        currentNode.content.push(span.text)
      }
    })

    return model.content
  }
}

const getContent = spans => {
  const cn = new ContentNester(spans)
  const got = cn.run()
  return got
}

export default getContent
