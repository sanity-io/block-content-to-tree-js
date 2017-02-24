/* eslint-disable id-length */

import {test} from 'tap'
import Adapter from '../src/Adapter.js'

const adapter = new Adapter()

test('handles a plain string', t => {
  const expected = [
    'one'
  ]
  t.same(adapter.parse(), expected)
  t.end()
})

/* eslint-enable id-length */
