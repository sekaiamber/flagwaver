const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageJson = require('../package.json');

const entry = {};
module.exports = {
  mode: 'development',
  context: path.join(__dirname, '..', 'src/'),
  entry: {
    t9flag: './index.js'
  },
  output: {
    path: path.join(__dirname, '..', '/dist'),
    filename: '[name].[chunkhash:8].js',
    library: 't9flag',
    libraryTarget: 'window'
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageJson.version),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[chunkhash:8].css",
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: "babel-loader"
    },
    // {
    //   test: /\.css$/,
    //   use: [{
    //     loader: MiniCssExtractPlugin.loader,
    //   }, {
    //     loader: 'css-loader', options: { importLoaders: 1 }
    //   }, 'postcss-loader', {
    //     loader: 'px2rem-loader',
    //     options: {
    //       remUnit: 100,
    //       remPrecision: 12
    //     }
    //   }]
    // },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, {
        loader: 'css-loader', options: { importLoaders: 1 }
      }]
    },
    {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader', 'sass-loader']
    },
    {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      }, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader', 'less-loader']
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      use: 'url-loader?limit=10000!img?progressive=true'
    },
    {
      test: /\.(eot|woff|woff2|ttf|svg|mp3|mp4)$/,
      use: 'url-loader?limit=10000'
    },
    {
      test: /\.html$/,
      use: "html-loader"
    },],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      test: /\.jsx?$/i,
    }), new OptimizeCSSAssetsPlugin({})],
  },
};
