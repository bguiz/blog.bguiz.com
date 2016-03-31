'use strict';

const webpack = require('webpack');
const reactpubWebpack = require('reactpub/webpack');

const data = require('./data/data.js');

let webpackConfig = reactpubWebpack({
  data,
});

console.log(webpackConfig);

module.exports = webpackConfig;
