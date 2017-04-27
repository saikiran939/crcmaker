const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');
const commonConfig = require('./webpack.common');

const OfflinePlugin = require('offline-plugin');

module.exports = merge(commonConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new webpack.optimize.UglifyJsPlugin(),

    new OfflinePlugin({
      publicPath: '/',
      relativePaths: false,
      safeToUseOptionalCaches: true,
      AppCache: false
    }),

    new CopyWebpackPlugin([{
      from: helpers.root('src/public')
    }])
  ]
});
