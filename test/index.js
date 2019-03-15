#!/usr/bin/env node
const expect = require('chai').expect
const {
  cdkey,
  create,
  NUMERIC,
  NUMBER,
  HEX,
  LOWER,
  UPPER,
  ALPHABETIC,
  ALPHANUMERIC,
  DIABLO
} = require('../lib/index.js')

describe('Simple amount', () => {
  let length = 19
  let regex = /[^0-9a-zA-Z-]/g
  it('cdkey()', () => {
    let str = cdkey()
    expect(str).to.be.a('string')
    expect(str.length).to.equal(length)
    let search = str.search(regex)
    expect(search).to.equal(-1)
  })
  it('cdkey(2)', () => {
    let amount = 2
    let list = cdkey(amount)
    expect(list).to.be.a('array')
    expect(list.length).to.equal(amount)
    list.forEach((str) => {
      expect(str).to.be.a('string')
      expect(str.length).to.equal(length)
      let search = str.search(regex)
      expect(search).to.equal(-1)
    })
  })
  it('cdkey(8, 2)', () => {
    let amount = 2
    let length = 8
    let list = cdkey(amount, length)
    expect(list).to.be.a('array')
    expect(list.length).to.equal(amount)
    list.forEach((str) => {
      expect(str).to.be.a('string')
      expect(str.length).to.equal(length)
      let search = str.search(regex)
      expect(search).to.equal(-1)
    })
  })
})

describe('Template', () => {
  let excludes = /[0O1Il]/g;
  [
    ['0000', /[^0-9]/g],
    ['AAAA', /[^A-Z]/g],
    ['aaaa', /[^a-z]/g],
    ['XXXX', /[^0-9A-Z]/g],
    ['xxxx', /[^0-9a-z]/g],
    ['????', /[^0-9A-Za-z]/g]
  ].forEach((row) => {
    let template = row[0]
    let regex = row[1]
    it('cdkey(' + template + ')', () => {
      let str = cdkey(template)
      expect(str).to.be.a('string')
      expect(str.length).to.equal(template.length)
      expect(str.search(regex)).to.equal(-1)
      expect(str.search(excludes)).to.equal(-1)
    })
    let amount = 2
    it('cdkey(' + template + ', ' + amount + ')', () => {
      let list = cdkey(template, amount)
      expect(list).to.be.a('array')
      expect(list.length).to.equal(amount)
      list.forEach((str) => {
        expect(str).to.be.a('string')
        expect(str.length).to.equal(template.length)
        expect(str.search(regex)).to.equal(-1)
        expect(str.search(excludes)).to.equal(-1)
      })
    })
  })
})

describe('Template with custom syntax', () => {
  let template = 'cccc'
  let regex = /[^ABC]/g
  let syntax = {
    'c': 'ABC'
  }
  it('cdkey(' + template + ', ' + JSON.stringify(syntax) + ')', () => {
    let str = cdkey(template, syntax)
    expect(str).to.be.a('string')
    expect(str.length).to.equal(template.length)
    expect(str.search(regex)).to.equal(-1)
  })
  let amount = 2
  it('cdkey(' + template + ', ' + amount + ', ' + JSON.stringify(syntax) + ')', () => {
    let list = cdkey(template, amount, syntax)
    expect(list).to.be.a('array')
    expect(list.length).to.equal(amount)
    list.forEach((str) => {
      expect(str).to.be.a('string')
      expect(str.length).to.equal(template.length)
      expect(str.search(regex)).to.equal(-1)
    })
  })
})

describe('builtin options (char + length)', () => {
  [
    ['NUMERIC', NUMERIC, /[^0-9]/g],
    ['NUMBER', NUMBER, /[^0-9]/g],
    ['HEX', HEX, /[^0-9ABCDEF]/g],
    ['LOWER', LOWER, /[^a-z]/g],
    ['UPPER', UPPER, /[^A-Z]/g],
    ['ALPHABETIC', ALPHABETIC, /[^A-Za-z]/g],
    ['ALPHANUMERIC', ALPHANUMERIC, /[^0-9A-Za-z]/g]
  ].forEach((row) => {
    let name = row[0]
    let option = row[1]
    let length
    if (option.length) {
      length = option.length
    } else if (option.template) {
      length = option.template.length
    }
    let regex = row[2]
    it('cdkey(' + name + ')', () => {
      let str = cdkey(option)
      expect(str).to.be.a('string')
      expect(str.length).to.equal(length)
      let search = str.search(regex)
      expect(search).to.equal(-1)
    })
    it('cdkey(' + name + ', 2)', () => {
      let amount = 2
      let list = cdkey(option, amount)
      expect(list).to.be.a('array')
      expect(list.length).to.equal(amount)
      list.forEach((str) => {
        expect(str).to.be.a('string')
        expect(str.length).to.equal(length)
        let search = str.search(regex)
        expect(search).to.equal(-1)
      })
    })
    it('cdkey(' + name + ', 2, 8)', () => {
      let amount = 2
      let length = 8
      let list = cdkey(option, amount, length)
      expect(list).to.be.a('array')
      expect(list.length).to.equal(amount)
      list.forEach((str) => {
        expect(str).to.be.a('string')
        expect(str.length).to.equal(length)
        let search = str.search(regex)
        expect(search).to.equal(-1)
      })
    })
  })
})

describe('build in options (template + syntax style)', () => {
  [
    ['DIABLO', DIABLO, /[^0-9A-Za-z-]/g]
  ].forEach((row) => {
    let name = row[0]
    let option = row[1]
    let length
    if (option.length) {
      length = option.length
    } else if (option.template) {
      length = option.template.length
    }
    let regex = row[2]
    it('cdkey(' + name + ')', () => {
      let str = cdkey(option)
      expect(str).to.be.a('string')
      expect(str.length).to.equal(length)
      let search = str.search(regex)
      expect(search).to.equal(-1)
    })
    it('cdkey(' + name + ', 2)', () => {
      let amount = 2
      let list = cdkey(option, amount)
      expect(list).to.be.a('array')
      expect(list.length).to.equal(amount)
      list.forEach((str) => {
        expect(str).to.be.a('string')
        expect(str.length).to.equal(length)
        let search = str.search(regex)
        expect(search).to.equal(-1)
      })
    })
  })
})

describe('fluent mode methods', () => {
  let char = 'ABC'
  let length = 8
  let regex = /[^ABC]/g
  it('cdkey(true) should work', () => {
    let str = cdkey(true)
      .length(length)
      .char(char)
      .generate()
    expect(str).to.be.a('string')
    expect(str.length).to.equal(length)
    expect(str.search(regex)).to.equal(-1)
  })
  it('the generate method should work same as gen.', () => {
    let str = create()
      .length(length)
      .char(char)
      .generate()
    expect(str).to.be.a('string')
    expect(str.length).to.equal(length)
    expect(str.search(regex)).to.equal(-1)
  })
})

describe('fluent mode (char + length)', () => {
  let char = 'ABC'
  let length = 8
  let regex = /[^ABC]/g
  it('generate one by ' + char + ' length ' + length, () => {
    let str = create()
      .length(length)
      .char(char)
      .gen()
    expect(str).to.be.a('string')
    expect(str.length).to.equal(length)
    expect(str.search(regex)).to.equal(-1)
  })
  it('generate multi by ' + char + ' length ' + length, () => {
    let amount = 2
    let list = create()
      .length(length)
      .char(char)
      .amount(amount)
      .gen()
    expect(list).to.be.a('array')
    expect(list.length).to.equal(amount)
    list.forEach((str) => {
      expect(str).to.be.a('string')
      expect(str.length).to.equal(length)
      expect(str.search(regex)).to.equal(-1)
    })
  })
})

describe('fluent mode (template + syntax)', () => {
  let template = '????'
  let regex = /[^ABC]/g
  let syntax = {
    '?': 'ABC'
  }
  it('generate one by ' + template + ' syntax ' + JSON.stringify(syntax), () => {
    let str = create()
      .template(template)
      .syntax(syntax)
      .gen()
    expect(str).to.be.a('string')
    expect(str.length).to.equal(template.length)
    expect(str.search(regex)).to.equal(-1)
  })
  it('generate multi by ' + template + ' syntax ' + JSON.stringify(syntax), () => {
    let amount = 2
    let list = create()
      .template(template)
      .syntax(syntax)
      .amount(amount)
      .gen()
    expect(list).to.be.a('array')
    expect(list.length).to.equal(amount)
    list.forEach((str) => {
      expect(str).to.be.a('string')
      expect(str.length).to.equal(template.length)
      expect(str.search(regex)).to.equal(-1)
    })
  })
})

describe('endless loop limitation', () => {
  let template = '0' // 23456789
  let amount = 10
  let regex = /[^0-9]/g
  it('cdkey(' + template + ', ' + amount + ')', () => {
    let list = cdkey(template, amount) // [ '3', '5', '9', '7', '4', '2', '8', '6' ]
    expect(list).to.be.a('array')
    expect(list.length).to.equal(8)
    list.forEach((str) => {
      expect(str).to.be.a('string')
      expect(str.length).to.equal(template.length)
      expect(str.search(regex)).to.equal(-1)
    })
  })
})
