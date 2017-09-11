const getContent = require('./ContentNester')

const block = singleBlock => {
  const output = {
    type: 'block',
    style: singleBlock.style,
    content: getContent(singleBlock.spans)
  }
  if (singleBlock.extra) {
    output.extra = singleBlock.extra
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
      content: getContent(listBlock.spans)
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
