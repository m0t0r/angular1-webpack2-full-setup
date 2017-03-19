const { resolve } = require('path');
const { getIfUtils } = require('webpack-config-utils');

module.exports = env => {
  const { ifProd, ifNotProd } = getIfUtils(env);

  return {
    context: resolve('src'),
    entry: './index.js',
    output: {
      filename: 'bundle.js',
      path: resolve('dist'),
      publicPath: '/dist/',
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
    plugins: [
    ]
  }
};
