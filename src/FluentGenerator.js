import {
  randomString,
  randomCharByTemplate
} from './utils'

export default class FluentGenerator {
  constructor (options) {
    this._amount = 1
    this._debug = false
    this._repeat = false
    if (options) {
      if (options.amount) {
        this._amount = options.amount
      }
      if (options.length) {
        this._length = options.length
      }
      if (options.char) {
        this._char = options.char
      }
      if (options.template) {
        this._template = options.template
      }
      if (options.syntax) {
        this._syntax = options.syntax
      }
      if (options.debug) {
        this._debug = options.debug
      }
    }
    return this
  };
  get debug () {
    return this._debug
  };
  set debug (fn) {
    this._debug = fn
  };
  length (length) {
    this._length = length
    return this
  };
  char (char) {
    this._char = char
    return this
  };
  template (template) {
    this._template = template
    return this
  };
  syntax (syntax) {
    this._syntax = syntax
    return this
  };
  amount (amount) {
    this._amount = amount
    return this
  };
  generate () {
    return this.gen()
  };
  gen () {
    let result = []
    let keygen = () => ''
    if (this._length && this._length > 0) {
      keygen = () => randomString(this._char, this._length)
    } else if (this._template) {
      keygen = () => randomCharByTemplate(this._template, this._syntax)
    }
    let errorCount = 0
    for (let i = 0; i < this._amount; i++) {
      let key = keygen()
      if (result.indexOf(key) === -1) {
        result.push(key)
      } else {
        errorCount++
        if (errorCount > 1000) {
          console.error('Ignored too many duplicate result, please decrease amount.')
          break
        }
        i--
      }
    }
    if (this._amount <= 1) {
      if (this._debug) {
        this._debug(result[0])
      }
      return result[0]
    }
    if (this._debug) {
      this._debug(result)
    }
    return result
  };
}
