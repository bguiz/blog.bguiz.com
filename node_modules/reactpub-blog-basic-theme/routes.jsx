'use strict';

const React = require('react');
const ReactRouter = require('react-router');

const Root = require('./root.jsx');
const IndexPage = require('./page/index-page.jsx');
const PostPage = require('./page/post-page.jsx');
const AliasPostPage = require('./page/alias-post-page.jsx');
const TagPage = require('./page/tag-page.jsx');
const PaginationPage = require('./page/pagination-page.jsx');
const ArchivePage = require('./page/archive-page.jsx');
const PresentationsPage = require('./page/presentations-page.jsx');
const BooksPage = require('./page/books-page.jsx');
const Four04Page = require('./page/404-page.jsx');
const ArticlePage = require('./page/article-page.jsx');

let Route = ReactRouter.Route;
let IndexRoute = ReactRouter.IndexRoute;

let Routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={IndexPage} />
    <Route path="page/:pageId" component={PaginationPage} />
    <Route path=":year/:month/:day/:slug" component={PostPage} />
    <Route path="post/:tumblrId/:slug" component={AliasPostPage} />
    <Route path="tags/:tagId" component={TagPage} />
    <Route path="archives" component={ArchivePage} />
    <Route path="presentations" component={PresentationsPage} />
    <Route path="books" component={BooksPage} />
    <Route path="articles/*" component={ArticlePage} />
    <Route path="404.html" component={Four04Page} />
  </Route>
);

module.exports = Routes;
