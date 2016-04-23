'use strict';

module.exports = getWebpackConfig;

function getWebpackConfig() {
  const path = require('path');

  const copyWebpackPlugin = require('copy-webpack-plugin');
  const themeWebpack = require('reactpub-blog-basic-theme/webpack');

  const data = require('../data/data.js');

  let webpackConfig = themeWebpack({
    data,
  });

  let cwd = process.cwd();

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

  let copyWebpackForPresentations = new copyWebpackPlugin([
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
    const webpack = require('webpack');
    let noErrors = new webpack.NoErrorsPlugin();
    plugins.push(noErrors);
  }

  plugins.push(copyWebpack);
  plugins.push(copyWebpackForPresentations);

  return webpackConfig;
}
