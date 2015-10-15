var path = require('path')

module.exports = {
  entry: [
    './src/server.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  target: 'node',
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  node: {
    //do not include poly fills...
    //http://webpack.github.io/docs/configuration.html#node
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: false
  }
}
