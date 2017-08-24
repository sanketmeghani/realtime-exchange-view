import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'static-test/index')
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  target: 'web',
  output: {
    sourceMapFilename: './bundle.js.map',
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      include: [path.join(__dirname, 'static-test'), path.join(__dirname, 'src')],
      loaders: ['babel-loader']
    }, {
      test: /(\.css)$/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader'
    }, {
      test: /\.(woff|woff2)$/,
      loader: 'url?prefix=font/&limit=5000'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.json/,
      loader: 'json-loader'
    }]
  }
};