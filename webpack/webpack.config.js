/* global cat */
require('shelljs/global')
// const config = require('../config/client')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const minimize = process.argv.indexOf('--minimize') > -1

const plugins = [
  new webpack.optimize.CommonsChunkPlugin(
    'vendor', 'vendor.js'
  ),
  new HtmlWebpackPlugin({
    title: 'Radio-GaGa',
    template: 'src/index.ejs'
  }),
  new webpack.DefinePlugin({
    STATIONS: cat(path.resolve(__dirname, '../config/stations.json'))
  }),
  new webpack.HotModuleReplacementPlugin()
]

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: false
  }))
}

module.exports = {
  entry: {
    app: [
      './src/app.js'
    ],
    vendor: [
      'babel-polyfill',
      'vue'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../www'), // cordova root
    publicPath: '/',
    filename: 'app.js'
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  }
}
