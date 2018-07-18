require('webpack');
var path = require('path');

function join(dest) {
  return path.resolve(__dirname, dest);
}

module.exports = function() {
  return {
    mode: 'development',
    devtool: 'eval',
    entry: join('src/index.js'),
    output: {
      path: join('build'),
      filename: 'fabriclight.js',
      library: 'FabricLight',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom'
    }
  };
};
