# block-content-to-tree-js

Converts the flat Sanity block content structure into a generic tree structure for easier transformation into other formats (HTML, React etc).

## Installation

``npm install --save @sanity/block-content-to-tree``

## Quick example

```js

// The flat block content structure
const data = {
  "_type": "block",
  "style": "normal",
  "spans": [
    {
      "_type": "span",
      "text": "String with an ",
      "marks": []
    },
    {
      "_type": "span",
      "text": "italicized",
      "marks": [
        "em"
      ]
    },
    {
      "_type": "span",
      "text": " word.",
      "marks": []
    }
  ]
}


// Now convert it with block-content-to-tree
const BlockContentToTree = require('@sanity/block-content-to-tree')
const blockContentToTree = new BlockContentToTree()

const tree = blockContentToTree.convert(data)
```

This will result in the variable ``tree`` being:

```js
{
    type: 'block',
    style: 'normal',
    content: [
      'String with an ',
      {
        type: 'span',
        attributes: {},
        mark: 'em',
        content: [
          'italicized'
        ]
      },
      ' word.'
    ]
  }
```

## Entities

### Block (text)

```js
{
  type: 'block',
  style: 'normal' // Text style
  mark: 'em', // Mark indicating all content is wrapped in bold.
  content: [
    'Hello world! ', // Span with no marks or attributes (plain text).
    {
      type: 'span',
      // Data attributes for this span
      attributes: {link: {href: 'http://...'}},
      mark: 'strong',
      // The  text content for the span
      // Always an array with a single plain text.
      // An array to keep format consistent with block.content.
      content: [
        'I am a link!'
      ]
    }
  ]
}

```

### List

Root element

```js
{
  type: 'list',
  itemStyle: 'bullet' // The list style
  // Items are blocks (see above)
  items: [
    {block},
    {block}
  ]
}

```

### Custom blocks

```js
{
  type: 'author' // Whatever, but never 'block' (built in type)
  attributes: { // Custom attributes for the type
    name: 'John Ronald Reuel Tolkien',
  }
}
```

## More information / examples

Please see the tests.


## License

MIT-licensed
