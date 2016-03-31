'use strict';

const path = require('path');
const fs = require('fs');

const generateDataForSsgwp = require('find-posts/generate-data-for-ssgwp');

let cwd = process.cwd();
let matchMarkdownPostRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)-(.*)\.html\.md$/;
let matchHtmlPostRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)-(.*)\.html$/;
let options = {
  dirs: [
    {
      path: path.resolve(cwd, './src/documents/docpadposts/'),
      regexes: [ matchMarkdownPostRegex ],
    },
    {
      path: path.resolve(cwd, './src/documents/tumblrposts/'),
      regexes: [ matchHtmlPostRegex ],
    },
    {
      path: path.resolve(cwd, './src/documents/wordpressposts/'),
      regexes: [ matchHtmlPostRegex ],
    }
  ],
  postToRouteMapper(post) {
    var urlAlias = post.header['dateurls-override'];
    if (typeof urlAlias === 'string' &&
      post.file.fullpath.indexOf('tumblrposts') >= 0) {
      post.meta = {
        urlAliases: [urlAlias],
      };
    }
    return post;
  },
};

generateDataForSsgwp(options)
  .then((data) => {
    data.routes.push('/');
    data.props.title = 'Brendan Graetz';
    fs.writeFileSync(
      path.resolve(__dirname, '../data/data.js'),
      `module.exports = ${JSON.stringify(data, undefined, '  ')};`);
    console.log('URLs:', data.routes.length);
    console.log('Routes:', Object.keys(data.props.routes).length);
    console.log('Aliases:', Object.keys(data.props.aliases).length)
  })
  .catch((err) => {
    console.error(err);
  });
