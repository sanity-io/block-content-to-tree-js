/* eslint-disable id-length */
const BlockContentToTree = require('../src/BlockContentToTree')

const blockContentToTree = new BlockContentToTree()

test('validates input', () => {
  expect(() => blockContentToTree.convert(undefined)).toThrow(
    'Input must be an Array or an Object (with a ._type) - got undefined'
  )
})

test('handles a normal string block', () => {
  const input = require('./fixtures/normal-text.json')
  const expected = {
    type: 'block',
    style: 'normal',
    content: ['Normal string of text.']
  }
  const got = blockContentToTree.convert(input)
  expect(got).toEqual(expected)
})

test('handles italicized text', () => {
  const input = require('./fixtures/italicized-text.json')
  const expected = {
    type: 'block',
    style: 'normal',
    content: [
      'String with an ',
      {
        type: 'span',
        attributes: {},
        mark: 'em',
        content: ['italicized']
      },
      ' word.'
    ]
  }
  const got = blockContentToTree.convert(input)
  expect(got).toEqual(expected)
})

test('handles underline text', () => {
  const input = require('./fixtures/underlined-text.json')
  const expected = {
    type: 'block',
    style: 'normal',
    content: [
      'String with an ',
      {
        type: 'span',
        attributes: {},
        mark: 'underline',
        content: ['underlined']
      },
      ' word.'
    ]
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles bold-underline text', () => {
  const input = require('./fixtures/bold-underline-text.json')
  const expected = {
    type: 'block',
    style: 'normal',
    content: [
      'Normal',
      {
        type: 'span',
        attributes: {},
        mark: 'strong',
        content: [
          'only-bold',
          {
            type: 'span',
            mark: 'underline',
            attributes: {},
            content: ['bold-and-underline']
          }
        ]
      },
      {
        type: 'span',
        attributes: {},
        mark: 'underline',
        content: ['only-underline']
      },
      'normal'
    ]
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('does not care about span marks order', () => {
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
        attributes: {},
        content: [
          'strong',
          {
            type: 'span',
            mark: 'underline',
            attributes: {},
            content: [
              'strong and underline',
              {
                type: 'span',
                mark: 'em',
                attributes: {},
                content: ['strong and underline and emphasis']
              }
            ]
          }
        ]
      },
      {
        type: 'span',
        mark: 'em',
        attributes: {},
        content: [
          {
            type: 'span',
            attributes: {},
            mark: 'underline',
            content: ['underline and emphasis']
          }
        ]
      },
      'normal again'
    ]
  }
  expect(blockContentToTree.convert(orderedInput)).toEqual(expected)
  expect(blockContentToTree.convert(reorderedInput)).toEqual(expected)
})

test('handles a messy text', () => {
  const input = require('./fixtures/messy-text.json')
  const expected = {
    type: 'block',
    style: 'normal',
    content: [
      'Hacking ',
      {
        type: 'span',
        mark: 'code',
        attributes: {},
        content: ['teh codez']
      },
      ' is ',
      {
        type: 'span',
        mark: 'strong',
        attributes: {},
        content: [
          'all ',
          {
            type: 'span',
            attributes: {},
            mark: 'underline',
            content: ['fun']
          },
          ' and ',
          {
            type: 'span',
            attributes: {},
            mark: 'em',
            content: ['games']
          },
          ' until'
        ]
      },
      ' someone gets p0wn3d.'
    ]
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles simple link text', () => {
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
        content: ['actual link text']
      },
      ' the rest'
    ]
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles messy link text', () => {
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
        content: ['internet ']
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
                content: ['is very strong and emphasis']
              }
            ],
            type: 'span',
            attributes: {},
            mark: 'strong'
          },
          {
            type: 'span',
            attributes: {
              link: {
                href: 'http://icanhas.cheezburger.com/'
              }
            },
            content: [' and just emphasis']
          }
        ],
        type: 'span',
        attributes: {},
        mark: 'em'
      },
      '.'
    ]
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles a numbered list', () => {
  const input = require('./fixtures/list-numbered-blocks.json')
  const expected = [
    {
      type: 'list',
      itemStyle: 'number',
      items: [
        {
          type: 'block',
          style: 'normal',
          extra: 'foo',
          content: ['One']
        },
        {
          type: 'block',
          style: 'normal',
          content: [
            'Two has ',
            {
              type: 'span',
              attributes: {},
              mark: 'strong',
              content: ['bold']
            },
            ' word'
          ]
        },
        {
          type: 'block',
          style: 'h2',
          content: ['Three']
        }
      ]
    }
  ]
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles a bulleted list', () => {
  const input = require('./fixtures/list-bulleted-blocks.json')
  const expected = [
    {
      type: 'list',
      itemStyle: 'bullet',
      items: [
        {
          type: 'block',
          style: 'normal',
          content: ['I am the most']
        },
        {
          type: 'block',
          style: 'normal',
          content: [
            'expressive',
            {
              type: 'span',
              attributes: {},
              mark: 'strong',
              content: ['programmer']
            },
            'you know.'
          ]
        },
        {
          type: 'block',
          style: 'normal',
          content: ['SAD!']
        }
      ]
    }
  ]
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles multiple lists', () => {
  const input = require('./fixtures/list-both-types-blocks.json')
  const expected = [
    {
      type: 'list',
      itemStyle: 'bullet',
      items: [
        {
          type: 'block',
          style: 'normal',
          content: ['A single bulleted item']
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
          content: ['First numbered']
        },
        {
          type: 'block',
          style: 'normal',
          content: ['Second numbered']
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
              attributes: {},
              content: ['something strong']
            }
          ]
        }
      ]
    }
  ]
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles a plain h2 block', () => {
  const input = require('./fixtures/h2-text.json')
  const expected = {
    type: 'block',
    style: 'h2',
    extra: 'heading_1234',
    content: ['Such h2 header, much amaze']
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles a non-block type', () => {
  const input = require('./fixtures/non-block.json')
  const expected = {
    type: 'author',
    attributes: {
      name: 'Test Person'
    }
  }
  const got = blockContentToTree.convert(input)
  expect(got).toEqual(expected)
})

/* eslint-enable id-length */
