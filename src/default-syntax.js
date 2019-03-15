import {
  number,
  upper,
  lower,
  avoid
} from './chars.js'

const excludeRegex = new RegExp('[' + avoid + ']', 'g')

const numberFixed = number.replace(excludeRegex, '')
const upperFixed = upper.replace(excludeRegex, '')
const lowerFixed = lower.replace(excludeRegex, '')

export default {
  '0': numberFixed,
  'A': upperFixed,
  'a': lowerFixed,
  'X': numberFixed + upperFixed,
  'x': numberFixed + lowerFixed,
  '?': numberFixed + upperFixed + lowerFixed
}
