/* eslint-disable id-length */

import {test} from 'tap'
import Adapter from '../src/Adapter.js'

const adapter = new Adapter()

test('handles a normal string block', {todo: false}, t => {
  const input = require('./fixtures/normal-text.json')
  const expected = {
    type: 'text',
    style: 'normal',
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
    style: 'normal',
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
    style: 'normal',
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
    style: 'normal',
    content: [
      'Normal',
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
      'normal'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})

test('does not care about span marks order', {todo: false}, t => {
  const orderedInput = require('./fixtures/marks-ordered-text.json')
  const reorderedInput = require('./fixtures/marks-reordered-text.json')
  const expected = {
    type: 'text',
    style: 'normal',
    content: [
      'Normal',
      {
        type: 'strong',
        content: [
          'strong',
          {
            type: 'underline',
            content: [
              'strong and underline',
              {
                type: 'em',
                content: [
                  'strong and underline and emphasis'
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'em',
        content: [
          {
            type: 'underline',
            content: [
              'underline and emphasis'
            ]
          }
        ]
      },
      'normal again'
    ]
  }
  t.same(adapter.parse(orderedInput), expected)
  t.same(adapter.parse(reorderedInput), expected)
  t.end()
})


test('handles a messy text', {todo: false}, t => {
  const input = require('./fixtures/messy-text.json')
  const expected = {
    type: 'text',
    style: 'normal',
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

test('handles simple link text', {todo: false}, t => {
  const input = require('./fixtures/link-simple-text.json')
  const expected = {
    type: 'text',
    style: 'normal',
    content: [
      'String before link ',
      {
        type: 'object',
        attributes: {
          link: {
            href: 'http://icanhas.cheezburger.com/'
          }
        },
        content: [
          'actual link text'
        ]
      },
      ' the rest'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})

test('handles messy link text', {todo: false}, t => {
  const input = require('./fixtures/link-messy-text.json')
  const expected = {
    type: 'text',
    style: 'normal',
    content: [
      'String with link to ',
      {
        type: 'object',
        attributes: {
          link: {
            href: 'http://icanhas.cheezburger.com/'
          }
        },
        content: [
          'internet '
        ]
      },
      {
        content: [
          {
            content: [
              {
                type: 'object',
                attributes: {
                  link: {
                    href: 'http://icanhas.cheezburger.com/'
                  }
                },
                content: [
                  'is very strong and emphasis'
                ]
              }
            ],
            type: 'strong'
          },
          {
            type: 'object',
            attributes: {
              link: {
                href: 'http://icanhas.cheezburger.com/'
              }
            },
            content: [
              ' and just emphasis'
            ]
          }
        ],
        type: 'em'
      },
      '.'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})

test('handles a numbered list', {todo: false}, t => {
  const input = require('./fixtures/list-numbered-blocks.json')
  const expected = [{
    type: 'list',
    style: 'number',
    items: [
      {
        type: 'text',
        content: [
          'One'
        ]
      },
      {
        type: 'text',
        content: [
          'Two has ',
          {
            type: 'strong',
            content: [
              'bold'
            ]
          },
          ' word'
        ]
      },
      {
        type: 'text',
        content: [
          'Three'
        ]
      }
    ]
  }]
  t.same(adapter.parse(input), expected)
  t.end()
})


test('handles a bulleted list', {todo: false}, t => {
  const input = require('./fixtures/list-bulleted-blocks.json')
  const expected = [{
    type: 'list',
    style: 'bullet',
    items: [
      {
        type: 'text',
        content: [
          'I am the most'
        ]
      },
      {
        type: 'text',
        content: [
          'expressive',
          {
            type: 'strong',
            content: [
              'programmer'
            ]
          },
          'you know.'
        ]
      },
      {
        type: 'text',
        content: [
          'SAD!'
        ]
      }
    ]
  }]
  t.same(adapter.parse(input), expected)
  t.end()
})

test('handles multiple lists', {todo: false}, t => {
  const input = require('./fixtures/list-both-types-blocks.json')
  const expected = [
    {
      type: 'list',
      style: 'bullet',
      items: [
        {
          type: 'text',
          content: [
            'A single bulleted item'
          ]
        }
      ]
    },
    {
      type: 'list',
      style: 'number',
      items: [
        {
          type: 'text',
          content: [
            'First numbered'
          ]
        },
        {
          type: 'text',
          content: [
            'Second numbered'
          ]
        }
      ]
    },
    {
      type: 'list',
      style: 'bullet',
      items: [
        {
          type: 'text',
          content: [
            'A bullet with',
            {
              type: 'strong',
              content: [
                'something strong'
              ]
            }
          ]
        }
      ]
    }
  ]
  t.same(adapter.parse(input), expected)
  t.end()
})

test('handles a plain h2 block', {todo: false}, t => {
  const input = require('./fixtures/h2-text.json')
  const expected = {
    type: 'text',
    style: 'h2',
    content: [
      'Such h2 header, much amaze'
    ]
  }
  t.same(adapter.parse(input), expected)
  t.end()
})


test('handles a non-block type', {todo: false}, t => {
  const input = require('./fixtures/non-block.json')
  const expected = {
    type: 'object',
    attributes: {
      _type: 'author',
      name: 'Test Person'
    }
  }
  const got = adapter.parse(input)
  t.same(got, expected)
  t.end()
})

/* eslint-enable id-length */
