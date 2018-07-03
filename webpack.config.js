require('webpack');
var path = require('path');

function join(dest) {
  return path.resolve(__dirname, dest);
}

module.exports = function(env) {
  return {
    mode: 'development',
    devtool: 'eval',
    entry: join('index.js'),
    output: {
      path: join('build'),
      filename: 'fabriclight.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['env', 'react']
          }
        }
      ]
    },
    externals: {}
  };
};
