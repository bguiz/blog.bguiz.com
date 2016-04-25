'use strict';

const gotOrNot = require('got-or-not');

const data = require('../data/data.js');

if (!data.props.aliases ||
    Object.keys(data.props.aliases).length < 1) {
  // We know that this blog should have some aliases
  throw new Error('Expected at least 1 alias.');
}

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

