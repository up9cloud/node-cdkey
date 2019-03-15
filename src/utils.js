import {
  random
} from 'lodash-es'

function randomString (chars, length) {
  let str = ''
  for (var i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}
function randomChar (str) {
  let index = random(0, str.length - 1)
  return str[index]
}
function randomCharByTemplate (templateString, syntax) {
  let key = ''
  for (let i = 0; i < templateString.length; i++) {
    const chars = syntax[templateString[i]]
    if (chars) {
      key += randomChar(chars)
    } else {
      key += templateString[i]
    }
  }
  return key
}

export {
  randomString,
  randomChar,
  randomCharByTemplate
}
