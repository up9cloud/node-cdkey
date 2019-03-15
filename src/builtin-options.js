import {
  number,
  hex,
  lower,
  upper,
  alphabetic,
  alphanumeric
} from './chars.js'
import defaultSyntax from './default-syntax.js'

// char + length style
export const NUMERIC = {
  length: 32,
  char: number
}
export const NUMBER = NUMERIC
export const HEX = {
  length: 32,
  char: hex
}
export const LOWER = {
  length: 32,
  char: lower
}
export const UPPER = {
  length: 32,
  char: upper
}
export const ALPHABETIC = {
  length: 32,
  char: alphabetic
}
export const ALPHANUMERIC = {
  length: 32,
  char: alphanumeric
}

// template + syntax style
export const DEFAULT = {
  template: '????-????-????-????',
  syntax: defaultSyntax
}
export const DIABLO = {
  template: 'XXXX-XXXX-XXXX-XXXX',
  syntax: defaultSyntax
}
