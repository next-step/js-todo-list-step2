const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/js/index.js", "./src/css/app.css"],

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          name: "[hash].[ext]",
          limit: 10000,
        },
      },
    ],
  },

  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "../src/"),
      "@js": path.resolve(__dirname, "../src/js"),
      "@components": path.resolve(__dirname, "../src/js/components"),
      "@constants": path.resolve(__dirname, "../src/js/constants"),
      "@lib": path.resolve(__dirname, "../src/js/lib"),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "bundle.css" }),
  ],
};
