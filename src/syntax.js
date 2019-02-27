'use strict'

const constant = require('./constant.js')

let charsExcludes = '0O1Il'
let excludes = new RegExp('[' + charsExcludes + ']', 'g')

let numbers = constant.number.replace(excludes, '')
let charsUpper = constant.upper.replace(excludes, '')
let charsLower = constant.lower.replace(excludes, '')

module.exports = {
  '0': numbers,
  'A': charsUpper,
  'a': charsLower,
  'X': numbers + charsUpper,
  'x': numbers + charsLower,
  '?': numbers + charsUpper + charsLower
}
