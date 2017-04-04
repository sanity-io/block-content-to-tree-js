/* eslint-disable id-length */

import {test} from 'tap'
import Adapter from '../src/Adapter.js'

const adapter = new Adapter()

test('handles a normal string block', {todo: false}, t => {
  const input = require('./fixtures/normal-text.json')
  const expected = {
    type: 'block',
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
    type: 'block',
    style: 'normal',
    content: [
      'String with an ',
      {
        type: 'span',
        mark: 'em',
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
    type: 'block',
    style: 'normal',
    content: [
      'String with an ',
      {
        type: 'span',
        mark: 'underline',
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
    type: 'block',
    style: 'normal',
    content: [
      'Normal',
      {
        type: 'span',
        mark: 'strong',
        content: [
          'only-bold',
          {
            type: 'span',
            mark: 'underline',
            content: [
              'bold-and-underline'
            ]
          }
        ]
      },
      {
        type: 'span',
        mark: 'underline',
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
    type: 'block',
    style: 'normal',
    content: [
      'Normal',
      {
        type: 'span',
        mark: 'strong',
        content: [
          'strong',
          {
            type: 'span',
            mark: 'underline',
            content: [
              'strong and underline',
              {
                type: 'span',
                mark: 'em',
                content: [
                  'strong and underline and emphasis'
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'span',
        mark: 'em',
        content: [
          {
            type: 'span',
            mark: 'underline',
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
    type: 'block',
    style: 'normal',
    content: [
      'Hacking ',
      {
        type: 'span',
        mark: 'code',
        content: [
          'teh codez'
        ]
      },
      ' is ',
      {
        type: 'span',
        mark: 'strong',
        content: [
          'all ',
          {
            type: 'span',
            mark: 'underline',
            content: [
              'fun'
            ]
          },
          ' and ',
          {
            type: 'span',
            mark: 'em',
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
    type: 'block',
    style: 'normal',
    content: [
      'String before link ',
      {
        type: 'span',
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
    type: 'block',
    style: 'normal',
    content: [
      'String with link to ',
      {
        type: 'span',
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
                type: 'span',
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
            type: 'span',
            mark: 'strong'
          },
          {
            type: 'span',
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
        type: 'span',
        mark: 'em'
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
    itemStyle: 'number',
    items: [
      {
        type: 'block',
        style: 'normal',
        content: [
          'One'
        ]
      },
      {
        type: 'block',
        style: 'normal',
        content: [
          'Two has ',
          {
            type: 'span',
            mark: 'strong',
            content: [
              'bold'
            ]
          },
          ' word'
        ]
      },
      {
        type: 'block',
        style: 'h2',
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
    itemStyle: 'bullet',
    items: [
      {
        type: 'block',
        style: 'normal',
        content: [
          'I am the most'
        ]
      },
      {
        type: 'block',
        style: 'normal',
        content: [
          'expressive',
          {
            type: 'span',
            mark: 'strong',
            content: [
              'programmer'
            ]
          },
          'you know.'
        ]
      },
      {
        type: 'block',
        style: 'normal',
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
      itemStyle: 'bullet',
      items: [
        {
          type: 'block',
          style: 'normal',
          content: [
            'A single bulleted item'
          ]
        }
      ]
    },
    {
      type: 'list',
      itemStyle: 'number',
      items: [
        {
          type: 'block',
          style: 'normal',
          content: [
            'First numbered'
          ]
        },
        {
          type: 'block',
          style: 'normal',
          content: [
            'Second numbered'
          ]
        }
      ]
    },
    {
      type: 'list',
      itemStyle: 'bullet',
      items: [
        {
          type: 'block',
          style: 'normal',
          content: [
            'A bullet with',
            {
              type: 'span',
              mark: 'strong',
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
    type: 'block',
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
    type: 'author',
    attributes: {
      name: 'Test Person'
    }
  }
  const got = adapter.parse(input)
  t.same(got, expected)
  t.end()
})

/* eslint-enable id-length */
