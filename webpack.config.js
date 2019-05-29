const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/',
  output: {
    library: 'SwipeableBottomSheet',
    libraryTarget: 'commonjs2',
    filename: 'vue-swipeable-bottom-sheet',
    path: resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      { test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('vue-swipeable-bottom-sheet.css')
  ]
};
