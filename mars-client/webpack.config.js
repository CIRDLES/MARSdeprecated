var path = require('path');

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
    filename: "bundle.js"
  },
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
      }
    ]
  },
  node: {
    fs: "empty"
  }
}
