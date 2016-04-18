'use strict';

const gotOrNot = require('got-or-not');

const data = require('../data/data.js');

let files = data.routes.map((file) => {
  if (!file.match(/\.[A-Za-z0-9]+$/)) {
    // If there is no alphanumeric extension,
    // Assume that this is a folder,
    // which will serve an index.html by default
    file = `${file}/index.html`;
  }
  return `./dist${file}`;
});

gotOrNot({
  files,
});

