'use strict';

const React = require('react');
const ReactShare = require('react-share');
const reactCssModules = require('react-css-modules');

const config = require('reactpub/settings.js').get('config');
const shareButtonsCss = require('./share-buttons.css');

const ReactShareButtons = ReactShare.ShareButtons;
const ReactShareCounts = ReactShare.ShareCounts;

const FacebookShareButton = ReactShareButtons.FacebookShareButton;
const GooglePlusShareButton = ReactShareButtons.GooglePlusShareButton;
const LinkedinShareButton = ReactShareButtons.LinkedinShareButton;
const TwitterShareButton = ReactShareButtons.TwitterShareButton;
const PinterestShareButton = ReactShareButtons.PinterestShareButton;


const FacebookShareCount = ReactShareCounts.FacebookShareCount;
const GooglePlusShareCount = ReactShareCounts.GooglePlusShareCount;
const LinkedinShareCount = ReactShareCounts.LinkedinShareCount;
//NOTE Twitter does not support share counts
// const TwitterShareCount = ReactShareCounts.TwitterShareCount;
const PinterestShareCount = ReactShareCounts.PinterestShareCount;

let ShareButtons = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    media: React.PropTypes.string,
  },

  render() {
    let PinterestShareItem = (!this.props.media) ?
      undefined :
      <li styleName="share-item">
        <PinterestShareButton
          url={this.props.url}
          media={this.props.media}
          styleName="share-button-pinterest">
          <span className="fa fa-pinterest" />
          <PinterestShareCount
            url={this.props.url}
            className="share-count">
            {this.shareCountDisplay}
          </PinterestShareCount>
        </PinterestShareButton>
      </li>;

    return (
      <div styleName="share-buttons">
        <ul styleName="share-items">

          <li styleName="share-item">
            <a
              href={this.emailHref()}
              styleName="share-button-email">
              <span className="fa fa-envelope" />
              <div className="share-count">
                &nbsp;
              </div>
            </a>
          </li>

          <li styleName="share-item">
            <FacebookShareButton
              url={this.props.url}
              title={this.props.title}
              styleName="share-button-facebook">
              <span className="fa fa-facebook" />
              <FacebookShareCount
                url={this.props.url}
                className="share-count">
                {this.shareCountDisplay}
              </FacebookShareCount>
            </FacebookShareButton>
          </li>

          <li styleName="share-item">
            <TwitterShareButton
              url={this.props.url}
              title={this.props.title}
              styleName="share-button-twitter">
              <span className="fa fa-twitter" />
              <div className="share-count">
                &nbsp;
              </div>
            </TwitterShareButton>
          </li>

          <li styleName="share-item">
            <GooglePlusShareButton
              url={this.props.url}
              styleName="share-button-google-plus">
              <span className="fa fa-google-plus" />
              <GooglePlusShareCount
                url={this.props.url}
                className="share-count">
                {this.shareCountDisplay}
              </GooglePlusShareCount>
            </GooglePlusShareButton>
          </li>

          <li styleName="share-item">
            <LinkedinShareButton
              url={this.props.url}
              title={this.props.title}
              styleName="share-button-linkedin">
              <span className="fa fa-linkedin" />
              <LinkedinShareCount
                url={this.props.url}
                className="share-count">
                {this.shareCountDisplay}
              </LinkedinShareCount>
            </LinkedinShareButton>
          </li>

          {PinterestShareItem}
        </ul>
      </div>
    );
  },

  emailHref() {
    let subject = this.props.title;
    let body = this.props.url;
    return `mailto:?subject=${subject}&amp;body=${body}`;
  },

  shareCountDisplay(count) {
    //NOTE need to use dangerouslySetInnerHTML as otherwise &nbsp; is escaped
    return (
      <span
        className="share-count-inner"
        dangerouslySetInnerHTML={{
          __html: this.shareCount(count),
        }} />);
  },

  shareCount(count) {
    count = +count;
    if (isNaN(count) || count < 1) {
      return '&nbsp;';
    }
    else if (count > 1000000) {
      return (Math.round(count / 100000) / 10) + 'M';
    }
    else if (count > 1000) {
      return (Math.round(count / 100) / 10) + 'K';
    }
    else {
      return count + '';
    }
  },
});

module.exports = reactCssModules(ShareButtons, shareButtonsCss);
