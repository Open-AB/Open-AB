var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome' ], // use Firefox for Travis CI
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js',
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'spec' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          },
          {
            test: /\.scss$/,
            loaders: ["style", "css?sourceMap", "sass?sourceMap"]
          },
          {
            test: /\.json$/,
            loaders: ['json']
          },
        ],
      }
    },
    webpackServer: {
      stats: 'errors-only',
    },
    externals: {
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'react/addons': true,
    },
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-spec-reporter',
      'karma-sourcemap-loader',
    ],
  });
};
