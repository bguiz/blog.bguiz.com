'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const Root = require('./root.jsx');
const Index = require('./index.jsx');
const Post = require('./post.jsx');
const AliasPost = require('./alias-post.jsx');
const TagPage = require('./tag-page.jsx');
const PaginationPage = require('./pagination-page.jsx');
const Four04Page = require('./404-page.jsx');

let Route = ReactRouter.Route;
let IndexRoute = ReactRouter.IndexRoute;

let Routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Index} />
    <Route path=":year/:month/:day/:slug" component={Post} />
    <Route path="post/:tumblrId/:slug" component={AliasPost} />
    <Route path="tags/:tagId" component={TagPage} />
    <Route path="page/:pageId" component={PaginationPage} />
    <Route path="404.html" component={Four04Page} />
  </Route>
);

module.exports = Routes;
