import {
  isInteger,
  isObject
} from 'lodash-es'

import defaultSyntax from './default-syntax.js'
import FluentGenerator from './FluentGenerator.js'
import {
  DEFAULT
} from './builtin-options.js'
export * from './builtin-options.js'

export function cdkey (arg1, arg2, arg3) {
  let options, amount, length, template, syntax

  if (arguments.length === 0) {
    // nothing.
  } else if (arg1 === true) {
    return new FluentGenerator()
  } else if (isInteger(arg1)) {
    amount = arg1
    if (arg2) {
      length = arg2
    }
  } else if (isObject(arg1)) {
    options = {
      ...arg1
    }
    if (arg2) {
      amount = arg2
      if (arg3) {
        if (isInteger(arg3)) {
          length = arg3
        } else {
          template = arg3
        }
      }
    }
  } else {
    template = arg1
    if (arg2) {
      if (isObject(arg2)) {
        syntax = {
          ...arg2
        }
        if (arg3) {
          amount = arg3
        }
      } else {
        amount = arg2
        if (arg3) {
          syntax = {
            ...arg3
          }
        }
      }
    }
  }
  if (!options) {
    options = {
      ...DEFAULT,
      syntax: {
        ...DEFAULT.syntax
      }
    }
  }
  if (amount) {
    options.amount = amount
  }
  if (template) {
    options.length = null
    options.char = null

    options.template = template
    if (syntax) {
      options.syntax = {
        ...defaultSyntax,
        ...syntax
      }
    } else if (!options.syntax) {
      options.syntax = {
        ...DEFAULT.syntax
      }
    }
  }
  if (length) {
    options.template = null
    options.syntax = null

    options.length = length
    if (!options.char) {
      options.char = DEFAULT.syntax['?']
    }
  }
  let generator = new FluentGenerator(options)
  return generator.gen()
}
export function syntax () { return defaultSyntax }
export function create (options) { return new FluentGenerator(options) }

export default cdkey
