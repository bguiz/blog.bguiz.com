'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const reactCssModules = require('react-css-modules');

const booksPageCss = require('./books-page.css');
const data = require('../../data/data.js');

let BooksPage = React.createClass({
  render() {
    let books = this.getBooks();
    return (
      <div id="page-pagination" className="page page-pagination">
        <Helmet
          title={`Presentations`}>
        </Helmet>
        <h1 id="page-title" className="page-title">
          Books by Brendan Graetz
        </h1>
        <div id="page-body" className="page-body">
          <ul>
            {books.map((book) => {
              return (
                <li
                  styleName="book-item"
                  key={book.meta.url}>
                  <a
                    title={book.meta.title}
                    href={book.meta.url}>
                    <div styleName="book-item-title">
                      {book.meta.title}
                    </div>
                    <div styleName="book-item-subtitle">
                      {book.meta.subtitle}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  },

  getBooks() {
    return data.props.books;
  },
});

module.exports = reactCssModules(BooksPage, booksPageCss);


