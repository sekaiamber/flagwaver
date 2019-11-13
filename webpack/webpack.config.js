const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const packageJson = require('../package.json');



module.exports = {
  mode: 'development',
  context: path.join(__dirname, '..', 'src/'),
  entry: {
    t9flag: './index.js'
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageJson.version),
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new WriteFilePlugin()
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['t9flag'],
    }),
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [
        path.join(__dirname, '..', 'src'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
      ],
    }, {
      test: /\.less$/,
      use: [{
          loader: 'style-loader'
        }, // creates style nodes from JS strings
        {
          loader: 'css-loader'
        }, // translates CSS into CommonJS
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }, // compiles Less to CSS
      ],
    }, {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        },
      ],
    }, {
      test: /\.(png|jpg|gif|svg|mp3|mp4)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }, ],
    }, {
      test: /\.glsl$/,
      use: [{
        loader: 'webpack-glsl-loader',
      }, ],
    }, ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, '..', 'www'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
