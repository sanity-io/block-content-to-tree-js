/* eslint-disable id-length */

import {test} from 'tap'
import Adapter from '../src/Adapter.js'

const adapter = new Adapter()

test('handles a plain string block', {todo: false}, t => {
  const input = require('./fixtures/plain-text.json')
  const expected = {
    type: 'text',
    style: 'plain',
    content: [
      'Normal string of text.',
    ]
  }
  const got = adapter.parse(input)
  t.same(got, expected)
  t.end()
})


test('handles italicized text', {todo: false}, t => {
  const input = require('./fixtures/italicized-text.json')
  const expected = {
    type: 'text',
    style: 'plain',
    content: [
      'String with an ',
      {
        type: 'em',
        content: [
          'italicized'
        ]
      },
      ' word.'
    ]
  }
  const got = adapter.parse(input)
  t.same(got, expected)
  t.end()
})

test('handles underline text', {todo: false}, t => {
  const input = require('./fixtures/underlined-text.json')
  const expected = {
    type: 'text',
    style: 'plain',
    content: [
      'String with an ',
      {
        type: 'underline',
        content: [
          'underlined'
        ]
      },
      ' word.'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})

test('handles bold-underline text', {todo: false}, t => {
  const input = require('./fixtures/bold-underline-text.json')
  const expected = {
    type: 'text',
    style: 'plain',
    content: [
      'Plain',
      {
        type: 'strong',
        content: [
          'only-bold',
          {
            type: 'underline',
            content: [
              'bold-and-underline'
            ]
          }
        ]
      },
      {
        type: 'underline',
        content: [
          'only-underline'
        ]
      },
      'plain'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})

test('handles a messy text', {todo: false}, t => {
  const input = require('./fixtures/messy-text.json')
  const expected = {
    type: 'text',
    style: 'plain',
    content: [
      'Hacking ',
      {
        type: 'code',
        content: [
          'teh codez'
        ]
      },
      ' is ',
      {
        type: 'strong',
        content: [
          'all ',
          {
            type: 'underline',
            content: [
              'fun'
            ]
          },
          ' and ',
          {
            type: 'em',
            content: [
              'games'
            ]
          },
          ' until'
        ]
      },
      ' someone gets p0wn3d.'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})

test('handles a plain h2 block', {todo: false}, t => {
  const input = require('./fixtures/h2-text.json')
  const expected = {
    type: 'text',
    style: 'h2',
    content: [
      'Normal string of text.'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})

/* eslint-enable id-length */
