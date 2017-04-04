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

      let pos = 1

      // Start at position one. Root is always plain and should never be removed. (?)
      if (nodeStack.length > 1) {
        for (pos; pos < nodeStack.length; pos++) {
          const mark = nodeStack[pos].mark
          if (marksNeeded.includes(mark)) { // eslint-disable-line max-depth
            const index = marksNeeded.indexOf(mark)
            marksNeeded.splice(index, 1)
          } else {
            break
          }
        }
      }

      // Keep from beginning to first miss
      nodeStack = nodeStack.slice(0, pos)

      // Add needed nodes
      let currentNode = nodeStack.slice(-1)[0]
      marksNeeded.forEach(mark => {
        const node = {
          content: [],
          mark: mark,
          type: 'mark'
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
