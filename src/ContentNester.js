/* eslint-disable no-console */

class ContentNester {

  constructor(spans) {
    this.spans = spans
  }

  run() {

    const model = {content: []}
    let nodeStack = [model]
    let markStack = []

    this.spans.forEach(span => {

      const marksNeeded = span.marks

      // Compare what we have with what we want
      let popCount = 0
      for (let i = 0; i < markStack.length; i++) {
        if (i > marksNeeded.length || marksNeeded[i] == markStack[i]) {
          marksNeeded.shift()
        } else {
          popCount += 1
        }
      }

      // Chop chop
      nodeStack = nodeStack.slice(0, nodeStack.length - popCount)
      markStack = markStack.slice(0, markStack.length - popCount)

      // Add needed nodes
      let currentNode = nodeStack.slice(-1)[0]
      marksNeeded.forEach(mark => {
        const node = {
          content: [],
          type: mark
        }
        currentNode.content.push(node)
        nodeStack.push(node)
        markStack.push(mark)
        currentNode = node
      })

      currentNode.content.push(span.text)
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

/* eslint-enable no-console */
