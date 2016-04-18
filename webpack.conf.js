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
    from: 'src/files/CNAME',
    to: 'CNAME',
    toType: 'file',
    force: true,
  },
  {
    from: 'src/files/robots.txt',
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
let copyWebpack2 = new copyWebpackPlugin([
  {
    from: 'src/documents/presentations',
    to: 'presentations',
    force: true,
  },
  {
    from: 'node_modules/reveal.js/js',
    to: '3rd-party/revealjs/js',
    force: true,
  },
  {
    from: 'node_modules/reveal.js/css',
    to: '3rd-party/revealjs/css',
    force: true,
  },
  {
    from: 'node_modules/reveal.js/img',
    to: '3rd-party/revealjs/img',
    force: true,
  },
  {
    from: 'node_modules/reveal.js/lib',
    to: '3rd-party/revealjs/lib',
    force: true,
  },
  {
    from: 'node_modules/reveal.js/plugin',
    to: '3rd-party/revealjs/plugin',
    force: true,
  },
  {
    from: 'node_modules/font-awesome/fonts',
    to: '3rd-party/font-awesome/fonts',
    force: true,
  },
  {
    from: 'node_modules/font-awesome/css',
    to: '3rd-party/font-awesome/css',
    force: true,
  }
], {
  ignore: [
    { glob: '**/*.eco', dot: true }
  ],
});

let plugins = webpackConfig.plugins;

if (!('CI' in process.env)) {
  // Only use the no errors plugin when not running on a
  // continuous integration environment
  // The CI environment (e.g. TravisCI) is expected to set the
  // "CI" environment variable
  let noErrors = new webpack.NoErrorsPlugin();
  plugins.push(noErrors);
}
plugins.push(extractCss);
plugins.push(copyWebpack);
plugins.push(copyWebpack2);

let loaders = webpackConfig.module.loaders;

loaders.push({
  test: /\.css$/,
  loader: extractTextPlugin.extract(
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'),
});

console.log(webpackConfig);

module.exports = webpackConfig;
