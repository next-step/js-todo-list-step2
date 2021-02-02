const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js', //hash, contenthash, chunkhash
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
    ],
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({ template: './index.html' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
