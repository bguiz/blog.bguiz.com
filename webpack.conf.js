'use strict';

const webpack = require('webpack');
const reactpubWebpack = require('reactpub/webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');

const data = require('./data/data.js');

let webpackConfig = reactpubWebpack({
  data,
});

let extractCss = new extractTextPlugin('[name].css', {
  allChunks: true,
});
let noErrors = new webpack.NoErrorsPlugin();

let plugins = webpackConfig.plugins;

plugins.push(noErrors);
plugins.push(extractCss);

let loaders = webpackConfig.module.loaders;

loaders.push({
  test: /\.css$/,
  loader: extractTextPlugin.extract(
    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
});

console.log(webpackConfig);

module.exports = webpackConfig;
