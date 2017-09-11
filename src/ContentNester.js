module.exports = function nestContent(spans) {
  const model = {content: []}
  let nodeStack = [model]

  spans.forEach(span => {
    const dataAttributes = {...span}
    delete dataAttributes.text
    delete dataAttributes.marks
    delete dataAttributes._type

    const marksNeeded = span.marks.sort()

    let pos = 1

    // Start at position one. Root is always plain and should never be removed. (?)
    if (nodeStack.length > 1) {
      for (pos; pos < nodeStack.length; pos++) {
        const mark = nodeStack[pos].mark
        // eslint-disable-next-line max-depth
        if (marksNeeded.includes(mark)) {
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
        type: 'span',
        attributes: {}
      }
      currentNode.content.push(node)
      nodeStack.push(node)
      currentNode = node
    })

    if (Object.keys(dataAttributes).length) {
      currentNode.content.push({
        type: 'span',
        attributes: dataAttributes,
        content: [span.text]
      })
    } else {
      currentNode.content.push(span.text)
    }
  })

  return model.content
}
