/* eslint-disable id-length */
const BlockContentToTree = require('../src/BlockContentToTree')

const blockContentToTree = new BlockContentToTree({staticKeys: true})

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
    children: ['Normal string of text.']
  }
  const got = blockContentToTree.convert(input)
  expect(got).toEqual(expected)
})

test('handles italicized text', () => {
  const input = require('./fixtures/italicized-text.json')
  const expected = {
    type: 'block',
    style: 'normal',
    children: [
      'String with an ',
      {
        type: 'span',
        mark: 'em',
        markKey: 'em',
        children: ['italicized']
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
    children: [
      'String with an ',
      {
        type: 'span',
        mark: 'underline',
        markKey: 'underline',
        children: ['underlined']
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
    children: [
      'Normal',
      {
        type: 'span',
        mark: 'strong',
        markKey: 'strong',
        children: [
          'only-bold',
          {
            type: 'span',
            mark: 'underline',
            markKey: 'underline',
            children: ['bold-and-underline']
          }
        ]
      },
      {
        type: 'span',
        mark: 'underline',
        markKey: 'underline',
        children: ['only-underline']
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
    children: [
      'Normal',
      {
        type: 'span',
        mark: 'strong',
        markKey: 'strong',
        children: [
          'strong',
          {
            type: 'span',
            mark: 'underline',
            markKey: 'underline',
            children: [
              'strong and underline',
              {
                type: 'span',
                mark: 'em',
                markKey: 'em',
                children: ['strong and underline and emphasis']
              }
            ]
          }
        ]
      },
      {
        type: 'span',
        mark: 'em',
        markKey: 'em',
        children: [
          {
            type: 'span',
            mark: 'underline',
            markKey: 'underline',
            children: ['underline and emphasis']
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
    children: [
      'Hacking ',
      {
        type: 'span',
        mark: 'code',
        markKey: 'code',
        children: ['teh codez']
      },
      ' is ',
      {
        type: 'span',
        mark: 'strong',
        markKey: 'strong',
        children: [
          'all ',
          {
            type: 'span',
            mark: 'underline',
            markKey: 'underline',
            children: ['fun']
          },
          ' and ',
          {
            type: 'span',
            mark: 'em',
            markKey: 'em',
            children: ['games']
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
    children: [
      'String before link ',
      {
        type: 'span',
        mark: {
          _type: 'link',
          _key: 'ck28pq',
          href: 'http://icanhas.cheezburger.com/'
        },
        markKey: 'ck28pq',
        children: ['actual link text']
      },
      ' the rest'
    ]
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles messy link text', () => {
  const input = require('./fixtures/link-messy-text.json')
  const expected = {
    children: [
      'String with link to ',
      {
        children: [
          'internet ',
          {
            children: [
              {
                children: ['is very strong and emphasis'],
                mark: 'strong',
                markKey: 'strong',
                type: 'span'
              },
              ' and just emphasis'
            ],
            mark: 'em',
            markKey: 'em',
            type: 'span'
          }
        ],
        mark: {
          _key: 'ck28pq',
          _type: 'link',
          href: 'http://icanhas.cheezburger.com/'
        },
        markKey: 'ck28pq',
        type: 'span'
      },
      '.'
    ],
    style: 'normal',
    type: 'block'
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

test('handles messy link text in new structure', () => {
  const input = require('./fixtures/link-messy-text-new.json')
  const expected = {
    type: 'block',
    style: 'normal',
    children: [
      'String with link to ',
      {
        children: [
          'internet ',
          {
            children: [
              {
                children: ['is very strong and emphasis'],
                mark: 'strong',
                markKey: 'strong',
                type: 'span'
              },
              ' and just emphasis'
            ],
            mark: 'em',
            markKey: 'em',
            type: 'span'
          }
        ],
        mark: {
          _key: 'zomgLink',
          _type: 'link',
          href: 'http://icanhas.cheezburger.com/'
        },
        markKey: 'zomgLink',
        type: 'span'
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
          children: ['One']
        },
        {
          type: 'block',
          style: 'normal',
          children: [
            'Two has ',
            {
              type: 'span',
              mark: 'strong',
              markKey: 'strong',
              children: ['bold']
            },
            ' word'
          ]
        },
        {
          type: 'block',
          style: 'h2',
          children: ['Three']
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
          children: ['I am the most']
        },
        {
          type: 'block',
          style: 'normal',
          children: [
            'expressive',
            {
              type: 'span',
              mark: 'strong',
              markKey: 'strong',
              children: ['programmer']
            },
            'you know.'
          ]
        },
        {
          type: 'block',
          style: 'normal',
          children: ['SAD!']
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
          children: ['A single bulleted item']
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
          children: ['First numbered']
        },
        {
          type: 'block',
          style: 'normal',
          children: ['Second numbered']
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
          children: [
            'A bullet with',
            {
              type: 'span',
              mark: 'strong',
              markKey: 'strong',
              children: ['something strong']
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
    children: ['Such h2 header, much amaze']
  }
  expect(blockContentToTree.convert(input)).toEqual(expected)
})

/*
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
*/

/* eslint-enable id-length */
