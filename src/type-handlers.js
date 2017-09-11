const nestContent = require('./ContentNester')

const block = node => {
  const output = {
    type: 'block',
    style: node.style,
    children: nestContent(node.children, node)
  }
  if (node.extra) {
    output.extra = node.extra
  }
  return output
}

const list = listBlocks => ({
  type: 'list',
  itemStyle: listBlocks[0].listItem,
  items: listBlocks.map(listBlock => {
    const output = {
      type: 'block',
      style: listBlock.style,
      children: nestContent(listBlock.children, listBlock)
    }
    if (listBlock.extra) {
      output.extra = listBlock.extra
    }
    return output
  })
})

module.exports = {
  block,
  list
}
