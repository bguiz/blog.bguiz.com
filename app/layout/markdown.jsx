'use strict';

const React = require('react');
const marked = require('marked');
const reactCssModules = require('react-css-modules');

const data = require('../../data/data.js');
const markdownCss = require('./markdown.css');

let Markdown = React.createClass({
  getInitialState() {
    return {
    };
  },

  componentWillReceiveProps(nextProps) {
    this.loadPostBody(nextProps);
  },

  render() {
    let markup = this.getMarkup(this.props.markdown);
    return (
      <span
        styleName="markdown-render"
        dangerouslySetInnerHTML={markup} />
    );
  },

  loadPostBody(props) {
    props = props || this.props;
    if (props.markdown) {
      let markup = this.getMarkup(props.markdown);
      this.setState({
        markup,
      });
    }
    else {
      //TODO load asynchonously based on this.props.src
      // this.getMarkup('?????');
      // this.setState({
      //   markup,
      // });
    }
  },

  getMarkup(markdown) {
    let markup = marked(
      // '### sub3 heading\n\nThis is **bold** and *italic*.',
      markdown,
      { sanitize: true }
    );
    markup = {
      __html: markup,
    }
    return markup;
  },

});

module.exports = reactCssModules(Markdown, markdownCss);
