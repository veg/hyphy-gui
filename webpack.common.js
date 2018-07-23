const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.resolve("src", "index.js"),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        options: { limit: 10000, mimetype: "application/font-woff" }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        options: { limit: 10000, mimetype: "application/octet-stream" }
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loaders: "file-loader" },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loaders: "url-loader",
        options: { limit: 10000, mimetype: "image/svg+xml" }
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {}
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [new ExtractTextPlugin("gui.css")],
  resolve: {
    alias: {
      "phylotree.css": __dirname + "/node_modules/phylotree/phylotree.css"
    },
    modules: ["src", "node_modules"]
  },
  output: {
    filename: "bundle.js",
    path: __dirname
  },
  target: "electron"
};
