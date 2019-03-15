# node-cdkey

[![Build Status](https://travis-ci.org/up9cloud/node-cdkey.svg?branch=master)](https://travis-ci.org/up9cloud/node-cdkey)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/node-cdkey/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/node-cdkey?branch=master)

Generate the random string by template.

## Installation

```sh
npm i cdkey
```

## Basic Usage

> Browser

```html
<script src="https://unpkg.com/cdkey/dist/cdkey.min.js"></script>
<script>
  console.log(cdkey.default()) // eC8q-8ERg-fTZa-Vh2o
</script>
```

> Node.js

```js
import cdkey from 'cdkey' // esm

const cdkey = require('cdkey/lib').default // cjs

console.log(cdkey()) // eC8q-8ERg-fTZa-Vh2o
```

## Advenced Usage

### Simple amount

```js
cdkey([Number amount])
```

```js
cdkey() // eC8q-8ERg-fTZa-Vh2o
cdkey(2) // [ 'kcsi-V5xR-1xv8-zq7q', 'cumh-jYVn-5vL9-mwLM' ]
```

### Template

```js
cdkey(String template, [Number amount], [Object syntax])
```

| syntax char | chars for random      | exclude non-readable chars |
| ----------- | --------------------- | -------------------------- |
| `0`         | [0-9]                 | [01]                       |
| `A`         | [A-Z]                 | [OI]                       |
| `a`         | [a-z]                 | [l]                        |
| `X`         | [0-9] + [A-Z]         | [01OI]                     |
| `x`         | [0-9] + [a-z]         | [01l]                      |
| `?`         | [0-9] + [A-Z] + [a-z] | [01OIl]                    |

```js
import { syntax } from 'cdkey'
syntax() // To get default syntax object.
// {
//   '0': '23456789',
//   'A': 'ABCDEFGHJKLMNPQRSTUVWXYZ',
//   'a': 'abcdefghijkmnopqrstuvwxyz',
//   'X': '23456789ABCDEFGHJKLMNPQRSTUVWXYZ',
//   'x': '23456789abcdefghijkmnopqrstuvwxyz',
//   '?': '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
// }
```

```js
cdkey('XXXX') // 7F3K
cdkey('????', 2) // [ 'cUwc', 'n9zu' ]

cdkey('AAAA', {
  A: 'AB' // customize syntax A
})
// ABBA

cdkey('cccc', 2, {
  c: 'ABC'
})
// [ 'BCAA', 'ACAB' ]
```

### Options

```js
cdkey(Object options, [Number amount, [String template | Number length]])
```

- amount would override options.amount
- the 3rd argument would override options.template or options.length, depand on style.

| attribute        | type   | description |
| ---------------- | ------ | ----------- |
| options.char     | string |             |
| options.length   | number |             |
| options.template | string |             |
| options.syntax   | object |             |
| options.amount   | number | default 1   |

> char + length (custom)

```js
cdkey({
  char: 'abc',
  length: 4
})
// acab

cdkey({
  char: 'abc',
  length: 4,
  amount: 2
}, 1, 3)
// aca
```

> template + syntax (custom)

```js
cdkey({
  template: 'aaaa',
  syntax: {
    a: '012'
  },
  amount: 2
})
// [ "1220", "2001" ]

cdkey({
  template: '0000',
  syntax: {
    a: '012'
  },
  amount: 5
}, 2, 'aaaa')
// [ "1220", "2001" ]
```

> char + length (builtin options)

| key                 | char          | length |
| ------------------- | ------------- | ------ |
| `ALPHANUMERIC`      | [0-9 a-z A-Z] | 32     |
| `ALPHABETIC`        | [a-z A-Z]     | 32     |
| `NUMBER`, `NUMERIC` | [0-9]         | 32     |
| `UPPER`             | [A-Z]         | 32     |
| `LOWER`             | [a-z]         | 32     |
| `HEX`               | [0-9 A-F]     | 32     |

```js
import { NUMBER } from 'cdkey'

cdkey(NUMBER) // 22030189956236488846744098007707
cdkey(NUMBER, 2, 8) // [ '05250373', '42852368' ]
```

> template + syntax (builtin options)

| key       | template              |
| --------- | --------------------- |
| `DEFAULT` | '????-????-????-????' |
| `DIABLO`  | 'XXXX-XXXX-XXXX-XXXX' |

```js
import { DIABLO } from 'cdkey'

cdkey(DIABLO, 2) // [ '2F2L-HJTG-P4L6-QBTZ', 'F1XM-K9JZ-ED9L-EPL9' ]
```

### Fluent

```js
import { create } from 'cdkey'

create()
  .char(String chars)
  .length(Number length)
  .template(String template)
  .syntax(Object syntax)
  .amount(Number amount)
  .gen()
```

```js
create()
  .char('012')
  .length(8)
  .gen()
// 01201002

create()
  .template('AAAA')
  .syntax({
    A: 'ABC'
  })
  .amount(2)
  .gen()
// [ 'BCAA', 'ACAB' ]
```

## TODO

- escape string in template.
- command line support.
- ~~browser support.~~

## License

[MIT](LICENSE)
