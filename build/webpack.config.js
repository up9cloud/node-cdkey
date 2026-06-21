const path = require('path')
const { name } = require('../package.json')

/** @type {import('webpack').Configuration[]} */
module.exports = [
  // browser
  {
    mode: 'production',
    entry: path.join(__dirname, '..', 'src', 'index.js'),
    output: {
      filename: `${name}.min.js`,
      path: path.resolve(__dirname, '..', 'dist'),
      library: name,
      globalObject: "this"
    },
    resolve: {
      extensions: ['.js']
    }
  },
  // nodejs
  {
    mode: 'production',
    target: 'node',
    entry: path.join(__dirname, '..', 'src', 'index.js'),
    output: {
      filename: `index.js`,
      path: path.resolve(__dirname, '..', 'lib'),
      library: {
        type: 'commonjs2'
      }
    },
    resolve: {
      extensions: ['.js']
    }
  }
]
