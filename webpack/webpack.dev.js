const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");

// webpack 공통 설정 merge
module.exports = merge(common, {
  mode: "development",

  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: "/",
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "../.env.development"),
    }),
  ],
});
