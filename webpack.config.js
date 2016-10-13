module.exports = {
  entry: './index.js',
  target: 'web',
  output: {
    path: './dist',
    filename: 'foreshow.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  }
};
