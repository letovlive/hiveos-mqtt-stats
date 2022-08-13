const path = require('path');
const LicensePlugin = require('webpack-license-plugin');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    // there might be other plugins here
    new LicensePlugin()
  ],
};
