const numbers = '0123456789'
const charsLower = 'abcdefghijklmnopqrstuvwxyz'
const charsUpper = charsLower.toUpperCase()

module.exports = {
  'number': numbers,
  'upper': charsUpper,
  'lower': charsLower,
  'alphanumeric': numbers + charsUpper + charsLower,
  'alphabetic': charsUpper + charsLower
}
