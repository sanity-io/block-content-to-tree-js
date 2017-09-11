module.exports = (item, options = {}) => {
  const length = options.length || 8
  return options.static
    ? btoa(JSON.stringify(item)).slice(0, length)
    : Math.random()
        .toString(36)
        .slice(2, length + 2)
}
