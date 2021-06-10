const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/App.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist') },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: __dirname + '/dist/',
    inline: true,
    hot: true,
    host: 'localhost',
    port: 5500,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@css': path.resolve(__dirname, 'src/css/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@todoList': path.resolve(__dirname, 'src/components/TodoList/'),
      '@userList': path.resolve(__dirname, 'src/components/UserList/'),
      '@constants': path.resolve(__dirname, 'src/constants/'),
      '@core': path.resolve(__dirname, 'src/core/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@api': path.resolve(__dirname, 'src/api/'),
    },
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project Demo',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: './index.html',
    }),
  ],
};
