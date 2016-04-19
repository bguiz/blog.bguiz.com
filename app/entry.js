'use strict';

const theme = require('reactpub-blog-basic-theme');

theme.settings.set({
  data: require('../data/data.js'),
  config: require('./config.js'),
});

module.exports = theme.render();
