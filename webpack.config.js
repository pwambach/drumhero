const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'}
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './public/'),
    compress: true,
    port: 8000,
    host: '0.0.0.0'
  }
};
