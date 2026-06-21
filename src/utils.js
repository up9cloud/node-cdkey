export function random(min, max) {
  if (min > max) [min, max] = [max, min];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function randomString (chars, length) {
  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}
export function randomChar (str) {
  const index = random(0, str.length - 1)
  return str[index]
}
export function randomCharByTemplate (templateString, syntax) {
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
export function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
export function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
