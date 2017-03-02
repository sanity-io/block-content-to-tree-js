/* eslint-disable no-console */

class ContentNester {

  constructor(spans) {
    this.spans = spans
    this.spanIndex = 0
    this.currentSpan = spans[0]
    this.nextSpan = spans[1]
  }

  advanceToNextSpan() {
    this.spanIndex += 1
    console.log('-------------------------------')
    console.log('.')
    console.log('.')
    console.log(`-------------- ${this.spanIndex} --------------`)
    this.currentSpan = this.spans[this.spanIndex]
    this.nextSpan = this.spans[this.spanIndex + 1]
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

  compile(marksToRemove, marksToAdd, result = []) {
    console.log('compile')
    const span = this.currentSpan
    if (!span) {
      return result
    }

    console.log('currentSpan:', span)
    console.log('result:', result)
    console.log('marksToRemove:', marksToRemove)
    console.log('marksToAd:', marksToAdd)

    if (marksToRemove.length) {
      console.log('---> remove mark: ', marksToRemove.pop())
      return {result: result, marksToRemove: marksToRemove}
    }

    if (marksToAdd.length) {
      const mark = marksToAdd.pop()
      console.log('---> add mark:', mark)
      const nestedContent = this.compile(marksToRemove, marksToAdd, [])
      console.log('---> deep nest resulted in:', nestedContent)
      result.push({
        type: mark,
        content: nestedContent.result
      })
      if (nestedContent.marksToRemove) {
        console.log('---> remove mark: ', nestedContent.marksToRemove.pop())
        return {result: result, marksToRemove: nestedContent.marksToRemove}
      }
    }

    console.log('---> no diff, just push:', span.text)
    result.push(span.text)

    if (this.nextSpan) {
      const comingMarks = this.comingMarks(span, this.nextSpan)
      const goingMarks = this.goingMarks(span, this.nextSpan)
      this.advanceToNextSpan()
      return this.compile(goingMarks, comingMarks, result)
    }
    return result
  }

}

const getContent = spans => {
  const cn = new ContentNester(spans)
  const got = cn.compile([], cn.currentSpan.marks, [])
  console.log('=============================\n', JSON.stringify(got, null, 2))
  return got
}

export default getContent

/* eslint-enable no-console */
