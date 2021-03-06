const path = require('path');
const webpack = require('webpack');

module.exports = {
  watch: true,
  context: path.join(__dirname, 'app'),
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './renderers/dom.js'
  ],
  output: {
    filename: 'app.js',
    publicPath: '/assets/',
  },
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ],


  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};