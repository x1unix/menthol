var path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "dist/app.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: "ts-loader"}
    ]
  }
};
