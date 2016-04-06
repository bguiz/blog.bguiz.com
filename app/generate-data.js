'use strict';

const path = require('path');
const fs = require('fs');

const generateDataForSsgwp = require('find-posts/generate-data-for-ssgwp');

let cwd = process.cwd();
let matchMarkdownPostRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)-(.*)\.html\.md$/;
let matchHtmlPostRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)-(.*)\.html$/;
let tagMap = {};
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
    let urlAlias = post.header['dateurls-override'];
    if (typeof urlAlias === 'string' &&
      post.file.fullpath.indexOf('tumblrposts') >= 0) {
      post.meta = {
        urlAliases: [urlAlias],
      };
    }
    let url = (`/${post.file.year}/${post.file.month}/${post.file.day}/${post.file.slug}`);
    // We create a side effect by means of closure in order to maintain
    // a mapping of tag to list of post urls
    let tags = post.header.__tags || [];
    tags.forEach((tag) => {
      let tagPostUrls = tagMap[tag];
      if (!tagPostUrls) {
        tagMap[tag] = [];
        tagPostUrls = tagMap[tag];
      }
      tagPostUrls.push(url);
    });
    return post;
  },
};

generateDataForSsgwp(options)
  .then((data) => {
    // additional hardcoded paths:
    data.routes.push('/');
    data.routes.push('/404.html');

    // additional tag paths:
    Object.keys(tagMap).forEach((tag) => {
      data.routes.push(`/tags/${tag}`);
    });

    data.props.title = 'Brendan Graetz';
    data.props.tagMap = tagMap;
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
