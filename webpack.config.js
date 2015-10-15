var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  entry: [
    './src/application.js'
  ],
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: 'application.js',
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({title: 'Hot Reload'})
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel']
    }]
  }
};
