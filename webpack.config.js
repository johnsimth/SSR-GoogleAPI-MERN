const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './source/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      shared: path.resolve(__dirname, 'source/shared/'),
      client: path.resolve(__dirname, 'source/client/'),
      server: path.resolve(__dirname, 'source/server/'),
    }
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    hot: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3333/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: process.env.NODE_ENV === 'production',
      compress: process.env.NODE_ENV === 'production'
    })
  );
}
module.exports = config;