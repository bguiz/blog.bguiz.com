'use strict';

const path = require('path');
const fs = require('fs');

const moment = require('moment');

const generateData = require('reactpub/generate-data');

let cwd = process.cwd();
let matchMarkdownPostAltRegex = /^(\d\d\d\d)-(\d\d)-(.*)\.md$/;
let matchMarkdownPostRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)-(.*)\.html\.md$/;
let matchMarkdownArticleRegex = /^(.+)\.html\.md$/;
let matchHtmlPostRegex = /^(\d\d\d\d)-(\d\d)-(\d\d)-(.*)\.html$/;
let tagMap = {};
let pagination = [];
let paginationSize = 5;
let options = {
  dirs: [
    {
      path: path.resolve(cwd, './src/documents/reactpubposts/'),
      regexes: [ matchMarkdownPostAltRegex ],
    },
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
    },
    {
      path: path.resolve(cwd, './src/documents/articles/'),
      regexes: [ matchMarkdownArticleRegex ],
    }
  ],
  postToRouteMapper(post) {
    post.meta = Object.assign({}, post.header, post.meta);
    let urlAlias = post.header['dateurls-override'];
    if (typeof urlAlias === 'string' &&
      post.file.fullpath.indexOf('src/documents/tumblrposts') >= 0) {
      post.header.urlAliases= [urlAlias];
    }
    let url;
    if (post.file.fullpath.indexOf('src/documents/reactpubposts') >= 0) {
      var date = moment(post.header.__date_utc)
        .zone('+08:00')
        .format('YYYY');
      url = (`/${date}/${post.file.matches[3]}`);
    }
    else if (post.file.fullpath.indexOf('src/documents/articles') >= 0) {
      url = '/articles/'+post.file.fullpath.slice(cwd.length + 24, -8);
      post.file.slug = post.file.matches[1];
    }
    else {
      url = (`/${post.file.matches[1]}/${post.file.matches[2]}` +
        `/${post.file.matches[3]}/${post.file.matches[4]}`);
    }
    post.header.url = url;

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

generateData(options)
  .then((data) => {
    // additional hardcoded paths:
    data.routes.push('/');
    data.routes.push('/archives');
    data.routes.push('/404.html');
    data.routes.push('/presentations');
    data.routes.push('/books');

    // presentation data:
    //TODO presently hardcoded, should detect from file system instead
    data.props.presentations = [
      {
        meta: {
          url: '/presentations/publish-websites-reactjs/',
          title: 'Publish Websites with ReactJs',
          subtitle: 'git push -> webpack -> reactjs -> travis -> gh-pages',
        },
      },
      {
        meta: {
          url: '/presentations/haxe-for-javascripters/',
          title: 'Haxe for Javascripters',
          subtitle: 'Have you tried Haxe yet?',
        },
      },
      {
        meta: {
          url: '/presentations/software-stewardship/',
          title: 'Software Stewardship',
          subtitle: 'How to be a good "maintainer" of your software project',
        },
      },
      {
        meta: {
          url: '/presentations/chrome-dev-tools/',
          title: 'Chrome Dev Tools',
          subtitle: 'How to use your browser effectively for web development',
        },
      }
    ];

    // book data:
    //TODO presently hardcoded, should detect from file system instead
    data.props.books = [
      {
        meta: {
          url: 'http://angularjs-emberjs-compare.bguiz.com/',
          title: 'AngularJs vs EmberJs',
          subtitle: 'A guide to choosing a single-page application framework',
        },
      }
    ];

    // additional tag paths:
    Object.keys(tagMap).forEach((tag) => {
      data.routes.push(`/tags/${tag}`);
    });

    // additional pagination paths:
    let posts = Object.keys(data.props.routes)
      .map((url) => {
        return data.props.routes[url];
      })
      .sort((postA, postB) => {
        return (postB.meta.date - postA.meta.date);
      });
    //TODO no need for nested loops here, simply use modulo to detect next group
    for (let postIdx = 0; postIdx < posts.length; postIdx = postIdx + paginationSize) {
      let maxPostIdx = Math.min(postIdx + paginationSize, posts.length);
      let paginationGroup = [];
      for (let copyIdx = postIdx; copyIdx < maxPostIdx; ++copyIdx) {
        paginationGroup.push(posts[copyIdx].meta.url);
      }
      pagination.push(paginationGroup);
      data.routes.push(`/page/${pagination.length}`);
    }


    data.props.title = 'Brendan Graetz';
    data.props.tagMap = tagMap;
    data.props.pagination = pagination;
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
