const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  return {
    context: resolve('src'),
    entry: {
      app: './index.js',
      vendor: [
        'angular',
        'angular-material',
        'angular-material/angular-material.scss',
        'angular-animate',
        'angular-aria',
        'angular-ui-router',
        'oclazyload'
      ]
    },
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('dist'),
      pathinfo: ifNotProd()
    },
    devtool: ifProd('source-map', 'eval'),
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    devServer: {
      historyApiFallback: true,
      inline: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'}
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true
              }
            }
          ],
        }
      ]
    },
    plugins: removeEmpty([
      ifProd(new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      })),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      })),
      new HtmlWebpackPlugin({
        template: './index.ejs',
        inject: 'head',
      }),
    ])
  }
};
