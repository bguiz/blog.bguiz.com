'use strict';

const React = require('react');
const Helmet = require('react-helmet');
const reactCssModules = require('react-css-modules');

const booksPageCss = require('./books-page.css');
const data = require('reactpub/settings.js').get('data');

let BooksPage = React.createClass({
  render() {
    let books = this.getBooks();
    let header = this.getHeader();
    return (
      <div id="page-pagination" className="page page-pagination">
        <Helmet
          meta={header.meta}
          link={header.link}
          title={`Books`}>
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

  getHeader() {
    return {
      meta: [
        {
          name: 'og:title',
          content: 'Books by Brendan Graetz',
        },
        {
          name: 'og:url',
          content: 'http://blog.bguiz.com'+this.props.location.pathname,
        },
        {
          name: 'og:image',
          content: 'http://blog.bguiz.com/images/logo-400px.png',
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: 'http://bguiz.com'+this.props.location.pathname,
        }
      ],
    };
  },
});

module.exports = reactCssModules(BooksPage, booksPageCss);


