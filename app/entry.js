'use strict';

const reactpubSettings = require('reactpub/settings');
const theme = require('reactpub-blog-basic-theme');

const data = require('../data/data.js');
const config = require('./config.js');
reactpubSettings.set({
  data,
  config,
});
module.exports = theme.render();
