const path = require('path')
const { name } = require('../package.json')

module.exports = [
  // browser
  {
    entry: path.join(__dirname, '..', 'src', 'index.js'),
    output: {
      filename: `${name}.min.js`,
      path: path.resolve(__dirname, '..', 'dist'),
      library: name
    }
  },
  // nodejs
  {
    entry: path.join(__dirname, '..', 'src', 'index.js'),
    output: {
      filename: `index.js`,
      path: path.resolve(__dirname, '..', 'lib'),
      libraryTarget: 'commonjs2'
      // "var", "assign", "this", "window", "self", "global",
      // "commonjs", "commonjs2", "commonjs-module", "amd", "umd", "umd2", "jsonp"]
    }
  }
]
