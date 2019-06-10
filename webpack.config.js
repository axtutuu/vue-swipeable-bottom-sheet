const { resolve } = require('path');

module.exports = {
  mode: 'production',
  entry: './src/',
  output: {
    library: 'SwipeableBottomSheet',
    libraryTarget: 'commonjs2',
    filename: 'vue-swipeable-bottom-sheet.js',
    path: resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            scss: ['postcss-loader']
          }
        }
      },
      { test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
