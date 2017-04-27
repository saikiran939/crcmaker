const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  devtool: 'eval-source-map',

  output: {
    publicPath: '/',
    filename: 'app.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
