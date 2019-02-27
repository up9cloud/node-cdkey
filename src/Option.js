const constant = require('./constant.js')
const syntax = require('./syntax.js')

class Option {
  // char length style
  static get ALPHANUMERIC () {
    return {
      length: 32,
      char: constant.alphanumeric
    }
  };
  static get ALPHABETIC () {
    return {
      length: 32,
      char: constant.alphabetic
    }
  };
  static get NUMERIC () {
    return {
      length: 32,
      char: constant.number
    }
  };
  static get NUMBER () {
    return Option.NUMERIC
  };
  static get UPPER () {
    return {
      length: 32,
      char: constant.upper
    }
  };
  static get LOWER () {
    return {
      length: 32,
      char: constant.lower
    }
  };
  static get HEX () {
    return {
      length: 32,
      char: constant.number + 'ABCDEF'
    }
  };
  // template style
  static get DEFAULT () {
    return {
      template: '????-????-????-????',
      syntax: syntax
    }
  };
  static get DIABLO () {
    return {
      template: 'XXXX-XXXX-XXXX-XXXX',
      syntax: syntax
    }
  };
}
module.exports = Option
