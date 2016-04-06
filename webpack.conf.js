'use strict';

const webpack = require('webpack');
const reactpubWebpack = require('reactpub/webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');

const data = require('./data/data.js');

let webpackConfig = reactpubWebpack({
  data,
});

let plugins = webpackConfig.plugins;

let extractSass = new extractTextPlugin('[name].css');

plugins.push(
  // When compilation fails, do not publish
  new webpack.NoErrorsPlugin());

plugins.push(
  extractSass);

let loaders = webpackConfig.module.loaders;

loaders.push(
  {
    test: /\.scss$/,
    loader: extractSass.extract(['css', 'sass']),
  });

console.log(webpackConfig);

module.exports = webpackConfig;
