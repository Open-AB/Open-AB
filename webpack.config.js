const isDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname),
  entry: './client/app.js',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  output: { path: __dirname, filename: '/client/bundle.js' },
  plugins: [],
};
