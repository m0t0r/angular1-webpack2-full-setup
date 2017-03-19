const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  const extractCSS = new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css'));
  const extractSASS = new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css'));

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
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        },
        {
          test: /\.scss$/,
          use: extractSASS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
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
      new OfflinePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"'),
          BABEL_ENV: ifProd('"production"', '"development"')
        }
      }),
      new HtmlWebpackPlugin({
        template: './index.ejs'
      }),
      extractCSS,
      extractSASS
    ])
  }
};
