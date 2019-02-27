# node-cdkey

[![Build Status](https://travis-ci.org/up9cloud/node-cdkey.svg?branch=master)](https://travis-ci.org/up9cloud/node-cdkey)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/node-cdkey/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/node-cdkey?branch=master)

generate the random string by template.

## Installation

```sh
npm install cdkey --save

# node <= v4
npm install cdkey@1.0.6
```

## Usage (basic)

```js
cdkey([number amount])
```

```js
const cdkey = require("cdkey")

cdkey() // eC8q-8ERg-fTZa-Vh2o
cdkey(2) // [ 'kcsi-V5xR-1xv8-zq7q', 'cumh-jYVn-5vL9-mwLM' ]
```

## Usage (template)

```js
cdkey(string template, [number amount], [object syntax])
```

###### default syntax

exclude non-readable chars

|syntax|basic chars|exclude chars|
|---|---|---|
|`0`|[0-9]|[01]|
|`A`|[A-Z]|[OI]|
|`a`|[a-z]|[l]|
|`X`|[0-9] + [A-Z]|[01OI]|
|`x`|[0-9] + [a-z]|[01l]|
|`?`|[0-9] + [A-Z] + [a-z]|[01OIl]|

```js
cdkey('XXXX') // 7F3K
cdkey('????', 2) // [ 'cUwc', 'n9zu' ]

cdkey.syntax() // to get default syntax data.
// { '0': '23456789',
//   A: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
//   a: 'abcdefghijkmnopqrstuvwxyz',
//   X: '23456789ABCDEFGHJKLMNPQRSTUVWXYZ',
//   x: '23456789abcdefghijkmnopqrstuvwxyz',
//   '?': '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz' }
```

###### custom syntax

```js
cdkey('AAAA', {
  A: 'AB'
})
// ABBA

cdkey('cccc', 2, {
  c: 'ABC'
})
// [ 'BCAA', 'ACAB' ]
```

## Usage (option)

```js
cdkey(object options, [number amount, [string template|number length]])
```

amount will override options.amount.

the 3rd argument will override template or length (depand on style).

###### options

|attribute|type|description|
|---|---|---|
|char|string||
|length|number||
|template|string||
|syntax|object||
|amount|number|default 1|

###### char + length style (custom)

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

###### template + syntax (custom)

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

###### char + length style (buildin)

> default length is 32

- `ALPHANUMERIC` - [0-9 a-z A-Z]
- `ALPHABETIC` - [a-z A-Z]
- `NUMBER`, `NUMERIC` - [0-9]
- `UPPER` - [A-Z]
- `LOWER` - [a-z]
- `HEX` - [0-9 A-F]

```js
cdkey(cdkey.NUMBER) // 22030189956236488846744098007707
cdkey(cdkey.NUMBER, 2, 8) // [ '05250373', '42852368' ]
```

###### template + syntax style (buildin)

- `DEFAULT` - '????-????-????-????'
- `DIABLO` - 'XXXX-XXXX-XXXX-XXXX'

```js
cdkey(cdkey.DIABLO, 2) // [ '2F2L-HJTG-P4L6-QBTZ', 'F1XM-K9JZ-ED9L-EPL9' ]
```

## Usage (fluent)

```js
cdkey(true)
    [.method(...)]
    ...
    .gen()
```

|method|param type|
|---|---|
|char|string|
|length|number|
|template|string|
|syntax|object|
|amount|number|

```js
cdkey(true)
  .char('012')
  .length(8)
  .gen()
// 01201002

cdkey(true)
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
- browser support.

## License

[MIT](LICENSE)
