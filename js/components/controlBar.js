/********************************************************************
  CONTROL BAR
*********************************************************************/
var React = require('react'),
    ReactDOM = require('react-dom'),
    CONSTANTS = require('../constants/constants'),
    ClassNames = require('classnames'),
    Slider = require('./slider'),
    Utils = require('./utils'),
    VideoQualityPopover = require('./videoQualityPopover'),
    Icon = require('../components/icon');

var ControlBar = React.createClass({
  getInitialState: function() {
    this.isMobile = this.props.controller.state.isMobile;
    this.responsiveUIMultiple = this.getResponsiveUIMultiple(this.props.responsiveView);
    this.volumeSliderValue = 0;
    this.moreOptionsItems = null;

    return {
      currentVolumeHead: 0,
      showVideoQualityPopover: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // if responsive breakpoint changes
    if (nextProps.responsiveView != this.props.responsiveView) {
      this.responsiveUIMultiple = this.getResponsiveUIMultiple(nextProps.responsiveView);
    }
  },

  componentWillUnmount: function () {
    this.props.controller.cancelTimer();
    if (Utils.isAndroid()){
      this.props.controller.hideVolumeSliderBar();
    }
  },

  getResponsiveUIMultiple: function(responsiveView){
    var multiplier = this.props.skinConfig.responsive.breakpoints[responsiveView].multiplier;
    return multiplier;
  },

  handleControlBarMouseUp: function(evt) {
    if (evt.type == 'touchend' || !this.isMobile){
      evt.stopPropagation(); // W3C
      evt.cancelBubble = true; // IE
      this.props.controller.state.accessibilityControlsEnabled = true;
      this.props.controller.startHideControlBarTimer();
    }
  },

  handleFullscreenClick: function(evt) {
    // On mobile, we get a following click event that fires after the Video
    // has gone full screen, clicking on a different UI element. So we prevent
    // the following click.
    evt.stopPropagation();
    evt.cancelBubble = true;
    evt.preventDefault();
    this.props.controller.toggleFullscreen();
  },

  handleVolumeIconClick: function(evt) {
    if (this.isMobile){
      this.props.controller.startHideControlBarTimer();
      evt.stopPropagation(); // W3C
      evt.cancelBubble = true; // IE
      if (!this.props.controller.state.volumeState.volumeSliderVisible){
        this.props.controller.showVolumeSliderBar();
      }
      else {
        this.props.controller.handleMuteClick();
      }
    }
    else{
      this.props.controller.handleMuteClick();
    }
  },

  handlePlayClick: function() {
    this.props.controller.togglePlayPause();
  },

  handleShareClick: function() {
    this.props.controller.toggleShareScreen();
  },

  handleQualityClick: function() {
    if(this.props.responsiveView == this.props.skinConfig.responsive.breakpoints.xs.id) {
      this.props.controller.toggleScreen(CONSTANTS.SCREEN.VIDEO_QUALITY_SCREEN);
    } else {
      this.toggleQualityPopover();
    }

  },

  toggleQualityPopover: function() {
    this.setState({
      showVideoQualityPopover: !this.state.showVideoQualityPopover
    });
  },

  handleVolumeClick: function(evt) {
    evt.preventDefault();
    var newVolume = parseFloat(evt.target.dataset.volume);
    this.props.controller.setVolume(newVolume);
  },

  handleDiscoveryClick: function() {
    this.props.controller.toggleDiscoveryScreen();
  },

  handleMoreOptionsClick: function() {
    this.props.controller.toggleMoreOptionsScreen(this.moreOptionsItems);
  },

  handleClosedCaptionClick: function() {
    this.props.controller.toggleClosedCaptionScreen();
  },

  //TODO(dustin) revisit this, doesn't feel like the "react" way to do this.
  highlight: function(evt) {
    var color = this.props.skinConfig.controlBar.iconStyle.active.color;
    var opacity = this.props.skinConfig.controlBar.iconStyle.active.opacity;
    Utils.highlight(evt.target, opacity, color);
  },

  removeHighlight: function(evt) {
    var color = this.props.skinConfig.controlBar.iconStyle.inactive.color;
    var opacity = this.props.skinConfig.controlBar.iconStyle.inactive.opacity;
    Utils.removeHighlight(evt.target, opacity, color);
  },

  volumeHighlight:function() {
    this.highlight({target: ReactDOM.findDOMNode(this.refs.volumeIcon)});
  },

  volumeRemoveHighlight:function() {
    this.removeHighlight({target: ReactDOM.findDOMNode(this.refs.volumeIcon)});
  },

  handleWatermarkClick: function() {
    var watermarkClickUrl = this.props.skinConfig.controlBar.watermark.clickUrl;
    if (watermarkClickUrl){
      window.open(watermarkClickUrl,'_blank');
    }
  },

  changeVolumeSlider: function(event) {
    var newVolume = parseFloat(event.target.value);
    this.props.controller.setVolume(newVolume);
    this.setState({
      volumeSliderValue: event.target.value
    });
  },

  populateControlBar: function() {
    var dynamicStyles = this.setupItemStyle();
    var playIcon = "";
    if (this.props.playerState == CONSTANTS.STATE.PLAYING) {
      playIcon = "pause";
    } else if (this.props.playerState == CONSTANTS.STATE.END) {
      playIcon = "replay";
    } else {
      playIcon = "play";
    }

    var volumeIcon = (this.props.controller.state.volumeState.muted ? "volumeOff" : "volume");

    var fullscreenIcon = "";
    if (this.props.controller.state.fullscreen) {
      fullscreenIcon = "compress"
    }
    else {
      fullscreenIcon = "expand";
    }

    var totalTime = 0;
    if (this.props.duration == null || typeof this.props.duration == 'undefined' || this.props.duration == ""){
      totalTime = Utils.formatSeconds(0);
    }
    else {
      totalTime = Utils.formatSeconds(this.props.duration);
    }

    var volumeBars = [];
    for (var i=0; i<10; i++) {
      //create each volume tick separately
      var turnedOn = this.props.controller.state.volumeState.volume >= (i+1) / 10;
      var volumeClass = ClassNames({
        "volumeBar": true,
        "on": turnedOn
      });
      volumeBars.push(<a data-volume={(i+1)/10} className={volumeClass} key={i}
        onClick={this.handleVolumeClick}></a>);
    }

    var volumeSlider = <div className="volumeSlider"><Slider value={parseFloat(this.props.controller.state.volumeState.volume)}
                        onChange={this.changeVolumeSlider}
                        className={"slider slider-volume"}
                        itemRef={"volumeSlider"}
                        minValue={"0"}
                        maxValue={"1"}
                        step={"0.1"}/></div>;

    var volumeControls;
    if (!this.isMobile){
      volumeControls = volumeBars;
    }
    else {
      volumeControls = this.props.controller.state.volumeState.volumeSliderVisible ? volumeSlider : null;
    }

    var videoQualityPopover = this.state.showVideoQualityPopover ? <VideoQualityPopover {...this.props} togglePopoverAction={this.toggleQualityPopover}/> : null;
    var iconSetting = {};
    var durationSetting = {color: this.props.skinConfig.controlBar.iconStyle.inactive.color};
    var watermarkUrl = this.props.skinConfig.controlBar.watermark.imageResource.url;
    var currentPlayheadTime = isFinite(parseInt(this.props.currentPlayhead)) ? Utils.formatSeconds(parseInt(this.props.currentPlayhead)) : null;
    var totalTimeContent = this.props.authorization.streams[0].is_live_stream ? null : <span className="total-time">{totalTime}</span>;

    // TODO: Update when implementing localization
    var liveText = Utils.getLocalizedString(this.props.language, CONSTANTS.SKIN_TEXT.LIVE, this.props.localizableStrings);

    var qualityClass = ClassNames({
      "quality": true,
      "controlBarItem": true,
      "selected": this.state.showVideoQualityPopover
    });

    var watermarkClass = ClassNames({
      "watermark": true,
      "controlBarItem": true,
      "nonClickableWatermark": !this.props.skinConfig.controlBar.watermark.clickUrl
    });

    var controlItemTemplates = {
      "playPause": <button className="playPause controlBarItem" onClick={this.handlePlayClick} key="playPause">
        <Icon {...this.props} icon={playIcon}
          style={dynamicStyles.iconCharacter}
          onMouseOver={this.highlight} onMouseOut={this.removeHighlight}/>
      </button>,

      "live": <div className="live controlBarItem" key="live">
        <div className="liveIndicator">
          <div className="liveCircle"></div>
          <span className="liveText"> {liveText}</span>
        </div>
      </div>,

      "volume": <div className="volume controlBarItem" key="volume">
        <Icon {...this.props} icon={volumeIcon} ref="volumeIcon"
          style={this.props.skinConfig.controlBar.iconStyle.inactive}
          onClick={this.handleVolumeIconClick}
          onMouseOver={this.volumeHighlight} onMouseOut={this.volumeRemoveHighlight}/>
        {volumeControls}
      </div>,

      "timeDuration": <div className="timeDuration controlBarDuration" style={durationSetting} key="timeDuration">
        <span>{currentPlayheadTime}</span>{totalTimeContent}
      </div>,

      "flexibleSpace": <div className="flexibleSpace controlBarFlexSpace" key="flexibleSpace"></div>,

      "moreOptions": <button className="moreOptions controlBarItem"
        onClick={this.handleMoreOptionsClick} key="moreOptions">
        <Icon {...this.props} icon="ellipsis" style={dynamicStyles.iconCharacter}
          onMouseOver={this.highlight} onMouseOut={this.removeHighlight}/>
      </button>,

      "quality": (
        <div className="popover-button-container" key="quality">
          {videoQualityPopover}
          <button className={qualityClass} onClick={this.handleQualityClick}>
            <Icon {...this.props} icon="quality" style={dynamicStyles.iconCharacter}
              onMouseOver={this.highlight} onMouseOut={this.removeHighlight}/>
          </button>
        </div>
      ),

      "discovery": <button className="discovery controlBarItem"
        onClick={this.handleDiscoveryClick} key="discovery">
        <Icon {...this.props} icon="discovery" style={dynamicStyles.iconCharacter}
          onMouseOver={this.highlight} onMouseOut={this.removeHighlight}/>
      </button>,

      "closedCaption": <button className="closedCaption controlBarItem"
        onClick={this.handleClosedCaptionClick} key="closedCaption">
        <Icon {...this.props} icon="cc" style={dynamicStyles.iconCharacter}
          onMouseOver={this.highlight} onMouseOut={this.removeHighlight}/>
      </button>,

      "share": <button className="share controlBarItem"
        onClick={this.handleShareClick} key="share">
        <Icon {...this.props} icon="share" style={dynamicStyles.iconCharacter}
          onMouseOver={this.highlight} onMouseOut={this.removeHighlight}/>
      </button>,

      "fullscreen": <button className="fullscreen controlBarItem"
        onClick={this.handleFullscreenClick} key="fullscreen">
        <Icon {...this.props} icon={fullscreenIcon} style={dynamicStyles.iconCharacter}
          onMouseOver={this.highlight} onMouseOut={this.removeHighlight}/>
      </button>,

      "watermark": <div className={watermarkClass} key="watermark" style = {dynamicStyles.watermarkImageStyle}>
        <img src={watermarkUrl} onClick={this.handleWatermarkClick}/>
      </div>
    };

    var controlBarItems = [];
    var defaultItems = this.props.controller.state.isPlayingAd ? this.props.skinConfig.buttons.desktopAd : this.props.skinConfig.buttons.desktopContent;

    //if mobile and not showing the slider or the icon, extra space can be added to control bar width. If volume bar is shown instead of slider, add some space as well:
    var volumeItem = null;
    var extraSpaceVolume = 0;

    for (var j = 0; j < defaultItems.length; j++) {
      if (defaultItems[j].name == "volume") {
        volumeItem = defaultItems[j];

        var extraSpaceVolumeSlider = (((volumeItem && this.isMobile && !this.props.controller.state.volumeState.volumeSliderVisible) || volumeItem && Utils.isIos()) ? parseInt(volumeItem.minWidth) : 0);
        var extraSpaceVolumeBar = this.isMobile ? 0 : parseInt(volumeItem.minWidth)/2;
        extraSpaceVolume = extraSpaceVolumeSlider + extraSpaceVolumeBar;

        break;
      }
    }


    //if no hours, add extra space to control bar width:
    var hours = parseInt(this.props.duration / 3600, 10);
    var extraSpaceDuration = (hours > 0) ? 0 : 45;

    var controlBarLeftRightPadding = CONSTANTS.UI.DEFAULT_SCRUBBERBAR_LEFT_RIGHT_PADDING * 2;

    for (var k = 0; k < defaultItems.length; k++) {

      // filter out unrecognized button names
      if (typeof controlItemTemplates[defaultItems[k].name] === "undefined") {
        continue;
      }

      //do not show CC button if no CC available
      if (!this.props.controller.state.closedCaptionOptions.availableLanguages && (defaultItems[k].name === "closedCaption")){
        continue;
      }

      //do not show quality button if no bitrates available
      if (!this.props.controller.state.videoQualityOptions.availableBitrates && (defaultItems[k].name === "quality")){
        continue;
      }

      //do not show discovery button if no related videos available
      if (!this.props.controller.state.discoveryData && (defaultItems[k].name === "discovery")){
        continue;
      }

      if (Utils.isIos() && (defaultItems[k].name === "volume")){
        continue;
      }

      // Not sure what to do when there are multi streams
      if (defaultItems[k].name === "live" &&
          (typeof this.props.authorization === 'undefined' ||
          !(this.props.authorization.streams[0].is_live_stream))) {
        continue;
      }

      controlBarItems.push(defaultItems[k]);
    }

    var collapsedResult = Utils.collapse(this.props.componentWidth + this.responsiveUIMultiple * (extraSpaceDuration + extraSpaceVolume - controlBarLeftRightPadding), controlBarItems, this.responsiveUIMultiple);
    var collapsedControlBarItems = collapsedResult.fit;
    var collapsedMoreOptionsItems = collapsedResult.overflow;
    this.moreOptionsItems = collapsedMoreOptionsItems;

    finalControlBarItems = [];

    for (var k = 0; k < collapsedControlBarItems.length; k++) {
      if (collapsedControlBarItems[k].name === "moreOptions" && collapsedMoreOptionsItems.length === 0) {
        continue;
      }

      finalControlBarItems.push(controlItemTemplates[collapsedControlBarItems[k].name]);
    }

    return finalControlBarItems;
  },

  setupItemStyle: function() {
    var returnStyles = {};

    for (element in this.props.skinConfig.buttons.desktopContent){
      if (this.props.skinConfig.buttons.desktopContent[element].name == "watermark"){
        returnStyles.watermarkImageStyle = {
          width: this.responsiveUIMultiple * this.props.skinConfig.buttons.desktopContent[element].minWidth + "px"
        };
      }
    }

    returnStyles.iconCharacter = {
      color: this.props.skinConfig.controlBar.iconStyle.inactive.color,
      opacity: this.props.skinConfig.controlBar.iconStyle.inactive.opacity
    };
    return returnStyles;
  },


  render: function() {
    var controlBarClass = ClassNames({
      "control-bar": true,
      "control-bar-hidden": !this.props.controlBarVisible,
      "control-bar-visible": this.props.controlBarVisible
    });

    var controlBarItems = this.populateControlBar();

    return (
      <div className={controlBarClass} onMouseUp={this.handleControlBarMouseUp} onTouchEnd={this.handleControlBarMouseUp}>
        <div className="controlBarItemsWrapper">
          {controlBarItems}
        </div>
      </div>
    );
  }
});

ControlBar.defaultProps = {
  authorization: {
    streams: [
      {is_live_stream: false}
    ]
  },
  skinConfig: {
    responsive: {
      breakpoints: {
        xs: {id: 'xs'},
        sm: {id: 'sm'},
        md: {id: 'md'},
        lg: {id: 'lg'}
      }
    }
  },
  responsiveView: 'md'
};

module.exports = ControlBar;