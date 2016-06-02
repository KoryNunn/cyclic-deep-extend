# cyclic-deep-extend

a strict deep-extend that can handle cyclic structures

## Usage

```javascript

var deepExtend = require('cyclic-deep-extend');

var a = {},
    b = {};

b.b = b;

deepExtend(a, b);

a.b === b;
a.b.b.b.b.b.b === b; // etc...

```