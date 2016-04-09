'use strict';

const path = require('path');

const webpack = require('webpack');
const reactpubWebpack = require('reactpub/webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const data = require('./data/data.js');

let cwd = process.cwd();

let webpackConfig = reactpubWebpack({
  data,
});

let extractCss = new extractTextPlugin('[name].css', {
  allChunks: true,
});
let noErrors = new webpack.NoErrorsPlugin();
let toPath = path.resolve(cwd, './articles');
console.log('toPath', toPath);
let copyWebpack = new copyWebpackPlugin([
  {
    from: 'src/documents/articles',
    to: 'articles',
    force: true,
  },
  {
    from: 'src/files/images',
    to: 'images',
    force: true,
  },
  {
    from: 'src/CNAME',
    to: 'CNAME',
    toType: 'file',
    force: true,
  },
  {
    from: 'src/robots.txt',
    to: 'robots.txt',
    toType: 'file',
    force: true,
  }
], {
  ignore: [
    { glob: '**/*.md', dot: true },
    { glob: '**/*.html', dot: true }
  ],
});

let plugins = webpackConfig.plugins;

plugins.push(noErrors);
plugins.push(extractCss);
plugins.push(copyWebpack);

let loaders = webpackConfig.module.loaders;

loaders.push({
  test: /\.css$/,
  loader: extractTextPlugin.extract(
    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
});

console.log(webpackConfig);

module.exports = webpackConfig;
