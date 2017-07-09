const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BUILD = path.join(__dirname, './public/js/app');
const APP = path.join(__dirname, './public/app/src');

const extractSass = new ExtractTextPlugin({
  filename: "[name].css"
});

const config = [{
  entry: {
    main: [
      './sass/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/css'),
    filename: '[name].css'
  },
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.scss$/,
      loader: extractSass.extract({
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true,
            minimize: true
          }
        }, {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }, {
      test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
      use: [{
        loader: "file-loader"
      }]
    }]
  },
  plugins: [
    extractSass
  ]
},{
  entry: {
    main: [
      './public/js/src/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/js/min'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    })
  ]
}, {
  entry: {
    mta: path.join(APP, 'mta/app.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: BUILD
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      loader: "babel-loader"
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      comments: false,
      beautify: false
    })
  ]
}];

module.exports = config;
