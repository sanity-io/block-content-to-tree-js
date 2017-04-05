# block-content-to-tree-js

Converts the flat Sanity block content structure into a generic tree structure for easier transformation into other formats (HTML, React etc).

## Installation

``npm install --save @sanity/block-content-to-tree``

## Usage

```

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
const Adapter = require('@sanity/block-content-to-tree')
const adapter = new Adapter()

const tree = adapter.parse(data)
```

This will result in the variable ``tree`` being:

```
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

For more examples, see the tests.

## License

MIT-licensed
