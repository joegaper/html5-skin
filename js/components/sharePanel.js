/********************************************************************
 SHARE PANEL
 *********************************************************************/
/**
 * Panel component for Share Screen.
 *
 * @class SharePanel
 * @constructor
 */
var React = require('react'),
    ClassNames = require('classnames'),
    Utils = require('./utils'),
    CONSTANTS = require('../constants/constants');

var SharePanel = React.createClass({
  tabs: {SHARE: "share", EMBED: "embed"},

  getInitialState: function() {
    return {
      activeTab: this.tabs.SHARE,
      hasError: false
    };
  },

  getActivePanel: function() {
    if (this.state.activeTab === this.tabs.SHARE) {
      var titleString = Utils.getLocalizedString(this.props.language, CONSTANTS.SKIN_TEXT.SHARE_CALL_TO_ACTION, this.props.localizableStrings);
      var startAtString = Utils.getLocalizedString(this.props.language, CONSTANTS.SKIN_TEXT.START_AT, this.props.localizableStrings);
      var hostURL = (this.props.contentTree.hostedAtURL != "") ? this.props.contentTree.hostedAtURL : parent.location.href;
      
      return (
        <div className="shareTabPanel">
          <div className="social-action-text text-capitalize">{titleString}</div>
          <a className="twitter" onClick={this.handleTwitterClick}> </a>
          <a className="facebook" onClick={this.handleFacebookClick}> </a>
          <a className="googlePlus" onClick={this.handleGPlusClick}> </a>
          <a className="emailShare" onClick={this.handleEmailClick}> </a>
          <br/>

          <form className="form-inline">
            <div className="form-group">
              <label className="sr-only" htmlFor="oo-url">url</label>
              <input className="form-control" type='url' defaultValue={hostURL} id="oo-url"/>
            </div>

            <label className="checkbox-inline">
              <input type="checkbox" />{startAtString}
            </label>

            <div className="form-group">
              <label className="sr-only" htmlFor="oo-start-at">{startAtString}</label>
              <input className="form-control start-at" type='text' id="oo-start-at" defaultValue={Utils.formatSeconds(this.props.currentPlayhead)} />
            </div>
          </form>
        </div>
      );
    }

    else if (this.state.activeTab === this.tabs.EMBED) {
      try {
        var iframeURL = this.props.skinConfig.shareScreen.embed.source
          .replace("<ASSET_ID>", this.props.assetId)
          .replace("<PLAYER_ID>", this.props.playerParam.playerBrandingId)
          .replace("<PUBLISHER_ID>", this.props.playerParam.pcode);
      } catch(err) {
        iframeURL = "";
      }

      return (
        <div className="shareTabPanel">
          <textarea className="form-control"
                    rows="3"
                    value={iframeURL}
                    readOnly />
        </div>
      );
    }
  },

  handleEmailClick: function(event) {
    event.preventDefault();
    var emailBody = Utils.getLocalizedString(this.props.language, CONSTANTS.SKIN_TEXT.EMAIL_BODY, this.props.localizableStrings);
    var mailToUrl = "mailto:";
    mailToUrl += "?subject=" + encodeURIComponent(this.props.contentTree.title);
    mailToUrl += "&body=" + encodeURIComponent(emailBody + location.href);
    //location.href = mailToUrl; //same window
    window.open(mailToUrl, "_blank", "height=315,width=780"); //new window
  },

  handleFacebookClick: function() {
    var facebookUrl = "http://www.facebook.com/sharer.php";
    var hostURL = (this.props.contentTree.hostedAtURL != "") ? this.props.contentTree.hostedAtURL : parent.location.href;
    facebookUrl += "?u=" + encodeURIComponent(hostURL);
    window.open(facebookUrl, "facebook window", "height=315,width=780");
  },

  handleGPlusClick: function() {
    var gPlusUrl = "https://plus.google.com/share";
    var hostURL = (this.props.contentTree.hostedAtURL != "") ? this.props.contentTree.hostedAtURL : parent.location.href;
    gPlusUrl += "?url=" + encodeURIComponent(hostURL);
    window.open(gPlusUrl, "google+ window", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");
  },

  handleTwitterClick: function() {
    var twitterUrl = "https://twitter.com/intent/tweet";
    var hostURL = (this.props.contentTree.hostedAtURL != "") ? this.props.contentTree.hostedAtURL : parent.location.href;
    twitterUrl += "?text=" + encodeURIComponent(this.props.contentTree.title+": ");
    twitterUrl += "&url=" + encodeURIComponent(hostURL);
    window.open(twitterUrl, "twitter window", "height=300,width=750");
  },

  showPanel: function(panelToShow) {
    this.setState({activeTab: panelToShow});
  },

  render: function() {
    var shareTab = ClassNames({
      'shareTab': true,
      'active': this.state.activeTab == this.tabs.SHARE
    });
    var embedTab = ClassNames({
      'embedTab': true,
      'active': this.state.activeTab == this.tabs.EMBED
    });

    var shareString = Utils.getLocalizedString(this.props.language, CONSTANTS.SKIN_TEXT.SHARE, this.props.localizableStrings),
        embedString = Utils.getLocalizedString(this.props.language, CONSTANTS.SKIN_TEXT.EMBED, this.props.localizableStrings);

    return (
      <div className="share-container">
        <div className="tabRow">
          <a className={shareTab} onClick={this.showPanel.bind(this, this.tabs.SHARE)}>{shareString}</a>
          <a className={embedTab} onClick={this.showPanel.bind(this, this.tabs.EMBED)}>{embedString}</a>
        </div>
        {this.getActivePanel()}
      </div>
    );
  }
});

SharePanel.defaultProps = {
  contentTree: {
    title: ''
  }
};

module.exports = SharePanel;
