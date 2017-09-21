'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/",
    filename: "[name].js"
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: "./dist"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },{
        test: /\.json?$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }, {
        test: /\.css$/,
        loaders:[
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }, {
        test: /\.jpg$/,
        loader: 'file-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  node: {
    fs: "empty"
  }
}
