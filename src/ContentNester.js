/* eslint-disable no-console */

class ContentNester {

  constructor(spans) {
    this.spans = spans
    this.spanIndex = 0
  }

  nextSpan() {
    console.log('-------------------------------')
    console.log('.')
    console.log('.')
    console.log(`-------------- ${this.spanIndex} --------------`)
    const span = this.spans.length > this.spanIndex ? this.spans[this.spanIndex] : null
    this.spanIndex += 1
    return span
  }

  comingMarks(currentSpan, nextSpan) {
    if (!nextSpan) {
      return []
    }
    return nextSpan.marks.filter(mark => {
      return !currentSpan.marks.includes(mark)
    })
  }

  goingMarks(currentSpan, nextSpan = {}) {
    if (!nextSpan) {
      return currentSpan.marks
    }
    return currentSpan.marks.filter(mark => {
      return !nextSpan.marks.includes(mark)
    })
  }

  compile(currentSpan, marksToRemove, marksToAdd, result = []) {
    console.log('compile')
    if (!currentSpan) {
      return result
    }

    console.log('currentSpan:', currentSpan)
    console.log('result:', result)
    console.log('marksToRemove:', marksToRemove)
    console.log('marksToAd:', marksToAdd)

    if (marksToRemove.length) {
      console.log('---> remove mark:', marksToRemove.pop())
      this.compile(currentSpan, marksToRemove, marksToAdd, result)
      return result

    } else if (marksToAdd.length) {
      const mark = marksToAdd.pop()
      console.log('---> add mark:', mark)
      result.push({
        type: mark,
        content: this.compile(currentSpan, marksToRemove, marksToAdd, [])
      })
      return result
    }

    console.log('---> no diff, just push:', currentSpan.text)
    result.push(currentSpan.text)
    const nextSpan = this.nextSpan()
    const comingMarks = this.comingMarks(currentSpan, nextSpan)
    const goingMarks = this.goingMarks(currentSpan, nextSpan)

    return this.compile(nextSpan, goingMarks, comingMarks, result)
  }

}

const getContent = spans => {
  const cn = new ContentNester(spans)
  const firstSpan = cn.nextSpan()
  const got = cn.compile(firstSpan, [], firstSpan.marks, [])
  console.log('=============================\n', JSON.stringify(got, null, 2))
  return got
}

export default getContent

/* eslint-enable no-console */
