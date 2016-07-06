const path = require('path');
const webpack = require('webpack');

const PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: PROD ? ['./client/index'] : ['webpack-hot-middleware/client', './client/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  devtool: PROD ? '' : 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      },
      {
        test: /\.jpeg$/,
        loader: 'url-loader',
      },
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
    ],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  },
  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ] : [new webpack.HotModuleReplacementPlugin()],
};

