var webpack = require('webpack');

module.exports = {
  context: __dirname + '',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: './app/app.jsx',
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false
    })
  ]
};