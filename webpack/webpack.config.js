/* global cat */
require('shelljs/global')
// const config = require('../config/client')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const minimize = process.argv.indexOf('--minimize') > -1
const isDev = process.env.NODE_ENV === 'development'

var lessLoader = ExtractTextPlugin.extract(
  'css?sourceMap!less?sourceMap'
)

//
// PLUGINS
//
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
  new ExtractTextPlugin('styles.css', {
    allChunks: true
  }),
  new webpack.HotModuleReplacementPlugin()
]

if (minimize) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: isDev
  }))
}

//
// LOADERS
//
const loaders = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015']
    }
  },
  {
    test: /\.html$/,
    loader: 'html'
  },
  {
    test: /\.less$/,
    exclude: /node_modules/,
    loader: lessLoader
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  }
]

//
// ENTRIES
//
const entry = {
  app: [
    './src/app.js'
  ],
  vendor: [
    'babel-polyfill',
    'vue'
  ]
}

//
// OUTPUT
//
const output = {
  path: path.resolve(__dirname, '../www'), // cordova root
  publicPath: './',
  filename: 'app.js'
}

// ----
module.exports = {
  entry,
  output,
  plugins,
  devtool: isDev ? 'source-map' : null,
  module: { loaders }
}
