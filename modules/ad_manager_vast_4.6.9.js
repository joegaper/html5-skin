(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
if (!OO)
{
  OO = {};
}

},{}],2:[function(require,module,exports){
require("./InitOOUnderscore.js");

if ((!OO.HM) && (typeof window === 'undefined' || typeof window._ === 'undefined'))
{
  OO.HM = require('hazmat').create();
}
else if (!window.Hazmat)
{
  require('hazmat');
}

if (!OO.HM)
{
  OO.HM = window.Hazmat.noConflict().create();
}

},{"./InitOOUnderscore.js":5,"hazmat":9}],3:[function(require,module,exports){
require("./InitOO.js");

if (!window.$)
{
  window.$ = require('jquery');
}

$ = window.$.noConflict(true);

if (!OO.$)
{
  OO.$ = $;
}

},{"./InitOO.js":1,"jquery":10}],4:[function(require,module,exports){
require("./InitOO.js");

//if player params doesn't exist or is empty, then fill it with these default values
if (!OO.playerParams)
{
  OO.playerParams = {};
}

if (!OO.playerParams.core_version)
{
  OO.playerParams.core_version = 4;
}

if (!OO.playerParams.vast_proxy_url)
{
  OO.playerParams.vast_proxy_url = "http://player.ooyala.com/adinsertion/vast_proxy";
}

},{"./InitOO.js":1}],5:[function(require,module,exports){
require("./InitOO.js");

if (!window._)
{
  window._ = require('underscore');
}

if (!OO._)
{
  OO._ = window._.noConflict();
}

},{"./InitOO.js":1,"underscore":11}],6:[function(require,module,exports){
  /**
   * @namespace OO
   */
  (function(OO,_){

    // External States
	/**
	 * @description The Ooyala Player run-time states apply to an Ooyala player while it is running. These states apply equally to both HTML5 and Flash players.
	 * State changes occur either through user interaction (for example, the user clickes the PLAY button), or programmatically via API calls. For more information,
	 * see <a href="http://support.ooyala.com/developers/documentation/api/pbv4_api_events.html" target="target">Player Message Bus Events</a>.
	 * @summary Represents the Ooyala Player run-time states.
	 * @namespace OO.STATE
	 */
    OO.STATE = {
      /** The embed code has been set. The movie and its metadata is currently being loaded into the player. */
      LOADING : 'loading',
      /**
       * One of the following applies:
       * <ul>
       *   <li>All of the necessary data is loaded in the player. Playback of the movie can begin.</li>
       *   <li>Playback of the asset has finished and is ready to restart from the beginning.</li>
       * </ul>
       */
      READY : 'ready',
      /** The player is currently playing video content. */
      PLAYING : 'playing',
      /** The player has currently paused after playback had begun. */
      PAUSED : 'paused',

      /** Playback has currently stopped because it doesn't have enough movie data to continue and is downloading more. */
      BUFFERING : 'buffering',
      /** The player has encountered an error that prevents playback of the asset. The error could be due to many reasons,
       * such as video format, syndication rules, or the asset being disabled. Refer to the list of errors for details.
       * The error code for the root cause of the error is available from the [OO.Player.getErrorCode()]{@link OO.Player#getErrorCode} method.
       */
      ERROR : 'error',
      /** The player has been destroyed via its [OO.Player.destroy(<i>callback</i>)]{@link OO.Player#destroy} method. */
      DESTROYED : 'destroyed',

      __end_marker : true
    };

    // All Events Constants
    /**
     * @description The Ooyala Player events are default events that are published by the event bus.Your modules can subscribe to any and all of these events.
     * Use message bus events to subscribe to or publish player events from video to ad playback. For more information,
     * see <a href="http://support.ooyala.com/developers/documentation/api/pbv4_api_events.html" target="target">Player Message Bus Events</a>.
     * @summary Represents the Ooyala Player events.
     * @namespace OO.EVENTS
     */
    OO.EVENTS = {

     /**
      * A player was created. This is the first event that is sent after player creation.
      * This event provides the opportunity for any other modules to perform their own initialization.
      * The handler is called with the query string parameters.
      * The DOM has been created at this point, and plugins may make changes or additions to the DOM.<br/><br/>
      *
      *
      * @event OO.EVENTS#PLAYER_CREATED
      */
      PLAYER_CREATED : 'playerCreated',

      PLAYER_EMBEDDED: 'playerEmbedded',

      /**
       * An attempt has been made to set the embed code.
       * If you are developing a plugin, reset the internal state since the player is switching to a new asset.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The ID (embed code) of the asset.</li>
       *     <li>The ID (embed code) of the asset, with options.</li>
       *   </ul>
       *
       *
       * @event OO.EVENTS#SET_EMBED_CODE
       */
      SET_EMBED_CODE : 'setEmbedCode',

      /**
       * The player's embed code has changed. The handler is called with two parameters:
       * <ul>
       *    <li>The ID (embed code) of the asset.</li>
       *    <li>The options JSON object.</li>
       * </ul>
       *
       *
       * @event OO.EVENTS#EMBED_CODE_CHANGED
       */
      EMBED_CODE_CHANGED : 'embedCodeChanged',

      /**
       * An attempt has been made to set a new asset.
       * If you are developing a plugin, reset the internal state since the player is switching to a new asset.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The asset Object</li>
       *     <li>The asset Object, with options.</li>
       *   </ul>
       *
       * <h5>Compatibility: </h5>
       * <p style="text-indent: 1em;">HTML5, Flash</p>
       *
       * @event OO.EVENTS#SET_ASSET
       */
      SET_ASSET: 'setAsset',

      /**
       * A new asset has been specified to for playback and has basic passed validation.
       * The handler will be called with an object representing the new asset.
       * The object will have the following structure:
       *   <ul>
       *     <li>{
       *           Content:
       *           <ul>
       *                 <li>title: String,</li>
       *                 <li>description: String,</li>
       *                 <li>duration: Number,</li>
       *                 <li>posterImages: Array,</li>
       *                 <li>streams: Array,</li>
       *                 <li>captions: Array</li>
       *           </ul>
       *     }</li>
       *
       *   </ul>
       *
       * <h5>Compatibility: </h5>
       * <p style="text-indent: 1em;">HTML5, Flash</p>
       *
       * @event OO.EVENTS#ASSET_CHANGED
       */
      ASSET_CHANGED: 'assetChanged',

      /**
       * An attempt has been made to update current asset for cms-less player.
       * The handler is called with:
       *   <ul>
       *     <li>The asset Object, with optional fields populated</li>
       *   </ul>
       *
       *
       * @event OO.EVENTS#UPDATE_ASSET
       * @public
       */
      UPDATE_ASSET: 'updateAsset',

      /**
       * New asset parameters were specified for playback and have passed basic validation.
       * The handler will be called with an object representing the new parameters.
       * The object will have the following structure:
       *   <ul> {
       *     <li> id: String </li>
       *     <li> content:
       *           <ul>
       *                 <li>title: String,</li>
       *                 <li>description: String,</li>
       *                 <li>duration: Number,</li>
       *                 <li>posterImages: Array,</li>
       *                 <li>streams: Array,</li>
       *                 <li>captions: Array</li>
       *           </ul>
       *     </li>
       *     <li> relatedVideos:
       *           <ul>
       *                 <li>title: String,</li>
       *                 <li>description: String,</li>
       *                 <li>thumbnailUrl: String,</li>
       *                 <li>asset: Object</li>
       *           </ul>
       *     </li>
       *   }</ul>
       *
       * <h5>Compatibility: </h5>
       * <p style="text-indent: 1em;">HTML5, Flash</p>
       *
       * @event OO.EVENTS#ASSET_UPDATED
       */
      ASSET_UPDATED: 'assetUpdated',

      /**
       * An <code>AUTH_TOKEN_CHANGED</code> event is triggered when an authorization token is issued by the Player Authorization API.<br/>
       * For example, in device registration, an authorization token is issued, as described in
       * <a href="http://support.ooyala.com/developers/documentation/concepts/device_registration.html" target="target">Device Registration</a>.
       * The handler is called with a new value for the authorization token.<br/><br/>
       *
       *
       * @event OO.EVENTS#AUTH_TOKEN_CHANGED
       */
      AUTH_TOKEN_CHANGED: "authTokenChanged",

      /**
       * The GUID has been set. The handler is called with the GUID.
       * <p>This event notifies plugin or page developers that a unique ID has been either generated or loaded for the current user's browser.
       * This is useful for analytics.</p>
       * <p>In HTML5, Flash, and Chromecast environments, a unique user is identified by local storage or a cookie. </p>
       * <p>To generate the GUID, Flash players use the timestamp indicating when the GUID is generated, and append random data to it.
       * The string is then converted to base64.</p>
       * <p>To generate the GUID, HTML5 players use the current time, browser
       * information, and random data and hash it and convert it to base64.</p>
       * <p>Within the same browser on the desktop, once a GUID is set by one platform
       * it is used for both platforms for the user. If a user clears their browser cache, that user's (device's) ID will be regenerated the next time
       * they watch video. Incognito modes will track a user for a single session, but once the browser is closed the GUID is erased.</p>
       * <p>For more information, see <b>unique user</b> <a href="http://support.ooyala.com/users/users/documentation/reference/glossary.html" target="target">Glossary</a>.</p>
       *
       *
       * @event OO.EVENTS#GUID_SET
       */
      GUID_SET: 'guidSet',

      WILL_FETCH_PLAYER_XML: 'willFetchPlayerXml',
      PLAYER_XML_FETCHED: 'playerXmlFetched',
      WILL_FETCH_CONTENT_TREE: 'willFetchContentTree',

      SAVE_PLAYER_SETTINGS: 'savePlayerSettings',

      /**
       * A content tree was fetched. The handler is called with a JSON object that represents the content data for the current asset.<br/><br/>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;">Records a <code>display</code> event. For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/analytics_plays-and-displays.html" target="target">Displays, Plays, and Play Starts</a>.</p>
       *
       * @event OO.EVENTS#CONTENT_TREE_FETCHED
       */
      CONTENT_TREE_FETCHED: 'contentTreeFetched',

      WILL_FETCH_METADATA: 'willFetchMetadata',

      /**
       * The metadata, which is typically set in Backlot, has been retrieved.
       * The handler is called with the JSON object containing all metadata associated with the current asset.
       * The metadata includes page-level, asset-level, player-level, and account-level metadata, in addition to
       * metadata specific to 3rd party plugins. This is typically used for ad and anlytics plugins, but can be used
       * wherever you need specific logic based on the asset type.<br/><br/>
       *
       *
       * @event OO.EVENTS#METADATA_FETCHED
       */
      METADATA_FETCHED: 'metadataFetched',

      /**
       * The thumbnail metadata needed for thumbnail previews while seeking has been fetched and will be
       * passed through to the event handlers subscribing to this event.
       * Thumbnail metadata will have the following structure:
       * {
          data: {
            available_time_slices: [10],  //times that have thumbnails available
            available_widths: [100],       //widths of thumbnails available
            thumbnails: {
                  10: {100: {url: http://test.com, height: 100, width: 100}}
            }
          }
        }
       * <br/><br/>
       *
       *
       * @event OO.EVENTS#THUMBNAILS_FETCHED
       * @public
       */
      THUMBNAILS_FETCHED: 'thumbnailsFetched',

      WILL_FETCH_AUTHORIZATION: 'willFetchAuthorization',

      /**
       * Playback was authorized. The handler is called with an object containing the entire SAS response, and includes the value of <code>video_bitrate</code>.
       * <p>For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/encodingsettings_videobitrate.html" target="target">Video Bit Rate</a>.</p>
       *
       *
       * @event OO.EVENTS#AUTHORIZATION_FETCHED
       */
      AUTHORIZATION_FETCHED: 'authorizationFetched',

      WILL_FETCH_AD_AUTHORIZATION: 'willFetchAdAuthorization',
      AD_AUTHORIZATION_FETCHED: 'adAuthorizationFetched',

      CAN_SEEK: 'canSeek',
      WILL_RESUME_MAIN_VIDEO: 'willResumeMainVideo',

      /**
       * The player has indicated that it is in a playback-ready state.
       * All preparations are complete, and the player is ready to receive playback commands
       * such as play, seek, and so on. The default UI shows the <b>Play</b> button,
       * displaying the non-clickable spinner before this point. <br/><br/>
       *
       *
       * @event OO.EVENTS#PLAYBACK_READY
       */
      PLAYBACK_READY: 'playbackReady',

      /**
       * Play has been called for the first time. <br/><br/>
       *
       *
       * @event OO.EVENTS#INITIAL_PLAY
       */
      INITIAL_PLAY: "initialPlay", // when play is called for the very first time ( in start screen )

      WILL_PLAY : 'willPlay',


      /** The user has restarted the playback after the playback finished */
      REPLAY : 'replay',

      /**
       * The playhead time changed. The handler is called with the following arguments:
       * <ul>
       *   <li>The current time.</li>
       *   <li>The duration.</li>
       *   <li>The name of the buffer.</li>
       *   <li>The seek range.</li>
       *   <li>The id of the video (as defined by the module that controls it).</li>
       * </ul>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;">The first event is <code>video start</code>. Other instances of the event feed the <code>% completed data points</code>.</p>
       * <p style="text-indent: 1em;">For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/analytics_plays-and-displays.html">Displays, Plays, and Play Starts</a>.</p>
       *
       * @event OO.EVENTS#PLAYHEAD_TIME_CHANGED
       */
      PLAYHEAD_TIME_CHANGED: 'playheadTimeChanged',

      /**
       * The player is buffering the data stream.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The url of the video that is buffering.</li>
       *   <li>The id of the video that is buffering (as defined by the module that controls it).</li>
       * </ul><br/><br/>
       *
       *
       * @event OO.EVENTS#BUFFERING
       */
      BUFFERING: 'buffering', // playing stops because player is buffering

      /**
       * Play resumes because the player has completed buffering. The handler is called with the URL of the stream.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The url of the video that has buffered.</li>
       *   <li>The id of the video that has buffered (as defined by the module that controls it).</li>
       * </ul><br/><br/>
       *
       *
       * @event OO.EVENTS#BUFFERED
       */
      BUFFERED: 'buffered',

      /**
       * The player is downloading content (it can play while downloading).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The current time.</li>
       *   <li>The duration.</li>
       *   <li>The name of the buffer.</li>
       *   <li>The seek range.</li>
       *   <li>The id of the video (as defined by the module that controls it).</li>
       * </ul>
       * <br/><br/>
       *
       *
       * @event OO.EVENTS#DOWNLOADING
       */
      DOWNLOADING:  'downloading', // player is downloading content (could be playing while downloading)

      /**
       * Lists the available bitrate information. The handler is called with an array containing the available streams, each object includes:
       *   <ul>
       *     <li>bitrate: The bitrate in bits per second. (number|string)</li>
       *     <li>height: The vertical resolution of the stream. (number)</li>
       *     <li>width: The horizontal resolution of the stream. (number)</li>
       *   </ul>
       * If The video plugin supports automatic ABR, one stream will have a bitrate value of "auto".
       *
       * <p>For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/encodingsettings_videobitrate.html" target="target">Video Bit Rate</a>.</p>
       * @event OO.EVENTS#BITRATE_INFO_AVAILABLE
       * @public
       */
      BITRATE_INFO_AVAILABLE: 'bitrateInfoAvailable',

      /**
       * A request to set a specific stream bitrate has occurred.
       * The method is published with an object representing the stream to switch to. This will
       * be one of the stream objects published in BITRATE_INFO_AVAILABLE. Each object includes:
       *   <ul>
       *     <li>bitrate: The bitrate in bits per second. (number|string)</li>
       *     <li>height: The vertical resolution of the stream. (number)</li>
       *     <li>width: The horizontal resolution of the stream. (number)</li>
       *   </ul>
       * <br/><br/>
       *
       * @event OO.EVENTS#SET_TARGET_BITRATE
       */
      SET_TARGET_BITRATE: 'setTargetBitrate',

      /**
       * The current playing bitrate has changed. The handler is called with the stream object which includes:
       *   <ul>
       *     <li>bitrate: The bitrate in bits per second. (number|string)</li>
       *     <li>height: The vertical resolution of the stream. (number)</li>
       *     <li>width: The horizontal resolution of the stream. (number)</li>
       *   </ul>
       * If the player is using automatic ABR, it should publish a stream object with the bitrate set to "auto".
       *
       * <p>For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/encodingsettings_videobitrate.html" target="target">Video Bit Rate</a>.</p>
       * @event OO.EVENTS#BITRATE_CHANGED
       * @public
       */
      BITRATE_CHANGED: 'bitrateChanged',

      CLOSED_CAPTIONS_INFO_AVAILABLE: 'closedCaptionsInfoAvailable',
      SET_CLOSED_CAPTIONS_LANGUAGE: 'setClosedCaptionsLanguage',
      CLOSED_CAPTION_CUE_CHANGED: 'closedCaptionCueChanged',

      /**
       * Raised when asset dimensions become available.
       *
       * Provide the following arguments in an object:
       * <ul>
       *   <li>width: the width of the asset (number)
       *   </li>
       *   <li>height: the height of the asset (number)
       *   </li>
       *   <li>videoId: the id of the video (string)
       *   </li>
       * </ul>
       *
       * @event OO.EVENTS#ASSET_DIMENSION
       * @public
       */
      ASSET_DIMENSION: 'assetDimension',

      SCRUBBING: 'scrubbing',
      SCRUBBED: 'scrubbed',

      /**
       * A request to perform a seek has occurred. The playhead is requested to move to
       * a specific location, specified in milliseconds. The handler is called with the position to which to seek.<br/><br/>
       *
       *
       * @event OO.EVENTS#SEEK
       */
      SEEK: 'seek',

      /**
       * The player has finished seeking the main video to the requested position.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The current time of the video after seeking.</li>
       * </ul>
       *
       *
       * @event OO.EVENTS#SEEKED
       */
      SEEKED: 'seeked',

      /**
       * A playback request has been made. <br/><br/>
       *
       *
       * @event OO.EVENTS#PLAY
       */
      PLAY: 'play',

      PLAYING: 'playing',
      PLAY_FAILED: 'playFailed',

      /**
       * A player pause has been requested. <br/><br/>
       *
       *
       * @event OO.EVENTS#PAUSE
       */
      PAUSE: 'pause',

      /**
       * The player was paused. <br/><br/>
       *
       *
       * @event OO.EVENTS#PAUSED
       */
      PAUSED: 'paused',

      /**
       * The video and asset were played. The handler is called with the arguments that were passed.<br/><br/>
       *
       *
       * @event OO.EVENTS#PLAYED
       */
      PLAYED: 'played',

      DISPLAY_CUE_POINTS: 'displayCuePoints',
      INSERT_CUE_POINT: 'insertCuePoint',
      RESET_CUE_POINTS: 'resetCuePoints',

      /**
       * This event is triggered before a change is made to the full screen setting of the player.
       * The handler is called with <code>true</code> if the full screen setting will be enabled,
       * and is called with <code>false</code> if the full screen setting will be disabled.
       *
       *
       * @event OO.EVENTS#WILL_CHANGE_FULLSCREEN
       */
      WILL_CHANGE_FULLSCREEN: 'willChangeFullscreen',

      /**
       * The fullscreen state has changed. Depending on the context, the handler is called with:
       * <ul>
       *   <li><code>isFullscreen</code> and <code>paused</code>:</li>
       *     <ul>
       *       <li><code>isFullscreen</code> is set to <code>true</code> or <code>false</code>.</li>
       *       <li><code>isFullscreen</code> and <code>paused</code> are each set to <code>true</code> or <code>false</code>.</li>
       *     </ul>
       *   </li>
       *   <li>The id of the video that has entered fullscreen (as defined by the module that controls it).
       * </ul>
       *
       *
       * @event OO.EVENTS#FULLSCREEN_CHANGED
       */
      FULLSCREEN_CHANGED: 'fullscreenChanged',

      /**
       * The screen size has changed. This event can also be triggered by a screen orientation change for handheld devices.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The width of the player.</li>
       *     <li>The height of the player.</li>
       *   </ul>
       *
       *
       * @event OO.EVENTS#SIZE_CHANGED
       */
      SIZE_CHANGED: 'sizeChanged',

      /**
       * A request to change volume has been made.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The desired volume of the video element.</li>
       *   <li>The id of the video on which to change the volume (as defined by the module that controls it).
       *        If null or undefined, all video elements volume will be changed</li>
       * </ul>
       *
       *
       * @event OO.EVENTS#CHANGE_VOLUME
       */
      CHANGE_VOLUME: 'changeVolume',

      /**
       * The volume has changed. The handler is called with the current volume, which has a value between 0 and 1, inclusive.<br/><br/>
       *
       *
       * @event OO.EVENTS#VOLUME_CHANGED
       */
      VOLUME_CHANGED: 'volumeChanged',

      /**
       * Controls are shown.<br/><br/>
       *
       *
       * @event OO.EVENTS#CONTROLS_SHOWN
       */
      CONTROLS_SHOWN: 'controlsShown',

      /**
       * Controls are hidden.<br/><br/>
       *
       *
       * @event OO.EVENTS#CONTROLS_HIDDEN
       */
      CONTROLS_HIDDEN: 'controlsHidden',
      END_SCREEN_SHOWN: 'endScreenShown',

      /**
       * An error has occurred. The handler is called with a JSON object that always includes an error code field,
       * and may also include other error-specific fields.<br/><br/>
       *
       *
       * @event OO.EVENTS#ERROR
       */
      ERROR: 'error',

      /**
       * The player is currently being destroyed, and anything created by your module must also be deleted.
       * After the destruction is complete, there is nothing left to send an event.
       * Any plugin that creates or has initialized any long-living logic should listen to this event and clean up that logic.
       * <br/><br/>
       *
       *
       * @event OO.EVENTS#DESTROY
       */
      DESTROY: 'destroy',

      WILL_PLAY_FROM_BEGINNING: 'willPlayFromBeginning',

      DISABLE_PLAYBACK_CONTROLS: 'disablePlaybackControls',
      ENABLE_PLAYBACK_CONTROLS: 'enablePlaybackControls',


      // Video Controller action events

      /*
       * Denotes that the video controller is ready for playback to be triggered.
       * @event OO.EVENTS#VC_READY
       * @public
       */
      VC_READY: 'videoControllerReady',

      /**
       * Commands the video controller to create a video element.
       * It should be given the following arguments:
       * <ul>
       *   <li>videoId (string)
       *   </li>
       *   <li>streams (object) containing:
       *     <ul>
       *       <li>Encoding type (string) as key defined in OO.VIDEO.ENCODINGS
       *       </li>
       *       <li>Key-value pair (object) as value containing:
       *         <ul>
       *           <li>url (string): Url of the stream</li>
       *           <li>drm (object): Denoted by type of DRM with data as value object containing:
       *             <ul>
       *               <li>Type of DRM (string) as key (ex. "widevine", "fairplay", "playready")</li>
       *               <li>DRM specific data (object) as value</li>
       *             </ul>
       *           </li>
       *         </ul>
       *       </li>
       *     </ul>
       *   </li>
       *   <li>parentContainer of the element. This is a jquery element. (object)
       *   </li>
       *   <li>optional params object (object) containing:
       *     <ul>
       *       <li>closedCaptions: The possible closed captions available on this video. (object)</li>
       *       <li>crossorigin: The crossorigin attribute value to set on the video. (string)</li>
       *       <li>technology: The core video technology required (string) (ex. OO.VIDEO.TECHNOLOGY.HTML5)</li>
       *       <li>features: The video plugin features required (string) (ex. OO.VIDEO.FEATURE.CLOSED_CAPTIONS)</li>
       *     </ul>
       *   </li>
       * </ul>
       * @event OO.EVENTS#VC_CREATE_VIDEO_ELEMENT
       */
      VC_CREATE_VIDEO_ELEMENT: 'videoControllerCreateVideoElement',

      /**
       * A message to be interpreted by the Video Controller to update the URL of the stream for an element.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The name of the element who's URL is being altered</li>
       *   <li>The new url to be used</li>
       * </ul>
       * @event OO.EVENTS#VC_UPDATE_ELEMENT_STREAM
       * @public
       */
      VC_UPDATE_ELEMENT_STREAM: 'videoControllerUpdateElementStream',

      /**
       * The Video Controller has created the desired video element, as denoted by id (string).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>Object containing:
       *     <ul>
       *       <li>videoId: The id of the video as defined by the module that controls it.</li>
       *       <li>encodings: The encoding types supported by the new video element.</li>
       *       <li>parent: The parent element of the video element.</li>
       *       <li>domId: The DOM id of the video element.</li>
       *       <li>videoElement: The video element or its wrapper as created by the video plugin.</li>
       *     </ul>
       *   </li>
       * </ul>
       * @event OO.EVENTS#VC_VIDEO_ELEMENT_CREATED
       */
      VC_VIDEO_ELEMENT_CREATED: 'videoControllerVideoElementCreated',

      /**
       * Commands the Video Controller to bring a video element into the visible range given the video element id (string).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to focus (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_FOCUS_VIDEO_ELEMENT
       */
      VC_FOCUS_VIDEO_ELEMENT: 'videoControllerFocusVideoElement',

      /**
       * The Video Controller has moved a video element (string) into focus.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that is in focus (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_VIDEO_ELEMENT_IN_FOCUS
       */
      VC_VIDEO_ELEMENT_IN_FOCUS: 'videoControllerVideoElementInFocus',

      /**
       * The Video Controller has removed a video element (string) from focus.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that lost focus (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_VIDEO_ELEMENT_LOST_FOCUS
       */
      VC_VIDEO_ELEMENT_LOST_FOCUS: 'videoControllerVideoElementLostFocus',

      /**
       * Commands the Video Controller to dispose a video element given the video element id (string).
       * @event OO.EVENTS#VC_DISPOSE_VIDEO_ELEMENT
       */
      VC_DISPOSE_VIDEO_ELEMENT: 'videoControllerDisposeVideoElement',

      /**
       * The Video Controller has disposed the denoted video element (string).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that was disposed (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_VIDEO_ELEMENT_DISPOSED
       */
      VC_VIDEO_ELEMENT_DISPOSED: 'videoControllerVideoElementDisposed',

      /**
       * Commands the video controller to set the stream for a video element.
       * It should be given the video element name (string) and an object of streams denoted by encoding type (object).
       * @event OO.EVENTS#VC_SET_VIDEO_STREAMS
       */
      VC_SET_VIDEO_STREAMS: 'videoControllerSetVideoStreams',

      /**
       * The Video Controller has encountered an error attempting to configure video elements.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that encountered the error (as defined by the module that controls it).</li>
       *   <li>The error details (object) containing an error code.</li>
       * @event OO.EVENTS#VC_ERROR
       */
      VC_ERROR: 'videoControllerError',


      // Video Player action events

      /**
       * Sets the video element's initial playback time.
       * @event OO.EVENTS#VC_SET_INITIAL_TIME
       */
      VC_SET_INITIAL_TIME: 'videoSetInitialTime',

      /**
       * Commands the video element to play.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to play (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_PLAY
       */
      VC_PLAY: 'videoPlay',

      /**
       * The video element has detected a command to play and will begin playback.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to seek (as defined by the module that controls it).</li>
       *   <li>The url of the video that will play.</li>
       * </ul>
       * @event OO.EVENTS#VC_WILL_PLAY
       */
      VC_WILL_PLAY: 'videoWillPlay',

      /**
       * The video element has detected playback in progress.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that is playing (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_PLAYING
       */
      VC_PLAYING: 'videoPlaying',

      /**
       * The video element has detected playback completion.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has played (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_PLAYED
       */
      VC_PLAYED: 'videoPlayed',

      /**
       * The video element has detected playback failure.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has played (as defined by the module that controls it).</li>
       *   <li>The error code of the failure (string).</li>
       * </ul>
       * @event OO.EVENTS#VC_PLAY_FAILED
       */
      VC_PLAY_FAILED: 'videoPlayFailed',

      /**
       * Commands the video element to pause.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to pause (as defined by the module that controls it).</li>
       *   <li>Optional string indicating the reason for the pause.  Supported values include:
       *     <ul>
       *       <li>"transition" indicates that a pause was triggered because a video is going into or out of focus.</li>
       *       <li>null or undefined for all other cases.</li>
       *     </ul>
       *   </li>
       * </ul>
       * @event OO.EVENTS#VC_PAUSE
       */
      VC_PAUSE: 'videoPause',

      /**
       * The video element has detected video state change to paused.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has paused (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_PAUSED
       */
      VC_PAUSED: 'videoPaused',

      /**
       * Commands the video element to seek.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to seek (as defined by the module that controls it).</li>
       *   <li>The time position to seek to (in seconds).</li>
       * </ul>
       * @event OO.EVENTS#VC_SEEK
       */
      VC_SEEK: 'videoSeek',

      /**
       * The video element has detected seeking.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that is seeking (as defined by the module that controls it).</li>
       * </ul>
       * @event OO.EVENTS#VC_SEEKING
       */
      VC_SEEKING: 'videoSeeking',

      /**
       * The video element has detected seeked.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has seeked (as defined by the module that controls it).</li>
       *   <li>The current time of the video after seeking.</li>
       * </ul>
       * @event OO.EVENTS#VC_SEEKED
       */
      VC_SEEKED: 'videoSeeked',

      /**
       * Commands the video element to preload.
       * @event OO.EVENTS#VC_PRELOAD
       */
      VC_PRELOAD: 'videoPreload',

      /**
       * Commands the video element to reload.
       * @event OO.EVENTS#VC_RELOAD
       */
      VC_RELOAD: 'videoReload',

      /**
       * Commands the video controller to prepare all video elements for playback.  This event should be
       * called on a click event and used to enable api-control on html5-based video elements.
       * @event OO.EVENTS#VC_PRIME_VIDEOS
       * @public
       */
      VC_PRIME_VIDEOS: 'videoPrimeVideos',

      /**
       * Notifies the player of tags (such as ID3) encountered during video playback.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has paused (as defined by the module that controls it). (string)</li>
       *   <li>The type of metadata tag found, such as ID3. (string)</li>
       *   <li>The metadata. (string|object)</li>
       * </ul>
       * @event OO.EVENTS#VC_TAG_FOUND
       * @public
       */
      VC_TAG_FOUND: 'videoTagFound',

      WILL_FETCH_ADS: 'willFetchAds',
      DISABLE_SEEKING: 'disableSeeking',
      ENABLE_SEEKING: 'enableSeeking',

      /**
       * This event is triggered before an ad is played. Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The duration of the ad.</li>
       *     <li>The ID of the ad.</li>
       *   </ul>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;"Triggers an <b>Ad Analytics</b> <code>AD_IMPRESSION</code> event.</p>
       *
       * @event OO.EVENTS#WILL_PLAY_ADS
       */
      WILL_PLAY_ADS: 'willPlayAds',
      WILL_PLAY_SINGLE_AD: 'willPlaySingleAd',
      WILL_PAUSE_ADS: 'willPauseAds',
      WILL_RESUME_ADS: 'willResumeAds',

      /**
       * This event is triggered to indicate that a non-linear ad will be played.  The handler is called with:
       *   <ul>
       *     <li>An object representing the ad.  For a definition, see class 'Ad' from the ad manager framework.</li>
       *   </ul>
       *
       * @event OO.EVENTS#WILL_PLAY_NONLINEAR_AD
       */
      WILL_PLAY_NONLINEAR_AD: 'willPlayNonlinearAd',

      /**
       * A non-linear ad will play now.  The handler is called with:
       *   <ul>
       *     <li>An object containing the following fields:</li>
       *     <ul>
       *       <li>ad: An object representing the ad.  For a definition, see class 'Ad' from the ad manager framework.</li>
       *       <li>url: [optional] The url of the nonlinear ad.</li>
       *     </ul>
       *   </ul>
       *
       * @event OO.EVENTS#PLAY_NONLINEAR_AD
       */
      PLAY_NONLINEAR_AD: 'playNonlinearAd',

      /**
      * A nonlinear ad was loaded in the UI.
      *
      *
      * @event OO.EVENTS#NONLINEAR_AD_DISPLAYED
      */
      NONLINEAR_AD_DISPLAYED: 'nonlinearAdDisplayed',

      /**
       * A set of ads have been played. Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The duration of the ad.</li>
       *     <li>The ID of the item to play.</li>
       *   </ul>
       *
       *
       * @event OO.EVENTS#ADS_PLAYED
       */
      ADS_PLAYED: 'adsPlayed',

      SINGLE_AD_PLAYED: 'singleAdPlayed',

      /**
       * This event is triggered when an error has occurred with an ad. <br/><br/>
       *
       *
       * @event OO.EVENTS#ADS_ERROR
       */
      ADS_ERROR: 'adsError',

      /**
       * This event is triggered when an ad has been clicked. <br/><br/>
       *
       *
       * @event OO.EVENTS#ADS_CLICKED
       */
      ADS_CLICKED: 'adsClicked',

      FIRST_AD_FETCHED: "firstAdFetched",
      AD_CONFIG_READY: "adConfigReady",

      /**
       * This event is triggered before the companion ads are shown.
       * Companion ads are displayed on a customer page and are not displayed in the player.
       * This event notifies the page handler to display the specified ad, and is the only means by which companion ads can appear.
       * If the page does not handle this event, companion ads will not appear.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The ID of all companion ads.</li>
       *     <li>The ID of a single companion ad.</li>
       *   </ul>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;"Triggers an <b>Ad Analytics</b> <code>AD_IMPRESSION</code> event.</p>
       *
       * @event OO.EVENTS#WILL_SHOW_COMPANION_ADS
       */
      WILL_SHOW_COMPANION_ADS: "willShowCompanionAds",
      AD_FETCH_FAILED: "adFetchFailed",

      MIDROLL_PLAY_FAILED: "midrollPlayFailed",
      SKIP_AD: "skipAd",
      UPDATE_AD_COUNTDOWN: "updateAdCountdown",

      // this player is part of these experimental variations
      REPORT_EXPERIMENT_VARIATIONS: "reportExperimentVariations",

      FETCH_STYLE: "fetchStyle",
      STYLE_FETCHED: "styleFetched",
      SET_STYLE: "setStyle",

      USE_SERVER_SIDE_HLS_ADS: "useServerSideHlsAds",

      LOAD_ALL_VAST_ADS: "loadAllVastAds",
      ADS_FILTERED: "adsFiltered",
      ADS_MANAGER_HANDLING_ADS: "adsManagerHandlingAds",
      ADS_MANAGER_FINISHED_ADS: "adsManagerFinishedAds",

      // This event contains the information AMC need to know to place the overlay in the correct position.
      OVERLAY_RENDERING: "overlayRendering",

      /**
       * Event for signaling Ad Controls (Scrubber bar and Control bar) rendering:
       *   <ul>
       *     <li>Boolean parameter, 'false' to not show ad controls, 'true' to show ad controls based on skin config</li>
       *   </ul>
       *
       *
       * @event OO.EVENTS#SHOW_AD_CONTROLS
       */
      SHOW_AD_CONTROLS: "showAdControls",

      /**
       * Event for signaling Ad Marquee rendering:
       *   <ul>
       *     <li>Boolean parameter, 'false' to not show ad marquee, 'true' to show ad marquee based on skin config</li>
       *   </ul>
       *
       *
       * @event OO.EVENTS#SHOW_AD_MARQUEE
       */
      SHOW_AD_MARQUEE: "showAdMarquee",

      // Window published beforeUnload event. It's still user cancellable.
      /**
       * The window, document, and associated resources are being unloaded.
       * The handler is called with <code>true</code> if a page unload has been requested, <code>false</code> otherwise.
       * This event may be required since some browsers perform asynchronous page loading while the current page is still active,
       * meaning that the end user loads a page with the Ooyala player, plays an asset, then redirects the page to a new URL they have specified.
       * Some browsers will start loading the new data while still displaying the player, which will result in an error since the networking has already been reset.
       * To prevent such false errors, listen to this event and ignore any errors raised after such actions have occurred.
       * <br/><br/>
       *
       *
       * @event OO.EVENTS#PAGE_UNLOAD_REQUESTED
       */
      PAGE_UNLOAD_REQUESTED: "pageUnloadRequested",
      // Either 1) The page is refreshing (almost certain) or 2) The user tried to refresh
      // the page, the embedding page had an "Are you sure?" prompt, the user clicked
      // on "stay", and a real error was produced due to another reason during the
      // following few seconds. The real error, if any, will be received in some seconds.
      // If we are certain it has unloaded, it's too late to be useful.
      PAGE_PROBABLY_UNLOADING: "pageProbablyUnloading",

      // DiscoveryApi publishes these, OoyalaAnalytics listens for them and propagates to reporter.js
      REPORT_DISCOVERY_IMPRESSION: "reportDiscoveryImpression",
      REPORT_DISCOVERY_CLICK: "reportDiscoveryClick",

      /**
       * The UI layer has finished its initial render. The handler is called with an object
       * of the following structure:
       *
       * <ul>
       *   <li>videoWrapperClass: The class name of the element containing the UI layer</li>
       *   <li>pluginsClass: The class name of the element into which the plugins content should be inserted</li>
       * </ul>
       *
       * If the UI layer doesn't require any special handling, the values for these two keys will be null.
       *
       * @event OO.EVENTS#UI_READY
       */
      UI_READY: "uiReady",

      __end_marker : true
    };

    /**
	* @description Represents the Ooyala V3 Player Errors. Use message bus events to handle errors by subscribing to or intercepting the <code>OO.EVENTS.ERROR</code> event.
	* For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
	* @summary Represents the Ooyala V3 Player Errors.
	* @namespace OO.ERROR
	*/
    OO.ERROR = {
     /**
      * @description Represents the <code>OO.ERROR.API</code> Ooyala V3 Player Errors. Use message bus events to handle errors by subscribing to or intercepting the <code>OO.EVENTS.ERROR</code> event.
	  * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
  	  * @summary Represents the <code>OO.ERROR.API</code> Ooyala V3 Player Errors.
      * @namespace OO.ERROR.API
      */
      API: {
       /**
        * @description <code>OO.ERROR.API.NETWORK ('network')</code>: Cannot contact the server.
    	* @constant OO.ERROR.API.NETWORK
    	* @type {string}
    	*/
        NETWORK:'network',
        /**
         * @description Represents the <code>OO.ERROR.API.SAS</code> Ooyala V3 Player Errors for the Stream Authorization Server.
         * Use message bus events to handle errors by subscribing to or intercepting the <code>OO.EVENTS.ERROR</code> event.
	     * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
	     * @summary Represents the <code>OO.ERROR.API.SAS</code> Ooyala V3 Player Errors.
         * @namespace OO.ERROR.API.SAS
         */
        SAS: {
         /**
          * @description <code>OO.ERROR.API.SAS.GENERIC ('sas')</code>: Invalid authorization response.
          * @constant OO.ERROR.API.SAS.GENERIC
          * @type {string}
          */
          GENERIC:'sas',
          /**
           * @description <code>OO.ERROR.API.SAS.GEO ('geo')</code>: This video is not authorized for your location.
           * @constant OO.ERROR.API.SAS.GEO
           * @type {string}
           */
          GEO:'geo',
          /**
           * @description <code>OO.ERROR.API.SAS.DOMAIN ('domain')</code>: This video is not authorized for your domain.
           * @constant OO.ERROR.API.SAS.DOMAIN
           * @type {string}
           */
          DOMAIN:'domain',
          /**
           * @description <code>OO.ERROR.API.SAS.FUTURE ('future')</code>: This video will be available soon.
           * @constant OO.ERROR.API.SAS.FUTURE
           * @type {string}
           */
          FUTURE:'future',
          /**
           * @description <code>OO.ERROR.API.SAS.PAST ('past')</code>: This video is no longer available.
           * @constant OO.ERROR.API.SAS.PAST
           * @type {string}
           */
          PAST:'past',
          /**
           * @description <code>OO.ERROR.API.SAS.DEVICE ('device')</code>: This video is not authorized for playback on this device.
           * @constant OO.ERROR.API.SAS.DEVICE
           * @type {string}
           */
          DEVICE:'device',
          /**
           * @description <code>OO.ERROR.API.SAS.PROXY ('proxy')</code>: An anonymous proxy was detected. Please disable the proxy and retry.
           * @constant OO.ERROR.API.SAS.PROXY
           * @type {string}
           */
          PROXY:'proxy',
          /**
           * @description <code>OO.ERROR.API.SAS.CONCURRENT_STREAM ('concurrent_streams')S</code>: You have exceeded the maximum number of concurrent streams.
           * @constant OO.ERROR.API.SAS.CONCURRENT_STREAMS
           * @type {string}
           */
          CONCURRENT_STREAMS:'concurrent_streams',
          /**
           * @description <code>OO.ERROR.API.SAS.INVALID_HEARTBEAT ('invalid_heartbeat')</code>: Invalid heartbeat response.
           * @constant OO.ERROR.API.SAS.INVALID_HEARTBEAT
           * @type {string}
           */
          INVALID_HEARTBEAT:'invalid_heartbeat',
          /**
           * @description <code>OO.ERROR.API.SAS.ERROR_DEVICE_INVALID_AUTH_TOKEN ('device_invalid_auth_token')</code>: Invalid Ooyala Player token.
           * @constant OO.ERROR.API.SAS.ERROR_DEVICE_INVALID_AUTH_TOKEN
           * @type {string}
           */
          ERROR_DEVICE_INVALID_AUTH_TOKEN:'device_invalid_auth_token',
          /**
           * @description <code>OO.ERROR.API.SAS.ERROR_DEVICE_LIMIT_REACHED ('device_limit_reached')</code>: The device limit has been reached.
           * The device limit is the maximum number of devices that can be registered with the viewer.
           * When the number of registered devices exceeds the device limit for the account or provider, this error is displayed.
           * @constant OO.ERROR.API.SAS.ERROR_DEVICE_LIMIT_REACHED
           * @type {string}
           */
          ERROR_DEVICE_LIMIT_REACHED:'device_limit_reached',
          /**
           * @description <code>OO.ERROR.API.SAS.ERROR_DEVICE_BINDING_FAILED ('device_binding_failed')</code>: Device binding failed.
           * If the number of devices registered is already equal to the number of devices that may be bound for the account,
           * attempting to register a new device will result in this error.
           * @constant OO.ERROR.API.SAS.ERROR_DEVICE_BINDING_FAILED
           * @type {string}
           */
          ERROR_DEVICE_BINDING_FAILED:'device_binding_failed',
          /**
           * @description <code>OO.ERROR.API.SAS.ERROR_DEVICE_ID_TOO_LONG ('device_id_too_long')</code>: The device ID is too long.
           * The length limit for the device ID is 1000 characters.
           * @constant OO.ERROR.API.SAS.ERROR_DEVICE_ID_TOO_LONG
           * @type {string}
           */
          ERROR_DEVICE_ID_TOO_LONG:'device_id_too_long',
          /**
           * @description <code>OO.ERROR.API.SAS.ERROR_DRM_RIGHTS_SERVER_ERROR ('drm_server_error')</code>: DRM server error.
           * @constant OO.ERROR.API.SAS.ERROR_DRM_RIGHTS_SERVER_ERROR
           * @type {string}
           */
          ERROR_DRM_RIGHTS_SERVER_ERROR:'drm_server_error',
          /**
           * @description <code>OO.ERROR.API.SAS.ERROR_DRM_GENERAL_FAILURE ('drm_general_failure')</code>: General error with acquiring license.
           * @constant OO.ERROR.API.SAS.ERROR_DRM_GENERAL_FAILURE
           * @type {string}
           */
          ERROR_DRM_GENERAL_FAILURE:'drm_general_failure',

          /**
           * @description <code>OO.ERROR.API.SAS.ERROR_INVALID_ENTITLEMENTS ('invalid_entitlements')</code>: User Entitlement Terminated - Stream No Longer Active for the User.
           * @constant OO.ERROR.API.SAS.ERROR_INVALID_ENTITLEMENTS
           * @type {string}
           */
          ERROR_INVALID_ENTITLEMENTS:'invalid_entitlements'
        },
       /**
        * @description <code>OO.ERROR.API.CONTENT_TREE ('content_tree')</code>: Invalid Content.
     	* @constant OO.ERROR.API.CONTENT_TREE
     	* @type {string}
     	*/
        CONTENT_TREE:'content_tree',
       /**
        * @description <code>OO.ERROR.API.METADATA ('metadata')</code>: Invalid Metadata.
      	* @constant OO.ERROR.API.METADATA
      	* @type {string}
      	*/
        METADATA:'metadata'
      },
     /**
      * @description Represents the <code>OO.ERROR.PLAYBACK</code> Ooyala V3 Player Errors. Use message bus events to handle errors by subscribing to or intercepting the <code>OO.EVENTS.ERROR</code> event.
 	  * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
   	  * @summary Represents the <code>OO.ERROR.PLAYBACK</code> Ooyala V3 Player Errors.
      * @namespace OO.ERROR.PLAYBACK
      */
      PLAYBACK: {
       /**
        * @description <code>OO.ERROR.PLAYBACK.GENERIC ('playback')</code>: Could not play the content.
        * @constant OO.ERROR.PLAYBACK.GENERIC
        * @type {string}
        */
        GENERIC:'playback',
        /**
         * @description <code>OO.ERROR.PLAYBACK.STREAM ('stream')</code>: This video is not encoded for your device.
         * @constant OO.ERROR.PLAYBACK.STREAM
         * @type {string}
         */
        STREAM:'stream',
        /**
         * @description <code>OO.ERROR.PLAYBACK.LIVESTREAM ('livestream')</code>: Live stream is off air.
         * @constant OO.ERROR.PLAYBACK.LIVESTREAM
         * @type {string}
         */
        LIVESTREAM:'livestream',
        /**
         * @description <code>OO.ERROR.PLAYBACK.NETWORK ('network_error')</code>: The network connection was temporarily lost.
         * @constant OO.ERROR.PLAYBACK.NETWORK
         * @type {string}
         */
        NETWORK: 'network_error'
      },
      CHROMECAST: {
        MANIFEST:'chromecast_manifest',
        MEDIAKEYS:'chromecast_mediakeys',
        NETWORK:'chromecast_network',
        PLAYBACK:'chromecast_playback'
      },
     /**
      * @description <code>OO.ERROR.UNPLAYABLE_CONTENT ('unplayable_content')</code>: This video is not playable on this player.
   	  * @constant OO.ERROR.UNPLAYABLE_CONTENT
   	  * @type {string}
   	  */
      UNPLAYABLE_CONTENT:'unplayable_content',
     /**
      * @description <code>OO.ERROR.INVALID_EXTERNAL_ID ('invalid_external_id')</code>: Invalid External ID.
      * @constant OO.ERROR.INVALID_EXTERNAL_ID
      * @type {string}
      */
      INVALID_EXTERNAL_ID:'invalid_external_id',
      /**
       * @description <code>OO.ERROR.EMPTY_CHANNEL ('empty_channel')</code>: This channel is empty.
       * @constant OO.ERROR.EMPTY_CHANNEL
       * @type {string}
       */
      EMPTY_CHANNEL:'empty_channel',
      /**
       * @description <code>OO.ERROR.EMPTY_CHANNEL_SET ('empty_channel_set')</code>: This channel set is empty.
       * @constant OO.ERROR.EMPTY_CHANNEL_SET
       * @type {string}
       */
      EMPTY_CHANNEL_SET:'empty_channel_set',
      /**
       * @description <code>OO.ERROR.CHANNEL_CONTENT ('channel_content')</code>: This channel is not playable at this time.
       * @constant OO.ERROR.CHANNEL_CONTENT
       * @type {string}
       */
      CHANNEL_CONTENT:'channel_content',
      /**
       * @description Represents the <code>OO.ERROR.VC</code> Ooyala V4 Player Errors for the Video Technology stack.
       * Use message bus events to handle errors by subscribing to or intercepting the <code>OO.EVENTS.ERROR</code> event.
           * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
           * @summary Represents the <code>OO.ERROR.VC</code> Ooyala V4 Player Errors.
       * @namespace OO.ERROR.VC
       */
      VC: {
        /**
        * @description <code>OO.ERROR.VC.UNSUPPORTED_ENCODING ('unsupported_encoding')</code>:
        *    This device does not have an available decoder for this stream type.
        * @constant OO.ERROR.VC.UNSUPPORTED_ENCODING
        * @type {string}
        */
        UNSUPPORTED_ENCODING:'unsupported_encoding',

        /**
        * @description <code>OO.ERROR.VC.UNABLE_TO_CREATE_VIDEO_ELEMENT ('unable_to_create_video_element')</code>:
        *    A video element to play the given stream could not be created
        * @constant OO.ERROR.VC.UNABLE_TO_CREATE_VIDEO_ELEMENT
        * @type {string}
        */
        UNABLE_TO_CREATE_VIDEO_ELEMENT:'unable_to_create_video_element',
      }
    };

    // All Server-side URLS
    OO.URLS = {
      VAST_PROXY: _.template('http://player.ooyala.com/nuplayer/mobile_vast_ads_proxy?callback=<%=cb%>&embed_code=<%=embedCode%>&expires=<%=expires%>&tag_url=<%=tagUrl%>'),
      EXTERNAL_ID: _.template('<%=server%>/player_api/v1/content_tree/external_id/<%=pcode%>/<%=externalId%>'),
      CONTENT_TREE: _.template('<%=server%>/player_api/v1/content_tree/embed_code/<%=pcode%>/<%=embedCode%>'),
      METADATA: _.template('<%=server%>/player_api/v1/metadata/embed_code/<%=playerBrandingId%>/<%=embedCode%>?videoPcode=<%=pcode%>'),
      SAS: _.template('<%=server%>/player_api/v1/authorization/embed_code/<%=pcode%>/<%=embedCode%>'),
      ANALYTICS: _.template('<%=server%>/reporter.js'),
      THUMBNAILS: _.template('<%=server%>/api/v1/thumbnail_images/<%=embedCode%>'),
      __end_marker : true
    };

    OO.VIDEO = {
      MAIN: "main",
      ADS: "ads",

      /**
       * @description Represents the <code>OO.VIDEO.ENCODING</code> encoding types. Used to denote video
       *              encoding types associated with a video stream url.
       * @summary Represents the <code>OO.VIDEO.ENCODING</code> encoding types.
       * @namespace OO.VIDEO.ENCODING
       */
      ENCODING: {
        /**
         * @description Represents DRM support for the encoding types.
         * @summary Represents the <code>OO.VIDEO.ENCODING.DRM</code> encoding types.
         * @namespace OO.VIDEO.ENCODING.DRM
         */
        DRM : {
          /**
           * @description <code>OO.VIDEO.ENCODING.DRM.HLS ('hls_drm')</code>:
           *   An encoding type for drm HLS streams.
           * @constant OO.VIDEO.ENCODING.DRM.HLS
           * @type {string}
           */
          HLS: "hls_drm",

          /**
           * @description <code>OO.VIDEO.ENCODING.DRM.DASH ('dash_drm')</code>:
           *   An encoding type for drm dash streams.
           * @constant OO.VIDEO.ENCODING.DRM.DASH
           * @type {string}
           */
          DASH: "dash_drm",
        },
        /**
         * @description <code>OO.VIDEO.ENCODING.AUDIO ('audio')</code>:
         *   An encoding type for non-drm audio streams.
         * @constant OO.VIDEO.ENCODING.AUDIO
         * @type {string}
         */
        AUDIO: "audio",

        /**
         * @description <code>OO.VIDEO.ENCODING.DASH ('dash')</code>:
         *   An encoding type for non-drm dash streams (mpd extension).
         * @constant OO.VIDEO.ENCODING.DASH
         * @type {string}
         */
        DASH: "dash",

        /**
         * @description <code>OO.VIDEO.ENCODING.HDS ('hds')</code>:
         *   An encoding type for non-drm hds streams (hds extension).
         * @constant OO.VIDEO.ENCODING.HDS
         * @type {string}
         */
        HDS: "hds",

        /**
         * @description <code>OO.VIDEO.ENCODING.HLS ('hls')</code>:
         *   An encoding type for non-drm HLS streams (m3u8 extension).
         * @constant OO.VIDEO.ENCODING.HLS
         * @type {string}
         */
        HLS: "hls",

        /**
         * @description <code>OO.VIDEO.ENCODING.IMA ('ima')</code>:
         *   A string that repsents a video stream that is controlled and configured directly by IMA.
         * @constant OO.VIDEO.ENCODING.IMA
         * @type {string}
         */
        IMA: "ima",

        /**
         * @description <code>OO.VIDEO.ENCODING.MP4 ('mp4')</code>:
         *   An encoding type for non-drm mp4 streams (mp4 extension).
         * @constant OO.VIDEO.ENCODING.MP4
         * @type {string}
         */
        MP4: "mp4",

        /**
         * @description <code>OO.VIDEO.ENCODING.RTMP ('rtmp')</code>:
         *   An encoding type for non-drm rtmp streams.
         * @constant OO.VIDEO.ENCODING.RTMP
         * @type {string}
         */
        RTMP: "rtmp",

        /**
         * @description <code>OO.VIDEO.ENCODING.SMOOTH ('smooth')</code>:
         *   An encoding type for non-drm smooth streams.
         * @constant OO.VIDEO.ENCODING.SMOOTH
         * @type {string}
         */
        SMOOTH: "smooth",

        /**
         * @description <code>OO.VIDEO.ENCODING.WEBM ('webm')</code>:
         *   An encoding type for non-drm webm streams (webm extension).
         * @constant OO.VIDEO.ENCODING.WEBM
         * @type {string}
         */
        WEBM: "webm",

        /**
         * @description <code>OO.VIDEO.ENCODING.AKAMAI_HD_VOD ('akamai_hd_vod')</code>:
         *   An encoding type for akamai hd vod streams.
         * @constant OO.VIDEO.ENCODING.AKAMAI_HD_VOD
         * @type {string}
         */
        AKAMAI_HD_VOD: "akamai_hd_vod",

        /**
         * @description <code>OO.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS ('akamai_hd2_vod_hls')</code>:
         *   An encoding type for akamai hd2 vod hls streams.
         * @constant OO.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS
         * @type {string}
         */
        AKAMAI_HD2_VOD_HLS: "akamai_hd2_vod_hls",

        /**
         * @description <code>OO.VIDEO.ENCODING.AKAMAI_HD2_VOD_HDS ('akamai_hd2_vod_hds')</code>:
         *   An encoding type for akamai hd2 vod hds streams.
         * @constant OO.VIDEO.ENCODING.AKAMAI_HD2_VOD_HDS
         * @type {string}
         */
        AKAMAI_HD2_VOD_HDS: "akamai_hd2_vod_hds",

        /**
         * @description <code>OO.VIDEO.ENCODING.AKAMAI_HD2_HDS ('akamai_hd2_hds')</code>:
         *   An encoding type for akamai hd2 live/remote hds streams.
         * @constant OO.VIDEO.ENCODING.AKAMAI_HD2_HDS
         * @type {string}
         */
        AKAMAI_HD2_HDS: "akamai_hd2_hds",

        /**
         * @description <code>OO.VIDEO.ENCODING.FAXS_HLS ('faxs_hls')</code>:
         *   An encoding type for adobe faxs streams.
         * @constant OO.VIDEO.ENCODING.FAXS_HLS
         * @type {string}
         */
        FAXS_HLS: "faxs_hls",

        /**
         * @description <code>OO.VIDEO.ENCODING.WIDEVINE_HLS ('wv_hls')</code>:
         *   An encoding type for widevine hls streams.
         * @constant OO.VIDEO.ENCODING.WIDEVINE_HLS
         * @type {string}
         */
        WIDEVINE_HLS: "wv_hls",

        /**
         * @description <code>OO.VIDEO.ENCODING.WIDEVINE_MP4 ('wv_mp4')</code>:
         *   An encoding type for widevine mp4 streams.
         * @constant OO.VIDEO.ENCODING.WIDEVINE_MP4
         * @type {string}
         */
        WIDEVINE_MP4: "wv_mp4",

        /**
         * @description <code>OO.VIDEO.ENCODING.WIDEVINE_WVM ('wv_wvm')</code>:
         *   An encoding type for widevine wvm streams.
         * @constant OO.VIDEO.ENCODING.WIDEVINE_WVM
         * @type {string}
         */
        WIDEVINE_WVM: "wv_wvm",

        /**
         * @description <code>OO.VIDEO.ENCODING.UNKNOWN ('unknown')</code>:
         *   An encoding type for unknown streams.
         * @constant OO.VIDEO.ENCODING.UNKNOWN
         * @type {string}
         */
        UNKNOWN: "unknown"
      },

      /**
       * @description Represents the <code>OO.VIDEO.FEATURE</code> feature list. Used to denote which
       * features are supported by a video player.
       * @summary Represents the <code>OO.VIDEO.FEATURE</code> feature list.
       * @namespace OO.VIDEO.FEATURE
       */
      FEATURE: {
        /**
         * @description <code>OO.VIDEO.FEATURE.CLOSED_CAPTIONS ('closedCaptions')</code>:
         *   Closed captions parsed by the video element and sent to the player.
         * @constant OO.VIDEO.FEATURE.CLOSED_CAPTIONS
         * @type {string}
         */
        CLOSED_CAPTIONS: "closedCaptions",

        /**
         * @description <code>OO.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_GIVE ('videoObjectSharingGive')</code>:
         *   The video object is accessible and can be found by the player via the DOM element id.  Other
         *   modules can use this video object if required.
         * @constant OO.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_GIVE
         * @type {string}
         */
        VIDEO_OBJECT_SHARING_GIVE: "videoObjectSharingGive",

        /**
         * @description <code>OO.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_TAKE ('videoObjectSharingTake')</code>:
         *   The video object used can be created external from this video plugin.  This plugin will use the
         *   existing video element as its own.
         * @constant OO.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_TAKE
         * @type {string}
         */
        VIDEO_OBJECT_SHARING_TAKE: "videoObjectSharingTake",

        /**
         * @description <code>OO.VIDEO.FEATURE.BITRATE_CONTROL ('bitrateControl')</code>:
         *   The video object allows the playing bitrate to be selected via the SET_TARGET_BITRATE event.
         *   The video controller must publish BITRATE_INFO_AVAILABLE with a list of bitrate objects that can be selected.
         *   The video controller must publish BITRATE_CHANGED events with the bitrate object that was switched to.
         *   A bitrate object should at minimum contain height, width, and bitrate properties. Height and width
         *   should be the vertical and horizontal resoluton of the stream and bitrate should be in bits per second.
         * @constant OO.VIDEO.FEATURE.BITRATE_CONTROL
         * @type {string}
         */
        BITRATE_CONTROL: "bitrateControl"
      },

      /**
       * @description Represents the <code>OO.VIDEO.TECHNOLOGY</code> core video technology.
       * @summary Represents the <code>OO.VIDEO.TECHNOLOGY</code> core technology of the video element.
       * @namespace OO.VIDEO.TECHNOLOGY
       */
      TECHNOLOGY: {
        /**
         * @description <code>OO.VIDEO.TECHNOLOGY.FLASH ('flash')</code>:
         *   The core video technology is based on Adobe Flash.
         * @constant OO.VIDEO.TECHNOLOGY.FLASH
         * @type {string}
         */
        FLASH: "flash",

        /**
         * @description <code>OO.VIDEO.TECHNOLOGY.HTML5 ('html5')</code>:
         *   The core video technology is based on the native html5 'video' tag.
         * @constant OO.VIDEO.TECHNOLOGY.HTML5
         * @type {string}
         */
        HTML5: "html5",

        /**
         * @description <code>OO.VIDEO.TECHNOLOGY.MIXED ('mixed')</code>:
         *   The core video technology used may be based on any one of multiple core technologies.
         * @constant OO.VIDEO.TECHNOLOGY.MIXED
         * @type {string}
         */
        MIXED: "mixed",

        /**
         * @description <code>OO.VIDEO.TECHNOLOGY.OTHER ('other')</code>:
         *   The video is based on a core video technology that doesn't fit into another classification
         *   found in <code>OO.VIDEO.TECHNOLOGY</code>.
         * @constant OO.VIDEO.TECHNOLOGY.OTHER
         * @type {string}
         */
        OTHER: "other"
      }

    };

    OO.CSS = {
      VISIBLE_POSITION : "0px",
      INVISIBLE_POSITION : "-100000px",
      VISIBLE_DISPLAY : "block",
      INVISIBLE_DISPLAY : "none",
      VIDEO_Z_INDEX: 10000,
      SUPER_Z_INDEX: 20000,
      ALICE_SKIN_Z_INDEX: 11000,
      OVERLAY_Z_INDEX: 10500,
      TRANSPARENT_COLOR : "rgba(255, 255, 255, 0)",

      __end_marker : true
    };

    OO.TEMPLATES = {
      RANDOM_PLACE_HOLDER: ['[place_random_number_here]', '<now>', '[timestamp]', '<rand-num>', '[cache_buster]', '[random]'],
      REFERAK_PLACE_HOLDER: ['[referrer_url]', '[LR_URL]'],
      EMBED_CODE_PLACE_HOLDER: ['[oo_embedcode]'],
      MESSAGE : '\
                  <table width="100%" height="100%" bgcolor="black" style="padding-left:55px; padding-right:55px; \
                  background-color:black; color: white;">\
                  <tbody>\
                  <tr valign="middle">\
                  <td align="right"><span style="font-family:Arial; font-size:20px">\
                  <%= message %>\
                  </span></td></tr></tbody></table>\
                  ',
      __end_marker : true
    };

    OO.CONSTANTS = {
      // Ad frequency constants
      AD_PLAY_COUNT_KEY: "oo_ad_play_count",
      AD_ID_TO_PLAY_COUNT_DIVIDER: ":",
      AD_PLAY_COUNT_DIVIDER: "|",
      MAX_AD_PLAY_COUNT_HISTORY_LENGTH: 20,

      CONTROLS_BOTTOM_PADDING: 10,

      SEEK_TO_END_LIMIT: 4,

      /**
       * @description <code>OO.CONSTANTS.CLOSED_CAPTIONS</code>:
       *   An object containing the possible modes for the closed caption text tracks.
       * @constant OO.CONSTANTS.CLOSED_CAPTIONS
       * @type {object}
       */
      CLOSED_CAPTIONS: {
        /**
         * @description <code>OO.CONSTANTS.CLOSED_CAPTIONS.SHOWING ('showing')</code>:
         *   Closed caption text track mode for showing closed captions.
         * @constant OO.CONSTANTS.CLOSED_CAPTIONS.SHOWING
         * @type {string}
         */
        SHOWING: "showing",
        /**
         * @description <code>OO.CONSTANTS.CLOSED_CAPTIONS.HIDDEN ('hidden')</code>:
         *   Closed caption text track mode for hiding closed captions.
         * @constant OO.CONSTANTS.CLOSED_CAPTIONS.HIDDEN
         * @type {string}
         */
        HIDDEN: "hidden",
        /**
         * @description <code>OO.CONSTANTS.CLOSED_CAPTIONS.DISABLED ('disabled')</code>:
         *   Closed caption text track mode for disabling closed captions.
         * @constant OO.CONSTANTS.CLOSED_CAPTIONS.DISABLED
         * @type {string}
         */
        DISABLED: "disabled"
      },

      OOYALA_PLAYER_SETTINGS_KEY: 'ooyala_player_settings',

      __end_marker : true
    };

  }(OO,OO._));

},{}],7:[function(require,module,exports){
  (function(OO,_,HM) {
    // Ensure playerParams exists
    OO.playerParams = HM.safeObject('environment.playerParams', OO.playerParams,{});

    // Init publisher's OO.playerParams via player parameter object
    OO.configurePublisher = function(parameters) {
      OO.playerParams.pcode = parameters.pcode || OO.playerParams.pcode || '';
      OO.playerParams.playerBrandingId = parameters.playerBrandingId || OO.playerParams.playerBrandingId || '';
      OO.playerParams.debug = parameters.debug || OO.playerParams.debug || '';
    };

    OO.isPublisherConfigured = function() {
      return !!(OO.playerParams.pcode && OO.playerParams.playerBrandingId);
    };

    // Set API end point environment
    OO.setServerHost = function(parameters) {
      OO.playerParams.api_ssl_server = parameters.api_ssl_server || OO.playerParams.api_ssl_server || null;
      OO.playerParams.api_server = parameters.api_server || OO.playerParams.api_server || null;
      OO.playerParams.auth_ssl_server = parameters.auth_ssl_server || OO.playerParams.auth_ssl_server || null;
      OO.playerParams.auth_server = parameters.auth_server || OO.playerParams.auth_server || null;
      OO.playerParams.analytics_ssl_server = parameters.analytics_ssl_server || OO.playerParams.analytics_ssl_server || null;
      OO.playerParams.analytics_server = parameters.analytics_server || OO.playerParams.analytics_server || null;

      updateServerHost();
    };

    var updateServerHost = function () {
      OO.SERVER =
      {
        API: OO.isSSL ? OO.playerParams.api_ssl_server || "https://player.ooyala.com" :
                        OO.playerParams.api_server || "http://player.ooyala.com",
        AUTH: OO.isSSL ? OO.playerParams.auth_ssl_server || "https://player.ooyala.com/sas" :
                        OO.playerParams.auth_server || "http://player.ooyala.com/sas",
        ANALYTICS: OO.isSSL ? OO.playerParams.analytics_ssl_server || "https://player.ooyala.com" :
                              OO.playerParams.analytics_server || "http://player.ooyala.com"
      };
    }

    // process tweaks
    // tweaks is optional. Hazmat takes care of this but throws an undesirable warning.
    OO.playerParams.tweaks = OO.playerParams.tweaks || '';
    OO.playerParams.tweaks = HM.safeString('environment.playerParams.tweaks', OO.playerParams.tweaks,'');
    OO.playerParams.tweaks = OO.playerParams.tweaks.split(',');

    // explicit list of supported tweaks
    OO.tweaks = {};
    OO.tweaks["android-enable-hls"] = _.contains(OO.playerParams.tweaks, 'android-enable-hls');
    OO.tweaks["html5-force-mp4"] = _.contains(OO.playerParams.tweaks, 'html5-force-mp4');

    // Max timeout for fetching ads metadata, default to 3 seconds.
    OO.playerParams.maxAdsTimeout = OO.playerParams.maxAdsTimeout || 5;
    // max wrapper ads depth we look, we will only look up to 3 level until we get vast inline ads
    OO.playerParams.maxVastWrapperDepth = OO.playerParams.maxVastWrapperDepth || 3;
    OO.playerParams.minLiveSeekWindow = OO.playerParams.minLiveSeekWindow || 10;

    // Ripped from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    OO.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
    OO.playerCount = 0;

    // Check environment to see if this is prod
    OO.isProd = !!(OO.playerParams.environment &&
                   OO.playerParams.environment.match(/^prod/i));

    // Environment invariant.
    OO.platform = window.navigator.platform;
    OO.os = window.navigator.appVersion;
    OO.supportsVideo = !!document.createElement('video').canPlayType;

    OO.browserSupportsCors = (function() {
      try {
        return _.has(new XMLHttpRequest(), "withCredentials") ||
          _.has(XMLHttpRequest.prototype, "withCredentials");
      } catch(e) {
        return false;
      }
    }());

    OO.isWindows = (function() {
      return !!OO.platform.match(/Win/);
    }());

    OO.isIos = (function() {
      return !!OO.platform.match(/iPhone|iPad|iPod/);
    }());

    OO.isIphone = (function() {
      return !!OO.platform.match(/iPhone|iPod/);
    }());

    OO.isIpad = (function() {
      return !!OO.platform.match(/iPad/);
    }());

    OO.iosMajorVersion = (function() {
      try {
        if (OO.isIos) {
          return parseInt(window.navigator.userAgent.match(/OS (\d+)/)[1], 10);
        } else {
          return null;
        }
      } catch(err) {
        return null;
      }
    }());

    OO.isAndroid = (function() {
      return !!(OO.os.match(/Android/) && !OO.os.match(/Windows Phone/));
    }());

    OO.isAndroid4Plus = (function() {
      var version = OO.os.match(/Android [\d\.]*;/);
      if (version && version.length > 0) {
        version = parseInt(version[0].substring(version[0].indexOf(' ') + 1,
                           version[0].search('[\.\;]')));
      }
      return OO.isAndroid && version >= 4;
    }());

    OO.isRimDevice = (function() {
      return !!(OO.os.match(/BlackBerry/) || OO.os.match(/PlayBook/));
    }());

    OO.isFirefox = (function() {
      return !!window.navigator.userAgent.match(/Firefox/);
    }());

    OO.isChrome = (function () {
      return (!!window.navigator.userAgent.match(/Chrome/) && !window.navigator.userAgent.match(/Edge/));
    }());

    OO.isSafari = (function () {
      return (!!window.navigator.userAgent.match(/AppleWebKit/) &&
              !window.navigator.userAgent.match(/Chrome/) &&
              !window.navigator.userAgent.match(/like iPhone/));
    }());

    OO.chromeMajorVersion = (function () {
      try {
        return parseInt(window.navigator.userAgent.match(/Chrome.([0-9]*)/)[1], 10);
      } catch(err) {
        return null;
      }
    }());

    OO.isIE = (function(){
      return !!window.navigator.userAgent.match(/MSIE/) || !!window.navigator.userAgent.match(/Trident/);
    }());

    OO.isEdge = (function(){
      return !!window.navigator.userAgent.match(/Edge/);
    }());

    OO.isIE11Plus = (function(){
      // check if IE
      if (!window.navigator.userAgent.match(/Trident/)) {
        return false;
      }

      // extract version number
      var ieVersionMatch = window.navigator.userAgent.match(/rv:(\d*)/);
      var ieVersion = ieVersionMatch && ieVersionMatch[1];
      return ieVersion >= 11;
    }());

    OO.isWinPhone = (function(){
      return !!OO.os.match(/Windows Phone/) || !!OO.os.match(/ZuneWP/) || !!OO.os.match(/XBLWP/);
    }());

    OO.isSmartTV = (function(){
      return (!!window.navigator.userAgent.match(/SmartTV/) ||
             !!window.navigator.userAgent.match(/NetCast/));
    }());

    OO.isMacOs = (function() {
      return !OO.isIos && !!OO.os.match(/Mac/) && !window.navigator.userAgent.match(/like iPhone/);
    }());

    OO.isMacOsLionOrLater = (function() {
      // TODO: revisit for Firefox when possible/necessary
      var macOs = OO.os.match(/Mac OS X ([0-9]+)_([0-9]+)/);
      if (macOs == null || macOs.length < 3) { return false; }
      return (parseInt(macOs[1],10) >= 10 && parseInt(macOs[2],10) >= 7);
    }());

    OO.isKindleHD = (function(){
      return !!OO.os.match(/Silk\/2/);
    }());

    OO.supportAds = (function() {
      // We are disabling ads for Android 2/3 device, the reason is that main video is not resuming after
      // ads finish. Util we can figure out a work around, we will keep ads disabled.
      return !OO.isWinPhone && !OO.os.match(/Android [23]/);
    }());

    OO.allowGesture = (function() {
      return OO.isIos;
    }());

    OO.allowAutoPlay = (function() {
      return !OO.isIos && !OO.isAndroid;
    }());

    OO.supportTouch = (function() {
      // IE8- doesn't support JS functions on DOM elements
      if (document.documentElement.hasOwnProperty && document.documentElement.hasOwnProperty("ontouchstart")) { return true; }
      return false;
    }());

    OO.docDomain = (function() {
      var domain = null;
      try {
        domain = document.domain;
      } catch(e) {}
      if (!OO._.isEmpty(domain)) { return domain; }
      if (OO.isSmartTV) { return 'SmartTV'; }
      return 'unknown';
    }());

    OO.uiParadigm = (function() {
      var paradigm = 'tablet';

      // The below code attempts to decide whether or not we are running in 'mobile' mode
      // Meaning that no controls are displayed, chrome is minimized and only fullscreen playback is allowed
      // Unfortunately there is no clean way to figure out whether the device is tablet or phone
      // or even to properly detect device screen size http://tripleodeon.com/2011/12/first-understand-your-screen/
      // So there is a bunch of heuristics for doing just that
      // Anything that is not explicitly detected as mobile defaults to desktop
      // so worst case they get ugly chrome instead of unworking player
      if(OO.isAndroid4Plus && OO.tweaks["android-enable-hls"]) {
        // special case for Android 4+ running HLS
        paradigm = 'tablet';
      } else if(OO.isIphone) {
        paradigm = 'mobile-native';
      } else if(OO.os.match(/BlackBerry/)) {
        paradigm = 'mobile-native';
      } else if(OO.os.match(/iPad/)) {
        paradigm = 'tablet';
      } else if(OO.isKindleHD) {
        // Kindle Fire HD
        paradigm = 'mobile-native';
      } else if(OO.os.match(/Silk/)) {
        // Kindle Fire
        paradigm = 'mobile';
      } else if(OO.os.match(/Android 2/)) {
        // On Android 2+ only window.outerWidth is reliable, so we are using that and window.orientation
        if((window.orientation % 180) == 0 &&  (window.outerWidth / window.devicePixelRatio) <= 480 ) {
          // portrait mode
          paradigm = 'mobile';
        } else if((window.outerWidth / window.devicePixelRatio) <= 560 ) {
          // landscape mode
          paradigm = 'mobile';
        }
      } else if(OO.os.match(/Android/)) {
          paradigm = 'tablet';
      } else if (OO.isWinPhone) {
        // Windows Phone is mobile only for now, tablets not yet released
        paradigm = 'mobile';
      } else if(!!OO.platform.match(/Mac/)    // Macs
                || !!OO.platform.match(/Win/)  // Winboxes
                || !!OO.platform.match(/Linux/)) {    // Linux
        paradigm = 'desktop';
      }

      return paradigm;
    }());

    /**
     * Determines if a single video element should be used.<br/>
     * <ul><li>Use single video element on iOS, all versions</li>
     *     <li>Use single video element on Android < v4.0</li>
     *     <li>Use single video element on Android with Chrome < v40<br/>
     *       (note, it might work on earlier versions but don't know which ones! Does not work on v18)</li>
     * @private
     * @returns {boolean} True if a single video element is required
     */
    OO.requiresSingleVideoElement = (function() {
      var iosRequireSingleElement = OO.isIos;
      var androidRequireSingleElement = OO.isAndroid && (!OO.isAndroid4Plus || OO.chromeMajorVersion < 40);
      return iosRequireSingleElement || androidRequireSingleElement;
    }());

    // TODO(jj): need to make this more comprehensive
    // Note(jj): only applies to mp4 videos for now
    OO.supportedVideoProfiles = (function() {
      // iOS only supports baseline profile
      if (OO.isIos || OO.isAndroid) {
        return "baseline";
      }
      return null;
    }());

    // TODO(bz): add flash for device when we decide to use stream data from sas
    // TODO(jj): add AppleTV and other devices as necessary
    OO.device = (function() {
        var device = 'html5';
        if (OO.isIphone) { device = 'iphone-html5'; }
        else if (OO.isIpad) { device = 'ipad-html5'; }
        else if (OO.isAndroid) { device = 'android-html5'; }
        else if (OO.isRimDevice) { device = 'rim-html5'; }
        else if (OO.isWinPhone) { device = 'winphone-html5'; }
        else if (OO.isSmartTV) { device = 'smarttv-html5'; }
        return device;
    }());

    // list of environment-specific modules needed by the environment or empty to include all
    // Note: should never be empty because of html5
    OO.environmentRequiredFeatures = (function(){
      var features = [];

      if (OO.os.match(/Android 2/)) {  // safari android
        features.push('html5-playback');
      } else { // normal html5
        features.push('html5-playback');
        if (OO.supportAds) { features.push('ads'); }
      }

      return _.reduce(features, function(memo, feature) {return memo+feature+' ';}, '');
    }());

    OO.supportMidRollAds = (function() {
      return (OO.uiParadigm === "desktop" && !OO.isIos && !OO.isRimDevice);
    }());

    OO.supportCookies = (function() {
      document.cookie = "ooyala_cookie_test=true";
      var cookiesSupported = document.cookie.indexOf("ooyala_cookie_test=true") >= 0;
      document.cookie = "ooyala_cookie_test=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return cookiesSupported;
    }());

    OO.isSSL = document.location.protocol == "https:";

    updateServerHost();

    // returns true iff environment-specific feature is required to run in current environment
    OO.requiredInEnvironment = OO.featureEnabled = function(feature) {
      return !!OO.environmentRequiredFeatures.match(new RegExp(feature));
    };

    // Detect Chrome Extension. We will recieve an acknowledgement from the content script, which will prompt us to start sending logs
    OO.chromeExtensionEnabled = document.getElementById('ooyala-extension-installed') ? true : false;

    // Locale Getter and Setter
    OO.locale = "";
    OO.setLocale = function(locale) {
      OO.locale = locale.toUpperCase();
    };
    OO.getLocale = function() {
      return (OO.locale || document.documentElement.lang || navigator.language ||
              navigator.userLanguage || "en").substr(0,2).toUpperCase();
    };
  }(OO, OO._, OO.HM));

},{}],8:[function(require,module,exports){
  (function(OO,_,$) {
    OO.getRandomString = function() { return Math.random().toString(36).substring(7); };

    OO.safeClone = function(source) {
      if (_.isNumber(source) || _.isString(source) || _.isBoolean(source) || _.isFunction(source) ||
          _.isNull(source) || _.isUndefined(source)) {
        return source;
      }
      var result = (source instanceof Array) ? [] : {};
      try {
        $.extend(true, result, source);
      } catch(e) { OO.log("deep clone error", e); }
      return result;
    };

    OO.d = function() {
      if (OO.isDebug) { OO.log.apply(OO, arguments); }
      OO.$("#OOYALA_DEBUG_CONSOLE").append(JSON.stringify(OO.safeClone(arguments))+'<br>');
    };

    // Note: This inherit only for simple inheritance simulation, the Parennt class still has a this binding
    // to the parent class. so any variable initiated in the Parent Constructor, will not be available to the
    // Child Class, you need to copy paste constructor to Child Class to make it work.
    // coffeescript is doing a better job here by binding the this context to child in the constructor.
    // Until we switch to CoffeeScript, we need to be careful using this simplified inherit lib.
    OO.inherit = function(ParentClass, myConstructor) {
      if (typeof(ParentClass) !== "function") {
        OO.log("invalid inherit, ParentClass need to be a class", ParentClass);
        return null;
      }
      var SubClass = function() {
        ParentClass.apply(this, arguments);
        if (typeof(myConstructor) === "function") { myConstructor.apply(this, arguments); }
      };
      var parentClass = new ParentClass();
      OO._.extend(SubClass.prototype, parentClass);
      SubClass.prototype.parentClass = parentClass;
      return SubClass;
    };

    var styles = {}; // keep track of all styles added so we can remove them later if destroy is called

    OO.attachStyle = function(styleContent, playerId) {
      var s = $('<style type="text/css">' + styleContent + '</style>').appendTo("head");
      styles[playerId] = styles[playerId] || [];
      styles[playerId].push(s);
    };

    OO.removeStyles = function(playerId) {
      OO._.each(styles[playerId], function(style) {
        style.remove();
      });
    };

    // object: object to get the inner property for, ex. {"mod":{"fw":{"data":{"key":"val"}}}}
    // keylist: list of keys to find, ex. ["mod", "fw", "data"]
    // example output: {"key":"val"}
    OO.getInnerProperty = function(object, keylist) {
      var innerObject = object;
      var list = keylist;
      while (list.length > 0) {
        var key = list.shift();
        // Note that function and arrays are objects
        if (_.isNull(innerObject) || !_.isObject(innerObject) ||
            _.isFunction(innerObject) || _.isArray(innerObject))
          return null;
        innerObject = innerObject[key];
      }
      return innerObject;
    }

    OO.formatSeconds = function(timeInSeconds) {
      var seconds = parseInt(timeInSeconds,10) % 60;
      var hours = parseInt(timeInSeconds / 3600, 10);
      var minutes = parseInt((timeInSeconds - hours * 3600) / 60, 10);


      if (hours < 10) {
        hours = '0' + hours;
      }

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      return (parseInt(hours,10) > 0) ? (hours + ":" + minutes + ":" + seconds) : (minutes + ":" + seconds);
    };

    OO.timeStringToSeconds = function(timeString) {
      var timeArray = (timeString || '').split(":");
      return _.reduce(timeArray, function(m, s) { return m * 60 + parseInt(s, 10); }, 0);
    };

    OO.leftPadding = function(num, totalChars) {
      var pad = '0';
      var numString = num ? num.toString() : '';
      while (numString.length < totalChars) {
        numString = pad + numString;
      }
      return numString;
    };

    OO.getColorString = function(color) {
      return '#' + (OO.leftPadding(color.toString(16), 6)).toUpperCase();
    };

    OO.hexToRgb = function(hex) {
      var r = (hex & 0xFF0000) >> 16;
      var g = (hex & 0xFF00) >> 8;
      var b = (hex & 0xFF);
      return [r, g, b];
    };

    OO.changeColor = function(color, ratio, darker) {
      var minmax     = darker ? Math.max : Math.min;
      var boundary = darker ? 0 : 255;
      var difference = Math.round(ratio * 255) * (darker ? -1 : 1);
      var rgb = OO.hexToRgb(color);
      return [
        OO.leftPadding(minmax(rgb[0] + difference, boundary).toString(16), 2),
        OO.leftPadding(minmax(rgb[1] + difference, boundary).toString(16), 2),
        OO.leftPadding(minmax(rgb[2] + difference, boundary).toString(16), 2)
      ].join('');
    };

    OO.decode64 = function(s) {
      s = s.replace(/\n/g,"");
      var results = "";
      var j, i = 0;
      var enc = [];
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      //shortcut for browsers with atob
      if (window.atob) {
        return atob(s);
      }

      do {
        for (j = 0; j < 4; j++) {
          enc[j] = b64.indexOf(s.charAt(i++));
        }
        results += String.fromCharCode((enc[0] << 2) | (enc[1] >> 4),
                                        enc[2] == 64 ? 0 : ((enc[1] & 15) << 4) | (enc[2] >> 2),
                                        enc[3] == 64 ? 0 : ((enc[2] & 3) << 6) | enc[3]);
      } while (i < s.length);

      //trim tailing null characters
      return results.replace(/\0/g, "");
    };

    OO.pixelPing = function (url) {
      var img = new Image();
      img.onerror = img.onabort = function() { OO.d("onerror:", url); };
      img.src = OO.getNormalizedTagUrl(url);
    };

    // ping array of urls.
    OO.pixelPings = function (urls) {
        if (_.isEmpty(urls)) { return; }
        _.each(urls, function(url) {
          OO.pixelPing(url);
        }, this);
    };

    // helper function to convert types to boolean
    // the (!!) trick only works to verify if a string isn't the empty string
    // therefore, we must use a special case for that
    OO.stringToBoolean = function(value) {
      if (typeof value === 'string')
        return (value.toLowerCase().indexOf("true") > -1 || value.toLowerCase().indexOf("yes") > -1);
      return !!value;
    }

    OO.regexEscape = function(value) {
      var specials = /[<>()\[\]{}]/g;
      return value.replace(specials, "\\$&");
    };

    OO.getNormalizedTagUrl = function (url, embedCode) {
      var ts = new Date().getTime();
      var pageUrl = escape(document.URL);

      var placeHolderReplace = function (template, replaceValue) {
        _.each(template, function (placeHolder) {
          var regexSearchVal = new RegExp("(" +
                                    OO.regexEscape(placeHolder) + ")", 'gi');
          url = url.replace(regexSearchVal, replaceValue);
        }, this);
      }

      // replace the timestamp and referrer_url placeholders
      placeHolderReplace(OO.TEMPLATES.RANDOM_PLACE_HOLDER, ts);
      placeHolderReplace(OO.TEMPLATES.REFERAK_PLACE_HOLDER, pageUrl);

      // first make sure that the embedCode exists, then replace the
      // oo_embedcode placeholder
      if (embedCode) {
        placeHolderReplace(OO.TEMPLATES.EMBED_CODE_PLACE_HOLDER, embedCode);
      }
      return url;
    };

    OO.safeSeekRange = function(seekRange) {
      return {
        start : seekRange.length > 0 ? seekRange.start(0) : 0,
        end : seekRange.length > 0 ? seekRange.end(0) : 0
      };
    };

    OO.loadedJS = OO.loadedJS || {};

    OO.jsOnSuccessList = OO.jsOnSuccessList || {};

    OO.safeFuncCall = function(fn) {
      if (typeof fn !== "function") { return; }
      try {
        fn.apply();
      } catch (e) {
        OO.log("Can not invoke function!", e);
      }
    };

    OO.loadScriptOnce = function(jsSrc, successCallBack, errorCallBack, timeoutInMillis) {
      OO.jsOnSuccessList[jsSrc] = OO.jsOnSuccessList[jsSrc] || [];
      if (OO.loadedJS[jsSrc]) {
        // invoke call back directly if loaded.
        if (OO.loadedJS[jsSrc] === "loaded") {
          OO.safeFuncCall(successCallBack);
        } else if (OO.loadedJS[jsSrc] === "loading") {
          OO.jsOnSuccessList[jsSrc].unshift(successCallBack);
        }
        return false;
      }
      OO.loadedJS[jsSrc] = "loading";
      $.ajax({
        url: jsSrc,
        type: 'GET',
        cache: true,
        dataType: 'script',
        timeout: timeoutInMillis || 15000,
        success: function() {
          OO.loadedJS[jsSrc] = "loaded";
          OO.jsOnSuccessList[jsSrc].unshift(successCallBack);
          OO._.each(OO.jsOnSuccessList[jsSrc], function(fn) {
            OO.safeFuncCall(fn);
          }, this);
          OO.jsOnSuccessList[jsSrc] = [];
        },
        error: function() {
          OO.safeFuncCall(errorCallBack);
        }
      });
      return true;
    };

    try {
      OO.localStorage = window.localStorage;
    } catch (err) {
      OO.log(err);
    }
    if (!OO.localStorage) {
      OO.localStorage = {
        getItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
          return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
          return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
          if(!sKey) { return; }
          document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
          this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return; }
          document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          this.length--;
        },
        hasOwnProperty: function (sKey) {
          return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
      };
      OO.localStorage.length = (document.cookie.match(/\=/g) || OO.localStorage).length;
    }

    // A container to properly request OO.localStorage.setItem
    OO.setItem = function (sKey, sValue) {
      try {
        OO.localStorage.setItem(sKey, sValue);
      } catch (err) {
        OO.log(err);
      }
    };

    OO.JSON = window.JSON;

  }(OO, OO._, OO.$));

},{}],9:[function(require,module,exports){
// Actual Hazmat Code
var HazmatBuilder = function(_,root) {

  // top level module
  var Hazmat  = function(config) {
    this.config = config || {};
    if(!_.isObject(this.config)) {
      throw new Error('Hazmat is not initialized properly');
    }
    this.fail = _.isFunction(this.config.fail) ? this.config.fail : Hazmat.fail;
    this.warn = _.isFunction(this.config.warn) ? this.config.warn : Hazmat.warn;
    this.log = _.isFunction(this.config.log) ? this.config.log : Hazmat.log;
  };

  _.extend(Hazmat, {

    // constants
    ID_REGEX : /^[\_A-Za-z0-9]+$/,

    // factory
    create : function(config) {
      return new Hazmat(config);
    },

    // noConflict
    noConflict : function() {
      root.Hazmat = Hazmat.original;
      return Hazmat;
    },

    // default log function
    log : function() {
      if(console && _.isFunction(console.log)) {
        console.log.apply(console, arguments);
      }
    },

    // default fail function
    fail : function(_reason, _data) {
      var reason = _reason || "", data = _data || {};
      Hazmat.log('Hazmat Failure::', reason, data);
      throw new Error('Hazmat Failure '+reason.toString());
    },

    // default warn function
    warn : function(_reason, _data) {
      var reason = _reason || "", data = _data || {};
      Hazmat.log('Hazmat Warning::', reason, data);
    },

    // global fixers
    fixDomId : function(_value) {
      if(_.isString(_value) && _value.length > 0) {
        return _value.replace(/[^A-Za-z0-9\_]/g,'');
      } else {
        return null;
      }
    },

    // global testers
    isDomId : function(value) {
      return _.isString(value) && value.match(Hazmat.ID_REGEX);
    },


    __placeholder : true
  });

  _.extend(Hazmat.prototype, {
    _safeValue : function(name, value, fallback, type) {
      // make fallback safe and eat exceptions
      var _fallback = fallback;
      if(_.isFunction(fallback)) {
        fallback = _.once(function() {
          try {
            return _fallback.apply(this, arguments);
          } catch(e) {
          }
        });
      }

      if(type.checker(value)) {
        return value;
      } else if(type.evalFallback && _.isFunction(fallback) && type.checker(fallback(value))){
        this.warn('Expected valid '+type.name+' for '+name+' but was able to sanitize it:', [value, fallback(value)]);
        return fallback(value);
      } else if(type.checker(_fallback)){
        this.warn('Expected valid '+type.name+' for '+name+' but was able to fallback to default value:', [value, _fallback]);
        return _fallback;
      } else {
        this.fail('Expected valid '+type.name+' for '+name+' but received:', value);
      }
    },

    safeString : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'String', checker: _.isString, evalFallback:true});
    },

    safeStringOrNull : function(name, value, fallback) {
      if(value == null) {
        return value;
      } else {
        return this._safeValue(name, value, fallback, {name: 'String', checker: _.isString, evalFallback:true});
      }
    },

    safeDomId : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'DOM ID', checker: Hazmat.isDomId, evalFallback:true});
    },

    safeFunction : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'Function', checker: _.isFunction, evalFallback:false});
    },

    safeFunctionOrNull : function(name, value, fallback) {
      if(value == null) {
        return value;
      } else {
        return this._safeValue(name, value, fallback, {name: 'Function', checker: _.isFunction, evalFallback:false});
      }
    },

    safeObject : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'Object', checker: _.isObject, evalFallback:false});
    },

    safeObjectOrNull : function(name, value, fallback) {
      if(value == null) {
        return value;
      } else {
        return this._safeValue(name, value, fallback, {name: 'Object', checker: _.isObject, evalFallback:false});
      }
    },
    
    safeArray : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'Array', checker: _.isArray, evalFallback:false});
    },
    
    safeArrayOfElements : function(name, value, elementValidator, fallback) {
      var safeArray = this._safeValue(name, value, fallback, {name: 'Array', checker: _.isArray, evalFallback:false});
      return _.map(safeArray, elementValidator);
    },

    __placeholder:true
  });

  return Hazmat;
};

// Integration with Node.js/Browser
if(typeof window !== 'undefined' && typeof window._ !== 'undefined') {
  var hazmat = HazmatBuilder(window._, window);
  hazmat.original = window.Hazmat;
  window.Hazmat = hazmat;
} else {
  var _ = require('underscore');
  var hazmat = HazmatBuilder(_);
  _.extend(exports,hazmat);
}

},{"underscore":11}],10:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],11:[function(require,module,exports){
//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);

},{}],12:[function(require,module,exports){
(function (global){
/**
 * Ad Manager For Vast Ads
 * Originally Created by Greg Frank Based on Existing Vast Ad Code
 */


require("../html5-common/js/utils/InitModules/InitOO.js");
require("../html5-common/js/utils/InitModules/InitOOJQuery.js");
require("../html5-common/js/utils/InitModules/InitOOUnderscore.js");
require("../html5-common/js/utils/InitModules/InitOOHazmat.js");
require("../html5-common/js/utils/InitModules/InitOOPlayerParamsDefault.js");

require("../html5-common/js/utils/constants.js");
require("../html5-common/js/utils/utils.js");
require("../html5-common/js/utils/environment.js");

OO.Ads.manager(function(_, $) {
  /**
   * @class Vast
   * @classDesc The Vast Ads Manager class, registered as an ads manager with the ad manager controller.
   * Controls how Vast ads are loaded and played while communicating with the ad manager framework.
   * @public
   * @property {string} name Name of the vast manager, must match what is sent from Backlot and used at the page level
   * @property {object} amc An internal reference to the Ad Manager Framework
   * @property {boolean} testMode If enabled, it will put the ad manager in test mode causing certain functions to not load
   * @property {string} ADTYPE Which ad manger the ad belongs to. This should match the this.name of the ad manager,
   * but doesn't have to.
   * @property {boolean} ready Used to communicate with the ad manger controller if the manager is ready to go. Default
   * is false and if the ad manager controller sees it as false after initialization then it will destroy the manager.
   * @property {number} currentDepth Keeps track of how many layers the Ad is wrapped in and sets off a warning if the
   * maximum is reached
   * @property {boolean} loaded Set to true once the ad has been loaded successfully
   * @property {string} embedCode Keeps track of the embed code of the movie that is currently playing
   * @property {string} loaderId Unique id name for the loader, which is required by the API
   * @property {object} movieMd Contains the metadata of the main movie
   * @property {string} adURLOverride If the page level params override the ad url then it is stored here
   * @property {object} lastOverlayAd Contains the ad information for the overlay that was displayed before it was removed.
   * This is used so we know what to add back to the screen after the video ad is done and the main video hasn't ended.
   * @property {object} adTrackingInfo The object that holds each individual ad id's tracking urls (including error reporting).
   * @property {string} VAST_AD_CONTAINER Constant used to keep track of the Vast Ad container div/layer that is used to
   * show the ads
   * @property {object} currentAdBeingLoaded Stores the ad data of the ad that is currently being loaded
   * @property {string} wrapperParentId Used to keep track of ad's wrapper parent ID
   * @property {object} ERROR_CODES Used to define the VAST 3.0 error codes
   */
  var Vast = function() {
    // this.name should match the key in metadata form the server
    this.name = "vast";
    this.amc  = null;
    this.testMode = false;
    this.ADTYPE = "vast";
    this.ready  = false;
    this.currentDepth = 0;
    this.loaded = false;
    this.embedCode = 'unkown';
    this.loaderId = 'OoVastAdsLoader' + _.uniqueId;
    this.movieMd = null;
    this.adURLOverride;
    this.lastOverlayAd;
    this.adTrackingInfo = {};
    this.VAST_AD_CONTAINER = '#vast_ad_container';
    this.currentAdBeingLoaded = null;
    // when wrapper ajax callback returns, wrapperParentId will be properly set
    this.wrapperParentId = null;
    this.adBreaks = [];

    // VPAID Variables
    var vpaidVideoRestrictions          = { technology: OO.VIDEO.TECHNOLOGY.HTML5,
                                            features: [OO.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_GIVE] };
    this.embedCode                      = 'unkown';
    this.testMode                       = false;

    this.adURLOverride                  = '';
    this.allAdInfo                      = null;
    this.showLinearAdSkipButton         = false;
    var vpaidIframe                          = null;
    var timeline                        = [];

    // ad settings
    var transitionFromNonLinearVideo    = false;
    var AD_REQUEST_TYPE                 = 'adRequest';

    var vpaidIframeLoaded               = false;
    var vpaidAdLoaded                   = false;
    var vpaidAdStarted                  = false;
    var vpaidAdStopped                  = false;

    var vpaidIframeLoadedTimeout        = null;
    var vpaidAdLoadedTimeout            = null;
    var vpaidAdStartedTimeout           = null;
    var vpaidAdStoppedTimeout           = null;

    this.VPAID_AD_IFRAME_TIMEOUT         = 5000;
    this.VPAID_AD_LOADED_TIMEOUT         = 5000;
    this.VPAID_AD_STARTED_TIMEOUT        = 5000;
    this.VPAID_AD_STOPPED_TIMEOUT        = 5000;


    // VPAID variables
    this._slot                          = null;
    this._videoSlot                     = null;
    this._videoSlotCanAutoPlay          = true;
    this.environmentVariables           = {};
    this._eventsCallbacks               = {};
    this._parameters                    = {};

    var VPAID_EVENTS                    = {
                                            AD_LOADED                 : 'AdLoaded',
                                            AD_STARTED                : 'AdStarted',
                                            AD_STOPPED                : 'AdStopped',
                                            AD_SKIPPED                : 'AdSkipped',
                                            AD_SKIPPABLE_STATE_CHANGE : 'AdSkippableStateChange',
                                            AD_DURATION_CHANGE        : 'AdDurationChange',
                                            AD_SIZE_CHANGE            : 'AdSizeChange',
                                            AD_LINEAR_CHANGE          : 'AdLinearChange',
                                            AD_INTERACTION            : 'AdInteraction',
                                            AD_IMPRESSION             : 'AdImpression',
                                            AD_CLICK_THRU             : 'AdClickThru',
                                            AD_PAUSED                 : 'AdPaused',
                                            AD_PLAYING                : 'AdPlaying',
                                            AD_VIDEO_START            : 'AdVideoStart',
                                            AD_VIDEO_COMPLETE         : 'AdVideoComplete',
                                            AD_ERROR                  : 'AdError',
                                            AD_LOG                    : 'AdLog',
                                            AD_REMAINING_TIME_CHANGE  : 'AdRemainingTimeChange',
                                            AD_VIDEO_FIRST_QUARTILE   : 'AdVideoFirstQuartile',
                                            AD_VIDEO_MIDPOINT         : 'AdVideoMidpoint',
                                            AD_VIDEO_THIRD_QUARTILE   : 'AdVideoThirdQuartile',
                                            AD_USER_ACCEPT_INVITATION : 'AdUserAcceptInvitation',
                                            AD_VOLUME_CHANGE          : 'AdVolumeChange',
                                            AD_USER_MINIMIZE          : 'AdUserMinimize'
                                          };

    // VAST Parsed variables
    this.format                           = null;
    this.node                             = null;
    this.ads                              = {};

    var fromPause                         = false;
    //END VPAID VARIABLES

    /**
     * TODO: Support all error codes. Not all error events are tracked in our code.
     * Standard VAST 3 errors
     */
    this.ERROR_CODES = {
      /**
       * XML Parsing Error.
       */
      XML_PARSING:                        100,

      /**
       * VAST Schema Validation Error.
       */
      SCHEMA_VALIDATION:                  101,

      /**
       * VAST Version of response not supported.
       */
      VERSION_UNSUPPORTED:                102,

      /**
       * TODO: Add support
       * Trafficking error. Video Player received an ad type that it was not
       * expecting and/or cannot display.
       */
      AD_TYPE_UNSUPPORTED:                200,

      /**
       * TODO: Add support
       * Video player expecting different linearity.
       */
      VIDEO_EXPECT_DIFFERENT_LINEARITY:   201,

      /**
       * TODO: Add support
       * Video player expecting different duration.
       */
      VIDEO_EXPECT_DIFFERENT_DURATION:    202,

      /**
       * TODO: Add support
       * Video player expecting different size.
       */
      VIDEO_EXPECT_DIFFERENT_SIZE:        203,

      /**
       * TODO: Add support
       * General Wrapper Error.
       */
      GENERAL_WRAPPER:                    300,

      /**
       * TODO: Add support
       * Timeout of VAST URI provided in Wrapper element, or of VAST URI
       * provided in a subsequent Wrapper element. Includes request errors
       * such as invalid URI, unreachable or request timeout for URI, and
       * security or other exceptions related to requesting a VAST URI.
       */
      WRAPPER_URI_TIMEOUT:                301,

      /**
       * TODO: Add support
       * Wrapper limit reached, as defined by the video player. Too many
       * Wrapper responses have been received with no inLine response.
       */
      WRAPPER_LIMIT_REACHED:              302,

      /**
       * No ads VAST response after one or more Wrappers. Also includes
       * number of empty VAST responses from fallback.
       */
      WRAPPER_NO_ADS:                     303,

      /**
       * General linear error. Video player is unable to display the linear ad.
       */
      GENERAL_LINEAR_ADS:                 400,

      /**
       * TODO: Add support
       * File not found. Unable to find Linear/MediaFile from URI.
       */
      FILE_NOT_FOUND:                     401,

      /**
       * TODO: Add support
       * Timeout of MediaFile URI.
       */
      MEDIAFILE_TIMEOUT:                  402,

      /**
       * TODO: Add support
       * Could not find MediaFile that is supported by this video player, based
       * on the attributes of the MediaFile element.
       */
      MEDIAFILE_UNSUPPORTED:              403,

      /**
       * TODO: Add support
       * Problem displaying MediaFile.
       */
      MEDIAFILE_DISPLAY_PROBLEM:          405,

      /**
       * General NonLinearAds error.
       */
      GENERAL_NONLINEAR_ADS:              500,

      /**
       * TODO: Add support
       * Unable to display NonLinear Ad because creative dimensions do not
       * align with creative display area(i.e., creative dimension too large).
       */
      NONLINEAR_ADS_DIMENSIONS:           501,

      /**
       * TODO: Add support
       * Unable to fetch NonLinearAds/NonLinear resource.
       */
      NONLINEAR_ADS_UNABLE_TO_FETCH:      502,

      /**
       * TODO: Add support
       * Could not find NonLinear resource with supported type.
       */
      NONLINEAR_ADS_RESOURCE_UNSUPPORTED: 503,

      /**
       * TODO: Add support
       * General CompanionAds error.
       */
      GENERAL_COMPANION_ADS:              600,

      /**
       * TODO: Add support
       * Unable to display companion because creative dimensions do not fit
       * within Companion display area (i.e., no available space).
       */
      COMPANION_ADS_DIMENSIONS:           601,

      /**
       * TODO: Add support
       * Unable to display Required Companion.
       */
      COMPANION_ADS_UNABLE_TO_DISPLAY:    602,

      /**
       * TODO: Add support
       * Unable to fetch CompanionAds/Companion resource.
       */
      COMPANION_ADS_UNABLE_TO_FETCH:      603,

      /**
       * TODO: Add support
       * Could not find Companion resource with supported type.
       */
      COMPANION_ADS_RESOURCE_UNSUPPORTED: 604,

      /**
       * TODO: Add support
       * Undefined error.
       */
      UNDEFINED:                          900,

      /**
       * TODO: Add support
       * General VPAID error.
       */
      GENERAL_VPAID:                      901
    };

    var currentAd = null;
    var nextAd = null;
    var prevAd = null;
    var adPodPrimary = null;
    var adMode = false;

    var VERSION_MAJOR_2 = '2';
    var VERSION_MAJOR_3 = '3';
    var SUPPORTED_VERSIONS = [VERSION_MAJOR_2, VERSION_MAJOR_3];
    var FEATURES = {
      SKIP_AD : "skipAd",
      PODDED_ADS : "poddedAds",
      AD_FALLBACK : "adFallback"
    };
    var SUPPORTED_FEATURES = {};
    SUPPORTED_FEATURES[VERSION_MAJOR_2] = [];
    SUPPORTED_FEATURES[VERSION_MAJOR_3] = [FEATURES.SKIP_AD, FEATURES.PODDED_ADS, FEATURES.AD_FALLBACK];

    var AD_TYPE = {
      INLINE : "InLine",
      WRAPPER : "Wrapper"
    };

    // Used to keep track of whether an ad's firstQuartile, midpoint, or thirdQuartile has been passed.
    var trackingEventQuartiles = {};

    var isMuted = false;
    var lastVolume;

    /**
     * Used to keep track of what events that are tracked for vast.
     */
    var TrackingEvents = ['creativeView', 'start', 'midpoint', 'firstQuartile', 'thirdQuartile', 'complete',
    'mute', 'unmute', 'pause', 'rewind', 'resume', 'fullscreen', 'exitFullscreen', 'expand', 'collapse', 'acceptInvitation',
    'close', 'skip' ];

    /**
     * Helper function to verify that XML is valid
     * @public
     * @method Vast#isValidVastXML
     * @param {XMLDocument} vastXML Contains the vast ad data to be parsed
     * @returns {boolean} Returns true if the xml is valid otherwise it returns false.
     */
    this.isValidVastXML = function(vastXML) {
      return this.isValidRootTagName(vastXML) && this.isValidVastVersion(vastXML);
    };

    /**
     * Helper function to verify XML has valid VAST root tag.
     * @public
     * @method Vast#isValidRootTagName
     * @param {XMLDocument} vastXML Contains the vast ad data to be parsed
     * @returns {boolean} Returns true if the root tag is valid otherwise it returns false.
     */
    this.isValidRootTagName = function(vastXML) {
      if (!getVastRoot(vastXML)) {
        OO.log("VAST: Invalid VAST XML");
        this.trackError(this.ERROR_CODES.SCHEMA_VALIDATION, this.wrapperParentId);
        return false;
      }
      return true;
    };

    /**
     * Helper function to verify XML is a valid VAST version.
     * @public
     * @method Vast#isValidVastVersion
     * @param {XMLDocument} vastXML Contains the vast ad data to be parsed
     * @returns {boolean} Returns true if the VAST version is valid otherwise it returns false.
     */
    this.isValidVastVersion = function(vastXML) {
      var version = getVastVersion(vastXML);
      if (!supportsVersion(version)) {
        OO.log("VAST: Invalid VAST Version: " + version);
        this.trackError(this.ERROR_CODES.VERSION_UNSUPPORTED, this.wrapperParentId);
        return false;
      }
      return true;
    };

    /**
     * Returns the Vast version of the provided XML.
     * @private
     * @method Vast#getVastVersion
     * @param {XMLDocument} vastXML Contains the vast ad data to be parsed
     * @returns {string} The Vast version.
     */
    var getVastVersion = _.bind(function(vastXML) {
      var vastTag = getVastRoot(vastXML);
      return $(vastTag).attr('version');
    }, this);

    /**
     * Helper function to get the VAST root element.
     * @private
     * @method Vast#getVastRoot
     * @param {XMLDocument} vastXML Contains the vast ad data to be parsed
     * @returns {object} null if a VAST tag is absent, or if there are multiple VAST tags. Otherwise,
     * returns the VAST root element.
     */
    var getVastRoot = _.bind(function(vastXML) {
      var vastRootElement = $(vastXML).find("VAST");
      if (vastRootElement.length === 0) {
        OO.log("VAST: No VAST tags in XML");
        return null;
      }
      else if (vastRootElement.length > 1) {
        OO.log("VAST: Multiple VAST tags in XML");
        return null;
      }
      return vastRootElement[0];
    }, this);

    /**
     * Returns the Vast major version. For example, the '3' in 3.0.
     * @private
     * @method Vast#getMajorVersion
     * @param {string} version The Vast version as parsed from the XML
     * @returns {string} The major version.
     */
    var getMajorVersion = _.bind(function(version) {
      if(typeof version === 'string') {
        return version.split('.')[0];
      }
    }, this);

    /**
     * Checks to see if this ad manager supports a given Vast version.
     * @private
     * @method Vast#supportsVersion
     * @param {string} version The Vast version as parsed from the XML
     * @returns {boolean} true if the version is supported by this ad manager, false otherwise.
     */
    var supportsVersion = _.bind(function(version) {
      return _.contains(SUPPORTED_VERSIONS, getMajorVersion(version));
    }, this);

    /**
     * Checks to see if the given Vast version supports the skip ad functionality, as per Vast specs
     * for different versions.
     * @private
     * @method Vast#supportsSkipAd
     * @param {string} version The Vast version as parsed from the XML
     * @returns {boolean} true if the skip ad functionality is supported in the specified Vast version,
     *                    false otherwise.
     */
    var supportsSkipAd = _.bind(function(version) {
      return _.contains(SUPPORTED_FEATURES[getMajorVersion(version)], FEATURES.SKIP_AD);
    }, this);

    /**
     * Helper function to grab error information. vastAdSingleParser already grabs error data while
     * creating ad object, but some errors may occur before the object is created.
     * Note: <Error> can only live in three places: directly under <VAST>, <Ad>, or <Wrapper> elements.
     * <Error> tags are also optional so they may not always exist.
     * @public
     * @method Vast#getErrorTrackingInfo
     * @param {XMLDocument} vastXML Contains the vast ad data to be parsed
     * @param {object} ads A jQuery object which contains the collection of ad elements found
     */
    this.getErrorTrackingInfo = function(vastXML, ads) {
      _.each(ads, function(ad) {
        var error = {
          vastAdObject: null,
          errorURLs: [],
          wrapperParentId: this.wrapperParentId || null
        };

        var errorElement = $(ad).find("Error");
        if (errorElement.length > 0){
          error.errorURLs = [errorElement.text()];
        }
        var adId = $(ad).prop("id");
        this.adTrackingInfo[adId] = error;
      }, this);
    };

    /**
     * This should be the first thing that happens in the parser function: check if the vast XML has no ads.
     * If it does not have ads, track error urls
     * @public
     * @method Vast#checkNoAds
     * @param {XMLDocument} vastXML Contains the vast ad data to be parsed
     * @param {object} ads A jQuery object which contains the collection of ad elements found
     * @returns {boolean} true if there are no ads, false otherwise.
     */
    this.checkNoAds = function(vastXML, ads) {
      // if there are no ads in ad response then track error
      if (ads.length === 0) {
        OO.log("VAST: No ads in XML");
        // there could be an <Error> element in the vast response
        var noAdsErrorURL = $(vastXML).find("Error").text();
        if (noAdsErrorURL) {
          this.pingURL(this.ERROR_CODES.WRAPPER_NO_ADS, noAdsErrorURL);
        }
        // if the ad response came from a wrapper, then go up the chain and ping those error urls
        this.trackError(this.ERROR_CODES.WRAPPER_NO_ADS, this.wrapperParentId);
        return true;
      }
      return false;
    };

    /**
     * Checks to see if the given Vast version supports the podded ads functionality, as per Vast specs
     * for different versions.
     * @private
     * @method Vast#supportsPoddedAds
     * @returns {boolean} true if the podded ads functionality is supported in the specified Vast version,
     *                    false otherwise
     */
    var supportsPoddedAds = _.bind(function(version) {
      return _.contains(SUPPORTED_FEATURES[getMajorVersion(version)], FEATURES.PODDED_ADS);
    }, this);

    /**
     * Checks to see if the given Vast version supports the ad fallback functionality, as per Vast specs
     * for different versions.
     * @private
     * @method Vast#supportsAdFallback
     * @returns {boolean} true if the ad fallback functionality is supported in the specified Vast version,
     *                    false otherwise
     */
    var supportsAdFallback = _.bind(function(version) {
      return _.contains(SUPPORTED_FEATURES[getMajorVersion(version)], FEATURES.AD_FALLBACK);
    }, this);

    /**
     * Default template to use when creating the vast ad object.
     * @private
     * @method Vast#getVastTemplate
     * @returns {object} The ad object that is formated to what we expect vast to look like.
     */
    var getVastTemplate = _.bind(function() {
      return {
        error: [],
        impression: [],
        // Note: This means we only support at most 1 linear and 1 non-linear ad
        linear: {},
        nonLinear: {},
        companion: []
      };
    }, this);

    /**
     * Initialize the vast ad manager. For the Vast Ad Manager it will set the local
     * variable for amc to the current ad manager controller passed into the function and add the
     * event listeners to the amc controller that is needed to handle positioning of the overlay when controls are shown
     * and hidden. It will also add event Listeners that are needed for when the user goes into full screen mode or
     * comes out of it.
     * @public
     * @method Vast#initialize
     * @param {object} amc The current instance of the ad manager controller
     */
    this.initialize = function(amc) {
      this.amc = amc;
      this.amc.addPlayerListener(this.amc.EVENTS.INITIAL_PLAY_REQUESTED, _.bind(this.initialPlay, this));
      this.amc.addPlayerListener(this.amc.EVENTS.REPLAY_REQUESTED, _.bind(this.replay, this));
      this.amc.addPlayerListener(this.amc.EVENTS.FULLSCREEN_CHANGED, _.bind(_onFullscreenChanged, this));
      this.amc.addPlayerListener(this.amc.EVENTS.SIZE_CHANGED, _onSizeChanged);
      this.amc.addPlayerListener(this.amc.EVENTS.AD_PLAYHEAD_TIME_CHANGED, _.bind(this.onAdPlayheadTimeChanged, this));
      this.amc.addPlayerListener(this.amc.EVENTS.AD_VOLUME_CHANGED, _.bind(this.onAdVolumeChanged, this));
    };

    /**
     * Callback when the media file is loaded. Once is loaded we can initialize the ad
     * This is only required for VPAID ads
     * @public
     */
    this.initializeAd = _.bind(function() {
      var eventName,
          environmentVariables,
          viewMode,
          creativeData = {};

      vpaidIframeLoaded = true;

      if (_isVpaidAd(currentAd)) {
        currentAd.data = currentAd.ad.data;

        var mediaFileUrl = _cleanString(currentAd.ad.mediaFile.url);
        if (!mediaFileUrl) {
          return null;
        }

        if (typeof vpaidIframe.contentWindow.getVPAIDAd !== 'function' && !this.testMode) {
          OO.log('VPAID 2.0: Required function getVPAIDAd() is not defined.');
          return;
        }

        try{
          currentAd.vpaidAd = this.testMode ? global.vpaid.getVPAIDAd() : vpaidIframe.contentWindow.getVPAIDAd();
        } catch (e) {
          OO.log("VPAID 2.0: error while getting vpaid creative - " + e)
        }


        // Subscribe to ad unit events
        for (eventName in VPAID_EVENTS) {
          try{
            currentAd.vpaidAd.subscribe(_.bind(_onVpaidAdEvent, this, VPAID_EVENTS[eventName]),
              VPAID_EVENTS[eventName], this);
          } catch (e) {
            OO.log("VPAID 2.0: error while subscribing to creative events - " + e)
          }
        }

        this._slot = _createUniqueElement();
        this._videoSlot = this.amc.ui.adVideoElement[0];

        //PBI-1609: Midroll VPAID 2.0 ads get stuck buffering on Mac Safari if
        //the VPAID creative does not call load() on the video. This is not
        //observed when using the Video Suite Inspector

        //Setting preload to auto seems to address this issue with our player
        //TODO: Find the root cause behind this issue and address it
        if (!OO.requiresSingleVideoElement && OO.isSafari) {
          this._videoSlot.preload = "auto";
        }

        environmentVariables = _.extend({
          slot: this._slot,
          videoSlot: this._videoSlot,
          videoSlotCanAutoPlay: true
        }, this.environmentVariables);

        this._properties = {
          adWidth: this._slot.offsetWidth,
          adHeight: this._slot.offsetHeight,
          adDesiredBitrate: 600
        };

        viewMode = _getFsState() ? 'fullscreen' : 'normal';
        creativeData = {
          AdParameters: currentAd.ad.adParams
        };

        this.initVpaidAd(this._properties['adWidth'], this._properties['adHeight'], viewMode,
                         this._properties['adDesiredBitrate'], creativeData, environmentVariables);
      }
    }, this);

    /**
     * Initializes the ad by sending the data to the ad unit. We then wait until we receive
     * AD_LOADED from the creative before proceeding with rendering.
     * @public
     * This is only required for VPAID ads
     * @method Vast#initVpaidAd
     * @param {number} width Width of the slot where the ad will be placed
     * @param {number} height Height of the slot where the ad will be placed
     * @param {string} viewMode Can be either `normal` or `fullscreen`
     * @param {number} desiredBitrate The bitrate for the ad
     * @param {object} creativeData Contains the aditional ad parameters for the ad
     * @param {object} environmentVars Contains the slot and videoSlot elements
     */
    this.initVpaidAd = function(width, height, viewMode, desiredBitrate, creativeData, environmentVars) {
      if (!_isValidVPaid()) {
        OO.log('VPaid Ad Unit is not valid.');
        return;
      }

      _clearVpaidTimeouts();
      vpaidAdLoadedTimeout = _.delay(_checkVpaidAdLoaded, this.VPAID_AD_LOADED_TIMEOUT);
      _safeFunctionCall(currentAd.vpaidAd, "initAd", [width, height, viewMode, desiredBitrate, creativeData, environmentVars]);
    };

    var _clearVpaidTimeouts = function() {
      clearTimeout(vpaidIframeLoadedTimeout);
      vpaidIframeLoadedTimeout = null;

      clearTimeout(vpaidAdLoadedTimeout);
      vpaidAdLoadedTimeout = null;

      clearTimeout(vpaidAdStartedTimeout);
      vpaidAdStartedTimeout = null;

      clearTimeout(vpaidAdStoppedTimeout);
      vpaidAdStoppedTimeout = null;
    };

    var _checkVpaidIframeLoaded = _.bind(function() {
      if (!vpaidIframeLoaded) {
        OO.log('VPAID: iframe did not load');
        _endAd(currentAd, true);
      }
    }, this);

    var _checkVpaidAdLoaded = _.bind(function() {
      if (!vpaidAdLoaded) {
        OO.log('VPAID: Did not receive AD_LOADED event from creative');
        _endAd(currentAd, true);
      }
    }, this);

    var _checkVpaidAdStarted = _.bind(function() {
      if (!vpaidAdStarted) {
        OO.log('VPAID: Did not receive AD_STARTED event from creative');
        _stopVpaidAd();
      }
    }, this);

    var _checkVpaidAdStopped = _.bind(function() {
      if (!vpaidAdStopped) {
        OO.log('VPAID: Did not receive AD_STOPPED event from creative');
        _endAd(currentAd, true);
      }
    }, this);

    /**
     * Called by Ad Manager Controller.  When this function is called, the ui has been setup and the values
     * in amc.ui are ready to be used.
     * @method Vast#registerUi
     * @public
     */
    this.registerUi = function() {
    };

    /**
     * The ad manger controller will call loadMetadata when the metadata has been loaded and ready to be parsed.
     * Currently the vast ad manager will use the metadata to load any pre-rolls that are specified by the user.
     * @public
     * @method Vast#loadMetadata
     * @param {object} pbMetadata Contains the page level and Backlot metadata of the specific Ad Manager
     * @param {object} baseBacklotMetadata Contains the Backlot base metadata
     * @param {object} movieMetadata Contains the movie metadata that is currently loaded
     */
    this.loadMetadata = function(pbMetadata, baseBacklotMetadata, movieMetadata) {
      // Interpret the data from the page and backlot - possibly combine this function with initialize
      this.embedCode = this.amc.currentEmbedCode;
      this.allAdInfo = movieMetadata.ads || pbMetadata.all_ads;
      this.movieMd = movieMetadata;
      if (pbMetadata) {
        if (pbMetadata.tagUrl) {
          this.adURLOverride = pbMetadata.tagUrl;
        }

        if (pbMetadata.vpaidTimeout) {
          if (_.isNumber(pbMetadata.vpaidTimeout.iframe) && pbMetadata.vpaidTimeout.iframe >= 0) {
            this.VPAID_AD_IFRAME_TIMEOUT = pbMetadata.vpaidTimeout.iframe * 1000;
          }

          if (_.isNumber(pbMetadata.vpaidTimeout.loaded) && pbMetadata.vpaidTimeout.loaded >= 0) {
            this.VPAID_AD_LOADED_TIMEOUT = pbMetadata.vpaidTimeout.loaded * 1000;
          }

          if (_.isNumber(pbMetadata.vpaidTimeout.started) && pbMetadata.vpaidTimeout.started >= 0) {
            this.VPAID_AD_STARTED_TIMEOUT = pbMetadata.vpaidTimeout.started * 1000;
          }

          if (_.isNumber(pbMetadata.vpaidTimeout.stopped) && pbMetadata.vpaidTimeout.stopped >= 0) {
            this.VPAID_AD_STOPPED_TIMEOUT = pbMetadata.vpaidTimeout.stopped * 1000;
          }
        }
      }

      this.ready = true;
      this.amc.onAdManagerReady();
    };

    /**
     * [DEPRECATED]Checks to see if the current metadata contains any ads that are pre-rolls and of type vast. If there are any
     * then it will load the ads.
     * @public
     * @method Vast#loadPreRolls[DEPRECATED]
     */
    this.loadPreRolls = function() {
      //deprecated
    };

    /**
     * [DEPRECATED]Checks the metadata for any remaining ads of type vast that are not pre-rolls.
     * If it finds any then it will load them.
     * @public
     * @method Vast#loadAllVastAds[DEPRECATED]
     */
    this.loadAllVastAds = function() {
      //deprecated

    };

    /**
     * Destroys the ad manager.
     * @private
     * @method vast#failedAd
     */
    var failedAd = _.bind(function() {
      var metadata = null;
      var badAd = currentAd;
      currentAd = null;

      if (badAd) {
        if(badAd.ad && badAd.ad.fallbackAd) {
          metadata = badAd.ad.fallbackAd;
        }
        _endAd(badAd, true);
        //force fallback ad to play if it exists
        //otherwise end the ad pod
        if (metadata) {
          var ad = generateAd(metadata);
          this.amc.forceAdToPlay(this.name, ad.ad, ad.adType, ad.streams);
        } else {
          var adPod = adPodPrimary;
          adPodPrimary = null;
          if(adPod) {
             this.amc.notifyPodEnded(adPod.id);
           } else {
             this.amc.notifyPodEnded(badAd.id);
          }
        }
      }
    }, this);

    /**
     * Finds ads based on the position provided to the function.
     * @private
     * @method Vast#loadAd
     * @param {string} position The position of the ad to be loaded. 'pre' (preroll), 'midPost' (midroll and post rolls)
     * 'all' (all positions).
     * @returns {boolean} returns true if it found an ad or ads to load otherwise it returns false. This is only used for
     * unit tests.
     */
    var loadAd = _.bind(function(amcAd) {
      var loadedAds = false;
      var override = false;
      var ad = amcAd.ad;
      this.amc.notifyPodStarted(amcAd.id, 1);
      if (this.adURLOverride) {
        override = true;
        ad.tag_url = this.adURLOverride;
      }

      this.currentAdBeingLoaded = ad;
      var url = typeof ad.url !== 'undefined' && !override ? ad.url : ad.tag_url;
      this.loadUrl(url);
      loadedAds = true;
      return loadedAds;
    }, this);

    /**
     * Registered as a callback with the AMC, which gets called by the Ad Manager Controller when the the play head updates
     * during ad playback.
     * @public
     * @method Vast#onAdPlayheadTimeChanged
     * @param {string} eventname The name of the event for which this callback is called
     * @param {number} playhead Current video time (seconds)
     * @param {number} duration Duration of the current video (seconds)
     */
    this.onAdPlayheadTimeChanged = function(eventName, playhead, duration) {
      var firstQuartileTime = duration / 4;
      var midpointTime = duration / 2;
      var thirdQuartileTime = (3 * duration) / 4;

      if (!trackingEventQuartiles.firstQuartile && playhead >= firstQuartileTime) {
        _handleTrackingUrls(currentAd, ["firstQuartile"]);
        trackingEventQuartiles.firstQuartile = true;
      }
      else if (!trackingEventQuartiles.midpoint && playhead >= midpointTime) {
        _handleTrackingUrls(currentAd, ["midpoint"]);
        trackingEventQuartiles.midpoint = true;
      }
      else if (!trackingEventQuartiles.thirdQuartile && playhead >= thirdQuartileTime) {
        _handleTrackingUrls(currentAd, ["thirdQuartile"]);
        trackingEventQuartiles.thirdQuartile = true;
      }
    };

    /**
     * Registered as a callback with the AMC, which gets called by the Ad Manager Controller when the play button is hit
     * or the video automatically plays the first time. Here it will try to load the rest of the vast ads at this point
     * if there any. This function should only be used if you need to do something the first time the user hits play.
     * @public
     * @method Vast#initialPlay
     */
    this.initialPlay = function() {
      return this.loadAllVastAds();
    };

    /**
     * Registered as a callback with the AMC, which gets called by the Ad Manager Controller when the replay button is
     * clicked. Here it will try to load the rest of the vast ads at this point if there any.
     * @public
     * @method Vast#replay
     */
    this.replay = function() {
      this.loadPreRolls();
      this.loadAllVastAds();
    };

    /**
     *
     * This is required by the Ad Manager Controller but for Vast ads nothing is done here.
     * @returns The array of the new timeline to merge into the controller timeline but Vast Manager doesn't use this
     * function since we add the Ads one by one, so we just return null so it is ignored by the AMC.
     * @public
     * @method Vast#buildTimeline
     */
    this.buildTimeline = function() {
      var timeline = [];
      if (this.allAdInfo && _.isArray(this.allAdInfo))
      {
        for (var i = 0; i < this.allAdInfo.length; i++)
        {
          var adMetadata = _.clone(this.allAdInfo[i]);
          adMetadata.type = AD_REQUEST_TYPE;
          //use linear overlay as fake ad so we don't have to specify stream type.
          var adData = {
            adManager: this.name,
            ad: adMetadata,
            duration: 0,
            adType: this.amc.ADTYPE.LINEAR_OVERLAY,
          };

          if (adMetadata.position_type == 't') {
            adData.position = adMetadata.time/1000;
          } else if (adMetadata.position_type == 'p') {
            //TODO
            //adData.position =
          }
          var amcAd = new this.amc.Ad(adData);
          timeline.push(amcAd);
        }
      }
      return timeline;
    };

    /**
     * Called when the ad starts playback.
     * @public
     * @method Vast#adVideoPlaying
     */
    this.adVideoPlaying = function() {
      if (currentAd && currentAd.ad && currentAd.ad.nextAdInPod && !fromPause) {
        var metadata = currentAd.ad.nextAdInPod;
        if (metadata) {
          var ad = generateAd(metadata);

          if (metadata.streamUrl != null ||
              (ad.adType == this.amc.ADTYPE.LINEAR_VIDEO && !_.isEmpty(metadata.streams)) ||
              _isVpaidAd(currentAd)) {
            nextAd = ad;
          }
        }
      }
      fromPause = false;
      //TODO: VPAID: Figure out why this is called when resuming video from clicking to non video
    };

    /**
     * When the ad is finished playing we need to call the AMC callback that was provided to let the AMC know that the
     * ad is finished playing.
     * @public
     * @method Vast#adVideoEnded
     */
    this.adVideoEnded = function() {
      prevAd = currentAd;

      //VPAID 2.0 ads will end after notifying the ad of stopAd
      if (!_isVpaidAd(currentAd)) {
        _endAd(currentAd, false);
        _handleTrackingUrls(prevAd, ["complete"]);
      }

      adMode = false;
    };

    /**
     * When the ad fails to play we need to call the AMC callback that was provided to let the AMC know that the
     * ad is finished playing and we need to follow the process for cleaning up after an ad fails.
     * @public
     * @method Vast#adVideoError
     * @param {object} adWrapper The current Ad's metadata
     * @param {number} errorCode The error code associated with the VTC error
     */
    this.adVideoError = function(adWrapper, errorCode) {
      // VTC will pause the ad when the video element loses focus
      // TODO: add douglas error handling changes
      OO.log('Ad failed to play with error code:' + errorCode);
      failedAd();
    };

    /**
     * The Ad Manager Controller will call this function when it finds an Ad to play. The type of Ad is checked to see
     * if it is a non-linear or linear Ad. If it is linear then it will hide any overlays that are currently being
     * displayed and add the video to the adVideoElement.  It will also call the adStartedCallback for the linear Ad to
     * inform the Ad Manager Controller that a video Ad started playing. Companion ads are checked for and listeners
     * are added to know when the video ends. However, if the ad is a non-linear ad, then createOverlay is called.
     * @public
     * @method Vast#playAd
     * @param {object} adWrapper The current Ad's metadata
     */
    this.playAd = function(adWrapper) {
      adMode = true;
      trackingEventQuartiles = {};
      if (adWrapper) {
        currentAd = adWrapper;
        if (currentAd.ad) {
          if (currentAd.ad.type === AD_REQUEST_TYPE) {
            loadAd(currentAd);
          } else {
            _playLoadedAd(adWrapper);
          }
        }
      }
    };

    /**
     * Ping a list of tracking event names' URLs.
     * @private
     * @method Vast#_handleTrackingUrls
     * @param {object} amcAd The AMC ad object
     * @param {string[]} trackingEventNames The array of tracking event names
     */
    var _handleTrackingUrls = _.bind(function(amcAd, trackingEventNames) {
      var adId = _getAdId(amcAd);

      if (amcAd) {
        _.each(trackingEventNames, function(trackingEventName) {
          var urls;
          switch (trackingEventName) {
            case "impression":
              urls = _getImpressionUrls(amcAd);
              break;
            case "linearClickTracking":
              urls = _getLinearClickTrackingUrls(amcAd);
              break;
            case "nonLinearClickTracking":
              urls = _getNonLinearClickTrackingUrls(amcAd);
              break;
            default:
              urls = _getTrackingEventUrls(amcAd, trackingEventName);
          }
          var urlObject = {};
          urlObject[trackingEventName] = urls;
          _pingTrackingUrls(urlObject, adId);
        });
      }
      else {
        console.log(
            "VAST: Tried to ping URLs: [" + trackingEventNames +
            "] but ad object passed in was: " + amcAd
        );
      }

      // Try to ping parent tracking events as well
      if (this.adTrackingInfo &&
          this.adTrackingInfo[adId] &&
          this.adTrackingInfo[adId].wrapperParentId) {
        var parentId = this.adTrackingInfo[adId].wrapperParentId;
        var parentAdTrackingObject = this.adTrackingInfo[parentId];
        if (parentAdTrackingObject) {
          var parentAdObject = this.adTrackingInfo[parentId].vastAdObject;
          _handleTrackingUrls(parentAdObject, trackingEventNames);
        }
      }
    }, this);

    /**
     * Helper function to return the object that directly contains the VAST ad information.
     * @private
     * @method Vast#_getVastAdObject
     * @param {object} amcAd The AMC Ad object containing the VAST ad object, or the VAST ad
     * object itself
     * @returns {object} The VAST ad object.
     */
    var _getVastAdObject = function(amcAd) {
      var vastAdObject = null;
      if (amcAd &&
          amcAd.ad &&
          amcAd.ad.data) {
        vastAdObject = amcAd.ad.data;
      }
      else if (amcAd &&
               amcAd.data) {
        vastAdObject = amcAd.data;
      }
      else {
        vastAdObject = amcAd;
      }
      return vastAdObject;
    };

    /**
     * Helper function to retrieve the ad object's impression urls.
     * @private
     * @method Vast#_getImpressionUrls
     * @param {object} amcAd The AMC ad object
     * @return {string[]|null} The array of impression urls. Returns null if no URLs exist.
     */
    var _getImpressionUrls = function(amcAd) {
      var vastAdObject = _getVastAdObject(amcAd);
      var impressionUrls = null;
      if (vastAdObject &&
          vastAdObject.impression &&
          vastAdObject.impression.length > 0) {
        impressionUrls = vastAdObject.impression;
      }
      return impressionUrls;
    };

    /**
     * Helper function to retrieve the ad object's linear click tracking urls.
     * @private
     * @method Vast#_getLinearClickTrackingUrls
     * @param {object} amcAd The AMC ad object
     * @return {string[]|null} The array of linear click tracking urls. Returns null if no
     * URLs exist.
     */
    var _getLinearClickTrackingUrls = function(amcAd) {
      var vastAdObject = _getVastAdObject(amcAd);
      var linearClickTrackingUrls = null;
      if (vastAdObject &&
          vastAdObject.linear &&
          vastAdObject.linear.clickTracking &&
          vastAdObject.linear.clickTracking.length > 0) {
        linearClickTrackingUrls = vastAdObject.linear.clickTracking;
      }
      return linearClickTrackingUrls;
    };

    /**
     * Helper function to retrieve the ad object's linear click through url.
     * @private
     * @method Vast#_getLinearClickThroughUrl
     * @param {object} amcAd The AMC ad object
     * @return {string|null} The linear click through url. Returns null if no
     * URL exists.
     */
    var _getLinearClickThroughUrl = function(amcAd) {
      var vastAdObject = _getVastAdObject(amcAd);
      var linearClickThroughUrl = null;
      if (vastAdObject &&
          vastAdObject.linear &&
          vastAdObject.linear.clickThrough) {
        linearClickThroughUrl = vastAdObject.linear.clickThrough;
      }
      return linearClickThroughUrl;
    };

    /**
     * Helper function to retrieve the ad object's nonlinear click through url.
     * @private
     * @method Vast#_getNonLinearClickThroughUrl
     * @param {object} amcAd The AMC ad object
     * @return {string|null} The nonlinear click through url. Returns null if no
     * URL exists.
     */
    var _getNonLinearClickThroughUrl = function(amcAd) {
      var vastAdObject = _getVastAdObject(amcAd);
      var nonLinearClickThroughUrl = null;
      if (vastAdObject &&
          vastAdObject.nonLinear &&
          vastAdObject.nonLinear.nonLinearClickThrough) {
        nonLinearClickThroughUrl = vastAdObject.nonLinear.nonLinearClickThrough;
      }
      return nonLinearClickThroughUrl;
    };

    /**
     * Helper function to retrieve the ad object's nonlinear click tracking urls.
     * @private
     * @method Vast#_getNonLinearClickTrackingUrls
     * @param {object} amcAd The AMC ad object
     * @return {string[]|null} The array of nonlinear click tracking urls. Returns null if no
     * URLs exist.
     */
    var _getNonLinearClickTrackingUrls = function(amcAd) {
      var vastAdObject = _getVastAdObject(amcAd);
      var nonLinearClickTrackingUrls = null;
      if (vastAdObject &&
          vastAdObject.nonLinear &&
          vastAdObject.nonLinear.nonLinearClickTracking &&
          vastAdObject.nonLinear.nonLinearClickTracking.length > 0) {
        nonLinearClickTrackingUrls = vastAdObject.nonLinear.nonLinearClickTracking;
      }
      return nonLinearClickTrackingUrls;
    };

    /**
     * Helper function to get an ad object's "high level" click through url.
     * @private
     * @method Vast#_getHighLevelClickThroughUrl
     * @param {object} amcAd The AMC ad object
     * @returns {string|null} The clickthrough URL string. Returns null if one does not exist.
     */
    var _getHighLevelClickThroughUrl = function(amcAd) {
      var vastAdObject = _getVastAdObject(amcAd);
      var highLevelClickThroughUrl = null;
      if (vastAdObject &&
          vastAdObject.clickThrough) {
        highLevelClickThroughUrl = vastAdObject.clickThrough;
      }
      return highLevelClickThroughUrl;
    };

    /**
     * Helper function to get an ad object's "ooyala" click through url.
     * @private
     * @method Vast#_getOoyalaClickThroughUrl
     * @param {object} amcAd The AMC ad object
     * @returns {string|null} The clickthrough URL string. Returns null if one does not exist.
     */
    var _getOoyalaClickThroughUrl = function(amcAd) {
      var ooyalaClickThroughUrl = null;
      if (amcAd &&
          amcAd.click_url) {
        ooyalaClickThroughUrl = amcAd.click_url;
      }
      return ooyalaClickThroughUrl;
    };

    /**
     * Helper function to retrieve the ad object's tracking urls under a specific event name.
     * @private
     * @method Vast#_getTrackingEventUrls
     * @param {object} amcAd The AMC ad object
     * @param {string} trackingEventName The name of the tracking event
     * @returns {string[]|null} The array of tracking urls associated with the event name. Returns null if no URLs exist.
     */
    var _getTrackingEventUrls = function(amcAd, trackingEventName) {
      var vastAdObject = _getVastAdObject(amcAd);
      var trackingUrls = null;

      // get tracking urls from both the linear and nonLinear object
      var linearTrackingUrls = [];
      var nonLinearTrackingUrls = [];

      if (vastAdObject &&
          vastAdObject.linear &&
          vastAdObject.linear.tracking &&
          vastAdObject.linear.tracking[trackingEventName] &&
          vastAdObject.linear.tracking[trackingEventName].length > 0) {
        linearTrackingUrls = vastAdObject.linear.tracking[trackingEventName];
      }

      if (vastAdObject &&
          vastAdObject.nonLinear &&
          vastAdObject.nonLinear.tracking &&
          vastAdObject.nonLinear.tracking[trackingEventName] &&
          vastAdObject.nonLinear.tracking[trackingEventName].length > 0) {
        nonLinearTrackingUrls = vastAdObject.nonLinear.tracking[trackingEventName];
      }

      if (!_.isEmpty(linearTrackingUrls) || !_.isEmpty(nonLinearTrackingUrls)) {
        trackingUrls = linearTrackingUrls.concat(nonLinearTrackingUrls);
      }

      return trackingUrls;
    };

    /**
     * Helper function to retrieve the ad object's ad ID (the value of the <Ad> element's "id" attribute).
     * Not the "id" our ad manager assigns.
     * @private
     * @method Vast#_getAdId
     * @param {object} amcAd The AMC ad object
     * @returns {string|null} The ad's ID attribute. Returns null if the ID does not exist.
     */
    var _getAdId = function(amcAd) {
      var vastAdObject = _getVastAdObject(amcAd);
      var adId = null;
      if (vastAdObject &&
          vastAdObject.id) {
        adId = vastAdObject.id;
      }
      return adId;
    };

    /**
     * Helper function to ping URLs in each set of tracking event arrays.
     * @private
     * @method Vast#_pingTrackingUrls
     * @param {object} urlObject An object with the tracking event names and their
     * associated URL array.
     * @param {object} adId The ad ID
     */
    var _pingTrackingUrls = _.bind(function(urlObject, adId) {
      for (var trackingName in urlObject) {
        if (urlObject.hasOwnProperty(trackingName)) {
          try {
            var urls = urlObject[trackingName];
            if (urls) {
              OO.pixelPings(urls);
              OO.log("VAST: \"" + trackingName + "\" tracking URLs pinged for VAST Ad Id: " + adId);
            }
            else {
              OO.log("VAST: No \"" + trackingName + "\" tracking URLs provided to ping for VAST Ad Id: " + adId);
            }
          }
          catch(e) {
            OO.log("VAST: Failed to ping \"" + trackingName + "\" tracking URLs for VAST Ad Id: " + adId);
            if (this.amc) {
              this.amc.raiseAdError(e);
            }
          }
        }
      }
    }, this);

    /**
     * Play an ad from the AMC timeline that has already be loaded (AKA is not an
     * ad request).
     * @private
     * @method Vast#_playLoadedAd
     * @param  {object} adWrapper An object of type AdManagerController.Ad containing ad metadata
     */
    var _playLoadedAd = _.bind(function(adWrapper) {

      var isVPaid = _isVpaidAd(currentAd);

      // When the ad is done, trigger callback
      if (adWrapper.isLinear) {
        if (adWrapper.ad.adPodIndex === 1) {
          //Only handle primary if it is null, to prevent fallback ad from staring
          //another ad pod
          if (adPodPrimary === null) {
            adPodPrimary = adWrapper;
            this.amc.notifyPodStarted(adWrapper.id, adWrapper.ad.adPodLength);
          }
        }

        var hasClickUrl = adWrapper.ad.data.linear.clickThrough.length > 0;
        this.amc.notifyLinearAdStarted(adWrapper.id, {
          name: adWrapper.ad.data.title,
          duration: adWrapper.ad.durationInMilliseconds/1000,
          hasClickUrl: hasClickUrl,
          indexInPod: adWrapper.ad.adPodIndex,
          skippable: false
        });
      } else {
        var streamUrl;
        if (adWrapper.ad && adWrapper.ad.streamUrl) {
          streamUrl = adWrapper.ad.streamUrl;
        }
        else if (adWrapper.streamUrl) {
          streamUrl = adWrapper.streamUrl;
        } else {
          //TODO: What happens when streamUrl is the empty string? Will AMC get notified of an error?
          streamUrl = '';
        }

        this.amc.sendURLToLoadAndPlayNonLinearAd(adWrapper, adWrapper.id, streamUrl);
      }
      if (isVPaid) {
        //Since a VPAID 2.0 ad handles its own UI, we want the video player to hide its UI elements
        this.amc.hidePlayerUi();
        _getFrame();
      } else {
        // For VPAID we can only set the skip offset and check for companions when ad already started
        this.checkCompanionAds(adWrapper.ad);
        initSkipAdOffset(adWrapper);
      }

      // try and ping tracking URLs
      _handleTrackingUrls(adWrapper, ["creativeView", "start", "impression"]);
    }, this);

    /**
     * Determine if a Vast ad is skippable, and if so, when the skip ad button should be displayed.
     * Notifies AMC of the result.
     * @private
     * @method Vast#initSkipAdOffset
     * @param {object} adWrapper The current Ad's metadata
     */
    var initSkipAdOffset = _.bind(function(adWrapper) {
      var isVPaid = _isVpaidAd(adWrapper);
      var adSkippableState = false;
      var skipOffset = '';
      if (isVPaid) {
        adSkippableState = _safeFunctionCall(adWrapper.vpaidAd, "getAdSkippableState");
      }

      var canSkipAds = false;
      if (adWrapper && adWrapper.ad && adWrapper.ad.data) {
        canSkipAds = supportsSkipAd(adWrapper.ad.data.version);
      }

      if (canSkipAds) {
        skipOffset = adWrapper.ad.data.linear.skipOffset;

        if (skipOffset) {
          if (skipOffset.indexOf('%') === skipOffset.length - 1) {
            this.amc.showSkipVideoAdButton(true, skipOffset, true);
          } else {
            //Vast format: HH:MM:SS.mmm
            var splits = skipOffset.split(':');
            var hh = splits[0];
            var mm = splits[1];
            var ss = splits[2];
            var ms = 0;
            var secondsSplits = ss.split('.');
            if (secondsSplits.length === 2) {
              ss = secondsSplits[0];
              ms = secondsSplits[1];
            }
            var offset = +ms + (+ss * 1000) + (+mm * 60 * 1000) + (+hh * 60 * 60 * 1000);
            //Provide the offset to the AMC in seconds
            offset = Math.round(offset / 1000);
            this.amc.showSkipVideoAdButton(true, offset.toString(), true);
          }
        } else {
          if (!isVPaid) {
            this.amc.showSkipVideoAdButton(false);
          } else {
            this.amc.showSkipVideoAdButton(adSkippableState,
                            this.amc.adManagerSettings['linearAdSkipButtonStartTime'].toString());
          }
        }
      } else {
        //For Vast versions that don't support the skipoffset attribute, we
        //want to use Ooyala's settings for displaying the skip ad button
          if (!isVPaid) {
            this.amc.showSkipVideoAdButton(true);
          } else {
            this.amc.showSkipVideoAdButton(adSkippableState,
                            this.amc.adManagerSettings['linearAdSkipButtonStartTime'].toString());
          }
      }
    }, this);

    /**
     * This is called by the Ad Manager Controller when it needs to cancel an Ad due to a timeout or skip button.
     * @public
     * @method Vast#cancelAd
     * @param {object} ad The Ad that needs to be cancelled
     * @param {object} params An object containing information about the cancellation
     *                        code : The amc.AD_CANCEL_CODE for the cancellation
     */
    this.cancelAd = function(ad, params) {
      //TODO: add timout logic if needed here as well.
      if (!this.amc || !this.amc.ui || !ad) {
        return;
      }
      if (params) {
        if (params.code === this.amc.AD_CANCEL_CODE.TIMEOUT) {
          failedAd();
        }
        else if (params.code === this.amc.AD_CANCEL_CODE.SKIPPED && currentAd) {
          if (currentAd.vpaidAd) {
            // Notify Ad Unit that we are skipping the ad
            _safeFunctionCall(currentAd.vpaidAd, "skipAd");
          }
          else if (ad.isLinear) {
            _skipAd(currentAd);
          }
        }
      }
      else {
        _endAd(ad, false);
      }
    };

    /**
     * Called when a linear ad is skipped.
     * @private
     * @method Vast#_skipAd()
     * @param {object} currentAd The ad metadata
     */
    var _skipAd = _.bind(function() {
      prevAd = currentAd;
      _endAd(currentAd, false);
      _handleTrackingUrls(prevAd, ["skip"]);
      adMode = false;
    }, this);

    /**
     * Ends an ad. Notifies the AMC about the end of the ad. If it is the last linear ad in the pod,
     * will also notify the AMC of the end of the ad pod.
     * @private
     * @method Vast#_endAd
     * @param {object} ad The ad to end
     * @param {boolean} failed If true, the ending of this ad was caused by a failure
     */
    var _endAd = _.bind(function(ad, failed) {
      _clearVpaidTimeouts();
      if (typeof this._slot !== 'undefined') {
        $(this._slot).remove();
      }

      if (typeof vpaidIframe !== 'undefined') {
        $(vpaidIframe).remove();
      }

      if (currentAd && ad) {
        currentAd = null;
        var isLinear = (ad.vpaidAd ? _safeFunctionCall(ad.vpaidAd, "getAdLinear") : false) || ad.isLinear;
        if (isLinear) {
          this.amc.notifyLinearAdEnded(ad.id);
          //TODO: What does this block do?
          if (transitionFromNonLinearVideo) {
            this.amc.ui.transitionToMainContent(true, false);
            transitionFromNonLinearVideo = false;
            this.amc.notifyNonlinearAdEnded(ad.id);
          }
          if((ad.ad.adPodIndex === ad.ad.adPodLength && !failed) || !nextAd) {
            var adPod = adPodPrimary || ad.id;
            adPodPrimary = null;
            this.amc.notifyPodEnded(adPod.id);
          }
        } else {
          this.lastOverlayAd = null;
          this.amc.notifyNonlinearAdEnded(ad.id);
        }
      }

      if (nextAd) {
        var next = nextAd;
        nextAd = null;
        this.amc.forceAdToPlay(this.name, next.ad, next.adType, next.streams);
      }
    }, this);

    /**
     * Called by the Ad Manager Controller when the module is unregistered, we need to remove any overlays that are visible.
     * @public
     * @method Vast#destroy
     * @param {object} ad Ad to cancel if it is not null
     */
    this.destroy = function() {
      // Stop any running ads
      this.cancelAd(currentAd);
      this.ready = false;
      this.currentDepth = 0;
      this.lastOverlayAd = null;
      adPodPrimary = null;
    };

    /**
     * Generates an AdManagerController (AMC) Ad object from the provided metadata.
     * @private
     * @method Vast#generateAd
     * @param {object} metadata The ad metadata to be used for the AMC Ad object
     * @return {object} The AMC Ad object
     */
    var generateAd = _.bind(function(metadata) {
      if (!metadata) return false;
      var duration;

      if (!_.isEmpty(metadata.data.linear.mediaFiles)) {
        duration = OO.timeStringToSeconds(metadata.data.linear.duration);
      }
      else
      {
        duration = metadata.data.nonLinear.duration ?  OO.timeStringToSeconds(metadata.data.nonLinear.duration) : 0;
      }

      var ad = new this.amc.Ad({
        position: metadata.positionSeconds, duration: duration, adManager: this.name,
        ad: metadata, adType: metadata.data.type, streams: metadata.streams
      });

      if (metadata.data.adType === "vpaid") {
        ad.videoRestrictions = vpaidVideoRestrictions;
      }

      return ad;
    }, this);

    /**
     * Takes an ad and adds it to the timeline by calling appenedToTimeline which is an Ad Manager Controller function.
     * Also the properties of whether an ad is linear or not, and whether or not the marquee should show are set here.
     * @private
     * @method Vast#addToTimeline
     * @param {object} metadata The ad metadata that is being added to the timeline
     * @returns {boolean} True if the ad was added to the timeline successfully, false otherwise.
     */
    var addToTimeline = _.bind(function(metadata) {
      if (!metadata) return;
      var timeline = [];
      var ad = generateAd(metadata);
      var isVPaid = metadata.data && metadata.data.adType === 'vpaid';

      //TODO: This might need to get integrated with Doug's error handling changes.
      //I recall errors for when streams or media files aren't defined. We need to check with Doug on this when we merge.
      if (metadata.streamUrl != null ||
          (ad.adType == this.amc.ADTYPE.LINEAR_VIDEO && !_.isEmpty(metadata.streams)) ||
          (ad.adType === this.amc.ADTYPE.NONLINEAR_OVERLAY && !_.isEmpty(metadata.data.nonLinear.mediaFiles.url))) {
        timeline.push(ad);
        this.amc.appendToTimeline(timeline);
        return true;
      }

      return false;
    }, this);

    /**
     * Attempts to load the Ad after normalizing the url.
     * @public
     * @method Vast#ajax
     * @param {string} url The url that contains the Ad creative
     * @param {function} errorCallback callback in case there is an error in loading
     * @param {string} dataType Type of data, currently either "xml" if vast fails to load and "script" if it loads
     * successfully.
     * @param {object} loadingAd The current Ad metadata that is being loaded
     * @param {string} wrapperParentId The current ad's "parent" ad id. Could be
     * undefined if ad does not have parent/wrapper. We want to pass this in to the next vast response
     * so the new ad knows who its parent is for tracking event purposes.
     */
    this.ajax = function(url, errorCallback, dataType, loadingAd, wrapperParentId) {
      $.ajax({
        url: OO.getNormalizedTagUrl(url, this.embedCode),
        type: 'GET',
        beforeSend: function(xhr) {
          xhr.withCredentials = true;
        },
        dataType: dataType,
        crossDomain: true,
        cache:false,
        //TODO: should pass wrapperParentId here for wrapper
        success: (dataType == "script") ? function() {} : _.bind(this.onResponse, this, wrapperParentId,
            loadingAd || this.currentAdBeingLoaded),
        error: _.bind(errorCallback, this, loadingAd || this.currentAdBeingLoaded)
      });
      this.currentAdBeingLoaded = null;
    };

    /**
     * Opens a page based on the clickthrough url when the user click on the Ad.
     * @public
     * @method Vast#playerClicked
     * @param {object} amcAd Ad wrapper that is sent from the Ad Manager Controller that contains the data
     * @param {boolean} showPage If set to true then we show the page, if it is false then we don't show the page
     */
    this.playerClicked = function(amcAd, showPage) {
      if (!amcAd || !showPage) {
        return;
      }
      var urlOpened = false;
      var highLevelClickThroughUrl = _getHighLevelClickThroughUrl(amcAd);
      var ooyalaClickUrl = _getOoyalaClickThroughUrl(amcAd);
      var adSpecificClickThroughUrl;

      if (highLevelClickThroughUrl) {
        urlOpened = urlOpened || this.openUrl(highLevelClickThroughUrl);
      }

      if (ooyalaClickUrl) {
        urlOpened = urlOpened || this.openUrl(ooyalaClickUrl);
      }

      //TODO: Why was this amcAd.ad.data in the else removed? Was it causing an issue?
      if (amcAd.isLinear) {
        adSpecificClickThroughUrl = _getLinearClickThroughUrl(amcAd);
        urlOpened = urlOpened || this.openUrl(adSpecificClickThroughUrl);
        _handleTrackingUrls(amcAd, ["linearClickTracking"]);
      } else {
        adSpecificClickThroughUrl = _getNonLinearClickThroughUrl(amcAd);
        urlOpened = urlOpened || this.openUrl(adSpecificClickThroughUrl);
        _handleTrackingUrls(amcAd, ["nonLinearClickTracking"]);
      }

      if (urlOpened) {
        this.amc.adsClickthroughOpened();
      }
    };

    /**
     * Pauses the ad element.
     * @public
     * @method Vast#pauseAd
     * @param {object} amcAd The current ad data
     */
    this.pauseAd = function(amcAd) {
      // Need to notify the ad unit that the player was paused
      if (currentAd && currentAd.vpaidAd) {
        _safeFunctionCall(currentAd.vpaidAd, "pauseAd");
      }
      _handleTrackingUrls(amcAd, ["pause"]);
    };

    /**
     * Resume the ad element.
     * @public
     * @method Vast#resumeAd
     * @param {object} amcAd The current ad data
     */
    this.resumeAd = function(amcAd) {
      // Need to notify the ad unit that the player was resumed
      if (currentAd && currentAd.vpaidAd) {
        _safeFunctionCall(currentAd.vpaidAd, "resumeAd");
      }
      _handleTrackingUrls(amcAd, ["resume"]);
    };

    /**
     * When the Ad Manager Controller needs to hide the overlay it will call this function. We will store the current ad
     * for reference. Vast ad doesn't need to do much other then save the reference.
     * @public
     * @method Vast#hideOverlay
     * @param {object} currentAd In order to not lose reference to the overlay object that is currently being shown, it
     * is stored in this object
     */
    this.hideOverlay = function(currentAd) {
      this.lastOverlayAd = currentAd;
    };

    /**
     * This function gets called by the Ad Manager Controller when an ad has completed playing. If the main video is
     * finished playing and there was an overlay displayed before the post-roll then it needs to be cleared out of memory. If the main
     * video hasn't finished playing and then it needs to be displayed agained but VAST doesn't need to do anything here.
     * @public
     * @method Vast#showOverlay
     */
    this.showOverlay = function() {
      if (this.amc.ended && this.lastOverlayAd) {
        this.cancelAd(lastOverlayAd);
      }
    };

    /**
     * This function gets called by the Ad Manager Controller when an overlay has been canceled by clicking the close button.
     * @public
     * @method Vast#cancelOverlay
     */
    this.cancelOverlay = function() {
      _handleTrackingUrls(currentAd, ["close"]);
    };

    /**
     * Opens a new page pointing to the URL provided.
     * @public
     * @method Vast#openUrl
     * @param {string} url The url that we need to open in a new page
     * @returns {boolean} true, if the URL is valid. Returns false, if url is invalid.
     */
    this.openUrl = function(url) {
      if (!url || typeof url !== 'string') {
        return false;
      }
      var newWindow = window.open(url);
      newWindow.opener = null;
      newWindow.location = url;
      return true;
    };

    /**
     * Calls ajax to load the Ad via the url provided.
     * @public
     * @method Vast#loadUrl
     * @param {string} url The Ad creative url
     */
    this.loadUrl = function(url) {
      this.vastUrl = url;
      if (!this.testMode) {
        this.ajax(url, this.onVastError, 'xml');
      }
    };

    /**
     *  If the Ad fails to load this callback is called.
     *  @public
     *  @method Vast#onVastError
     */
    this.onVastError = function() {
      OO.log("VAST: Ad failed to load");
      failedAd();
    };

    /**
     * This method pings all the ad's error URLs with a specific error code if the error URL
     * contains the macro, "[ERRORCODE]". If ad has a parent wrapper, then go up the chain and ping
     * wrapper's error urls as well.
     * @public
     * @method Vast#trackError
     * @param {number} code Error code
     * @param {boolean} currentAdId Ad ID of current ad
     */
    this.trackError = function(code, currentAdId) {
      if (currentAdId && currentAdId in this.adTrackingInfo) {
        this.pingURLs(this.adTrackingInfo[currentAdId].errorURLs);
        var parentId = this.adTrackingInfo[currentAdId].wrapperParentId;

        // ping parent wrapper's error urls too if ad had parent
        if (parentId) {
          this.trackError(code, parentId);
        }
      }
    };

    /**
     * Helper function to ping error URL. Replaces error macro if it exists.
     * @public
     * @method Vast#pingURL
     * @param {number} code Error code
     * @param {string} url URL to ping
     */
    this.pingURL = function(code, url) {
      url = url.replace(/\[ERRORCODE\]/, code);
      OO.pixelPing(url);
    };

    /**
     * Helper function to ping error URLs.
     * @public
     * @method Vast#pingURL
     * @param {number} code Error code
     * @param {string[]} urls URLs to ping
     */
    this.pingURLs = function(code, urls) {
      _.each(urls, function() {
        pingURL(code, url);
      }, this);
    };

    /**
     * Extracts the creative based on the format type that is expected.
     * @public
     * @method Vast#extractStreamForType
     * @param {object[]} streams The stream choices from the metadata
     * @param {string} type The type of video we want to use for the creative
     * @returns {string} The creative url if it finds one, otherwise null.
     */
    this.extractStreamForType = function(streams, type) {
      var filter = [];
      // TODO: Add MIME types for the other encoding types that we support
      switch (type) {
        case "hls":
          filter.push("application/x-mpegurl");
          filter.push("application/mpegurl");
          filter.push("audio/mpegurl");
          filter.push("audio/x-mpegurl");
          break;
        default:
          filter.push("video/" +type);
      }
      var stream = _.find(streams, function(stream) {
        return (filter.indexOf(stream.type) >= 0);
      }, this);
      return stream ? stream.url : null;
    };

    /**
     * Helper function to determine if the ad is a linear ad.
     * @private
     * @method Vast#_hasLinearAd
     * @param {object} ad The ad object
     * @returns {boolean} true if the ad is a linear ad, false otherwise.
     */
    var _hasLinearAd = _.bind(function(ad) {
      return (!_.isEmpty(ad.linear));
    }, this);

    /**
     * Helper function to determine if the ad is a nonlinear ad.
     * @private
     * @method Vast#_hasNonLinearAd
     * @param {object} ad The ad object
     * @returns {boolean} true if the ad is a nonlinear ad, false otherwise.
     */
    var _hasNonLinearAd = _.bind(function(ad) {
      return (!_.isEmpty(ad.nonLinear));
    }, this);

    /**
     *  If a linear ad is found, then it is parsed and sent to be added to the time via addToTimeLine.
     * @private
     * @method Vast#_handleLinearAd
     * @param {object} ad The ad object
     * @param {object} adLoaded The ad that was loaded
     * @param {object} params Additional parameters associated with this ad
     *                        adPodIndex : the index of the ad pod this ad is housed in
     *                        adPodLength : the total number of ads in the ad pod this ad is housed in
     * @returns {object} The ad unit object ready to be added to the timeline
     */
    var _handleLinearAd = _.bind(function(ad, adLoaded, params) {
      if (!ad || _.isEmpty(ad.linear.mediaFiles)) {
        OO.log("VAST: General Linear Ads Error; No Mediafiles in Ad", ad);
        // Want to ping error URLs at current depth if there are any available
        this.trackError(this.ERROR_CODES.GENERAL_LINEAR_ADS, ad.id);
        return null;
      }

      params = params ? params : {};
      var mediaFiles = ad.linear.mediaFiles;
      var maxMedia = _.max(mediaFiles, function(v) { return parseInt(v.bitrate, 10); });
      var vastAdUnit = { data: {}, vastUrl: this.vastUrl, maxBitrateStream: null };
      vastAdUnit.maxBitrateStream = maxMedia && maxMedia.url;
      vastAdUnit.durationInMilliseconds = OO.timeStringToSeconds(ad.linear.duration) * 1000;
      _.extend(vastAdUnit.data, ad);
      vastAdUnit.data.tracking = ad.linear.tracking;
      vastAdUnit.data.type = this.amc.ADTYPE.LINEAR_VIDEO;
      vastAdUnit.adPodIndex = params.adPodIndex ? params.adPodIndex : 1;
      vastAdUnit.adPodLength = params.adPodLength ? params.adPodLength : 1;
      vastAdUnit.positionSeconds = adLoaded.time/1000;
      vastAdUnit.repeatAfter = adLoaded.repeatAfter ? adLoaded.repeatAfter : null;

      // Save the stream data for use by VideoController
      var streams = {};
      var linearAd = ad.linear;
      if (linearAd && linearAd.mediaFiles) {
        var vastStreams = linearAd.mediaFiles;
        var videoEncodingsSupported = OO.VIDEO.ENCODING;
        var streamData;
        for (var encoding in videoEncodingsSupported) {
          streamData = null;
          streamData = this.extractStreamForType(vastStreams, videoEncodingsSupported[encoding]);
          if (streamData) {
            streams[videoEncodingsSupported[encoding]] = streamData;
          }
        }
      }

      vastAdUnit.streams = streams;
      return vastAdUnit;
    }, this);

    /**
     * If a non-linear Ad is found then it is parsed and added to the timeline via the addToTimeline function.
     * @private
     * @method Vast#_handleNonLinearAd
     * @param {object} ad The ad object
     * @param {object} adLoaded The ad that was loaded
     * @param {object} params Additional parameters associated with this ad
     *                        adPodIndex : the index of the ad pod this ad is housed in
     *                        adPodLength : the total number of ads in the ad pod this ad is housed in
     * @returns {object} The ad unit object ready to be added to the timeline
     */
    var _handleNonLinearAd = _.bind(function(ad, adLoaded, params) {
      // filter our playable stream:
      if (!ad || _.isEmpty(ad.nonLinear.url)) {
        OO.log("VAST: General NonLinear Ads Error: Cannot Find Playable Stream in Ad", ad);
        // Want to ping error URLs at current depth if there are any available
        this.trackError(this.ERROR_CODES.GENERAL_NONLINEAR_ADS, ad.id);
        return null;
      }
      params = params ? params : {};
      var adURL = ad.nonLinear.url;
      var vastAdUnit = { data: {}, vastUrl: this.vastUrl, maxBitrateStream: null };
      vastAdUnit.streamUrl = adURL;
      _.extend(vastAdUnit.data, ad);
      vastAdUnit.data.tracking = ad.nonLinear.tracking;
      vastAdUnit.data.type = this.amc.ADTYPE.NONLINEAR_OVERLAY;
      vastAdUnit.adPodIndex = params.adPodIndex ? params.adPodIndex : 1;
      vastAdUnit.adPodLength = params.adPodLength ? params.adPodLength : 1;
      vastAdUnit.positionSeconds = adLoaded.time/1000;
      vastAdUnit.repeatAfter = adLoaded.repeatAfter ? adLoaded.repeatAfter : null;

      return vastAdUnit;
    }, this);

    /**
     * Takes all the ad data that is in the inline xml and merges them all together into the ad object.
     * @public
     * @method Vast#mergeVastAdResult
     * @param {object} ad The ad object
     * @param {object} wrapperAds The object containing wrapper ads parameters
     */
    this.mergeVastAdResult = function(ad, wrapperAds) {
      ad.error = wrapperAds.error.concat(ad.error);
      ad.impression = wrapperAds.impression.concat(ad.impression);
      ad.companion = wrapperAds.companion.concat(ad.companion);
      if (wrapperAds.linear.clickTracking) {
        ad.linear.clickTracking = wrapperAds.linear.clickTracking.concat(ad.linear.clickTracking || []);
      }
      if (wrapperAds.linear.tracking) {
        if (!ad.linear.tracking) { ad.linear.tracking  = {}; }
        _.each(wrapperAds.linear.tracking, function(value, key) {
          ad.linear.tracking[key] = ad.linear.tracking[key] ? value.concat(ad.linear.tracking[key]) : value;
        });
      }
      if (wrapperAds.nonLinear.tracking) {
        if (!ad.nonLinear.tracking) { ad.nonLinear.tracking = {}; }
        _.each(wrapperAds.nonLinear.tracking, function(value, key) {
          ad.nonLinear.tracking[key] = ad.nonLinear.tracking[key] ? value.concat(ad.nonLinear.tracking[key]) : value;
        });
      }
    };

    /**
     * Checks if there is any companion ads associated with the ad and if one is found, it will call the Ad Manager
     * Controller to show it.
     * @public
     * @method Vast#checkCompanionAds
     * @param {object} adInfo The Ad metadata
     */
    this.checkCompanionAds = function(adInfo) {
      var data = adInfo.data,
          adUnitCompanions = currentAd.vpaidAd ? _safeFunctionCall(currentAd.vpaidAd, "getAdCompanions") : null,
          companions;

      // If vast template has no companions (has precedence), check the adCompanions property from the ad Unit
      // This rules is only for VPaid, it will take data.companion otherwise anyway
      companions = data && !_.isEmpty(data.companion) ? data.companion : adUnitCompanions;

      if (_.isEmpty(companions)) {
        return;
      }

      this.amc.showCompanion(companions);
    };

    /**
     * The xml is parsed to find any tracking events and then returned as part of an object.
     * @private
     * @method Vast#parseTrackingEvents
     * @param {object} tracking The tracking object to be mutated
     * @param {XMLDocument} xml The data of the ad with tracking info
     * @param {string[]} trackingEvents List of events that are tracked, if null then it uses the global one
     * @returns {object} An array of tracking items.
     */
    var parseTrackingEvents = _.bind(function(tracking, xml, trackingEvents) {
      var events = trackingEvents || TrackingEvents;
      _.each(events, function(item) {
        var sel = "Tracking[event=" + item + "]";
        tracking[item] = filterEmpty(xml.find(sel).map(function(i, v) { return $(v).text(); }));
      }, {});
    }, this);

    /**
     * Helper function to remove empty items.
     * @private
     * @method Vast#filterEmpty
     * @param {Array} array An array that is the be checked if it is empty
     * @returns {Array} The filtered array.
     */
    var filterEmpty = _.bind(function(array) {
      return _.without(array, null, "");
    }, this);

    /**
     * While getting the ad data the manager needs to parse the companion ad data as well and add it to the object.
     * @private
     * @method Vast#parseCompanionAd
     * @param {XMLDocument} companionAdXML XML that contains the companion ad data
     * @returns {object} The ad object with companion ad.
     */
    var parseCompanionAd = _.bind(function(companionAdXml) {
      var result = { tracking: {} };
      var staticResource = _cleanString(companionAdXml.find('StaticResource').text());
      var iframeResource = _cleanString(companionAdXml.find('IFrameResource').text());
      var htmlResource = _cleanString(companionAdXml.find('HTMLResource').text());

      parseTrackingEvents(result.tracking, companionAdXml, ["creativeView"]);

      result = {
        tracking: result.tracking,
        width: companionAdXml.attr('width'),
        height: companionAdXml.attr('height'),
        expandedWidth: companionAdXml.attr('expandedWidth'),
        expandedHeight: companionAdXml.attr('expandedHeight'),
        companionClickThrough: companionAdXml.find('CompanionClickThrough').text()
      };

      if (staticResource.length) {
        _.extend(result, { type: 'static', data: staticResource, url: staticResource });
      } else if (iframeResource.length) {
        _.extend(result, { type: 'iframe', data: iframeResource, url: iframeResource });
      } else if (htmlResource.length) {
        _.extend(result, { type: 'html', data: htmlResource, htmlCode: htmlResource });
      }

      return result;
    }, this);

    /**
     * The xml needs to be parsed to grab all the linear data of the ad and create an object.
     * @private
     * @method Vast#parseLinearAd
     * @param {XMLDocument} linearXml The xml containing the ad data to be parsed
     * @returns {object} An object containing the ad data.
     */
    var parseLinearAd = _.bind(function(linearXml) {
      var result = {
        tracking: {},
        // clickTracking needs to be remembered because it can exist in wrapper ads
        clickTracking: filterEmpty($(linearXml).find("ClickTracking").map(function() { return $(this).text(); })),
        //There can only be one clickthrough as per Vast 2.0/3.0 specs and XSDs
        clickThrough: $(linearXml).find("ClickThrough").text(),
        customClick: filterEmpty($(linearXml).find("CustomClick").map(function() { return $(this).text(); }))
      };

      result.skipOffset = $(linearXml).attr("skipoffset");

      var mediaFile = linearXml.find("MediaFile");

      parseTrackingEvents(result.tracking, linearXml);
      if (mediaFile.size() > 0) {
        result.mediaFiles = filterEmpty(mediaFile.map(function(i,v) {
          return {
            type: $(v).attr("type").toLowerCase(),
            url: $.trim($(v).text()),
            bitrate: $(v).attr("bitrate"),
            width: $(v).attr("width"),
            height: $(v).attr("height")
          };
        }));
        result.duration = linearXml.find("Duration").text();
      }

      return result;
    }, this);

    /**
     * The xml needs to be parsed in order to grab all the non-linear ad data.
     * @private
     * @method Vast#parseNonLinearAd
     * @param {XMLDocument} nonLinearAdsXml Contains the ad data that needs to be parsed
     * @returns {object} An object that contains the ad data.
     */
    var parseNonLinearAds = _.bind(function(nonLinearAdsXml) {
      var result = { tracking: {} };
      var nonLinear = nonLinearAdsXml.find("NonLinear").eq(0);

      parseTrackingEvents(result.tracking, nonLinearAdsXml);

      if (nonLinear.size() > 0) {
        var staticResource = nonLinear.find("StaticResource");
        var iframeResource = nonLinear.find("IFrameResource");
        var htmlResource = nonLinear.find("HTMLResource");
        result.width = nonLinear.attr("width");
        result.height = nonLinear.attr("height");
        result.expandedWidth = nonLinear.attr("expandedWidth");
        result.expandedHeight = nonLinear.attr("expandedHeight");
        result.scalable = nonLinear.attr("scalable");
        result.maintainAspectRatio = nonLinear.attr("maintainAspectRatio");
        result.minSuggestedDuration = nonLinear.attr("minSuggestedDuration");
        result.nonLinearClickThrough = nonLinear.find("NonLinearClickThrough").text();
        result.nonLinearClickTracking = filterEmpty($(nonLinearAdsXml).
                                        find("NonLinearClickTracking").
                                        map(function() { return $(this).text(); }));

        if (staticResource.size() > 0) {
          _.extend(result, { type: "static", data: staticResource.text(), url: staticResource.text() });
        } else if (iframeResource.size() > 0) {
          _.extend(result, { type: "iframe", data: iframeResource.text(), url: iframeResource.text() });
        } else if (htmlResource.size() > 0) {
          _.extend(result, { type: "html", data: htmlResource.text(), htmlCode: htmlResource.text() });
        }
      }

      return result;
    }, this);

    /**
     * Takes the xml and ad type and find the ad within the xml and returns it.
     * @private
     * @method Vast#vastAdSingleParser
     * @param {XMLDocument} xml The xml that contains the ad data
     * @param {number} version The Vast version
     * @returns {object} The ad object otherwise it returns 1.
     */
    var vastAdSingleParser = _.bind(function(xml, version) {
      var result = getVastTemplate();
      var jqueryXML = $(xml);
      var inline = jqueryXML.find(AD_TYPE.INLINE);
      var wrapper = jqueryXML.find(AD_TYPE.WRAPPER);

      if (inline.size() > 0) {
        result.type = AD_TYPE.INLINE;
      } else if (wrapper.size() > 0) {
        result.type = AD_TYPE.WRAPPER;
      } else {
        //TODO: See if returning null here is valid
        return null;
      }

      result.version = version;

      var linear = jqueryXML.find("Linear").eq(0);
      var nonLinearAds = jqueryXML.find("NonLinearAds");

      if (result.type === AD_TYPE.WRAPPER) { result.vastAdTagUri = jqueryXML.find("VASTAdTagURI").text(); }
      result.error = filterEmpty(jqueryXML.find("Error").map(function() { return $(this).text(); }));
      result.impression = filterEmpty(jqueryXML.find("Impression").map(function() { return $(this).text(); }));
      result.title = _.first(filterEmpty(jqueryXML.find("AdTitle").map(function() { return $(this).text(); })));

      if (linear.size() > 0) { result.linear = parseLinearAd(linear); }
      if (nonLinearAds.size() > 0) { result.nonLinear = parseNonLinearAds(nonLinearAds); }
      jqueryXML.find("Companion").map(function(i, v){
        result.companion.push(parseCompanionAd($(v)));
        return 1;
      });

      var sequence = jqueryXML.attr("sequence");
      if (typeof sequence !== 'undefined') {
        result.sequence = sequence;
      }

      var id = jqueryXML.attr("id");
      if (typeof id !== 'undefined') {
        result.id = id;
      }

      return result;
    }, this);

    /**
     * The xml needs to get parsed and and an array of ad objects is returned.
     * @public
     * @method Vast#parser
     * @param {XMLDocument} vastXML The xml that contains the ad data
     * @param {object} adLoaded The ad loaded object and metadata
     * @returns {object[]} An array containing the ad(s) if ads are found, otherwise it returns null.
     */
    this.parser = function(vastXML, adLoaded) {
      var jqueryAds =  $(vastXML).find("Ad");
      if (!this.checkNoAds(vastXML, jqueryAds)){
        // need to get error tracking information early in case error events need to be reported
        // before the ad object is created
        this.getErrorTrackingInfo(vastXML, jqueryAds);
      }

      if (!this.isValidVastXML(vastXML)) {
        return null;
      }
      var result = {
        podded : [],
        standalone : []
      };
      //parse the ad objects from the XML
      var ads = this.parseAds(vastXML, adLoaded);
      //check to see if any ads are sequenced (are podded)
      _.each(ads, _.bind(function(ad) {
        var sequence = typeof ad.sequence !== 'undefined' && _.isNumber(parseInt(ad.sequence)) ? ad.sequence : null;
        var version = typeof ad.version !== 'undefined' ? ad.version : null;
        if (supportsPoddedAds(version) && sequence) {
          //Assume sequences will start from 1
          result.podded[+sequence - 1] = ad;
        } else {
          //store ad as a standalone ad
          result.standalone.push(ad);
        }
      }, this));

      return result;
    };

    /**
     * Parses ad objects from the Vast XML.
     * @public
     * @method Vast#parseAds
     * @param {xml} vastXML The xml that contains the ad data
     * @return {object[]} An array of ad objects
     * @param {object} adLoaded The ad loaded object and metadata
     */
    this.parseAds = function(vastXML, adLoaded) {
      var result = [];
      var version = getVastVersion(vastXML);
      $(vastXML).find("Ad").each(function() {
        var singleAd = _getVpaidCreative(this, version, adLoaded);
        //if there is no vpaid creative, parse as regular vast
        if (!singleAd) {
          singleAd = vastAdSingleParser(this, version);
        }
        if (singleAd) {
          result.push(singleAd);
        }
      });
      return result;
    };

    /**
     * Check wether or not a vpaid ad is valid by checking the ad type and make sure is VPaid
     * This is only required for VPAID ads
     * @method Vast#_isValidVpaidCreative
     * @private
     * @return {boolean} VPaid validated value
     */
    var _isValidVpaidCreative = function(node, isLinear) {
      var apiFramework = (node.attr('apiFramework') || node.attr('apiframework')) === 'VPAID';
      var creativeType = isLinear ? node.attr('type') : (node.find('StaticResource').attr('creativeType') ||
            node.find('StaticResource').attr('creativetype'));
      return apiFramework && creativeType === 'application/javascript';
    };

    /**
     * Prepares an array of ads to be added to the timeline, ready for playback.
     * @private
     * @method Vast#handleAds
     * @param {object[]} ads An array of ad objects
     * @param {object} adLoaded The ad loaded object and metadata
     * @param {object} fallbackAd The ad to fallback to if playback for an ad in this pod fails
     */
    var handleAds = _.bind(function(ads, adLoaded, fallbackAd) {
      //find out how many non linear ads we have so as to not count them
      //when determining ad pod length
      var linearAdCount = 0;
      _.each(ads, _.bind(function(ad) {
        if (!_.isEmpty(ad.linear)) {
          linearAdCount++;
        }
      }, this));

      var handled = false;

      var adUnits = [];
      var wrapperAds = {};
      var processedFallbackAd = null;

      //Process each of the ads in the pod
      _.each(ads, _.bind(function(ad, index) {
        if (ad.type === AD_TYPE.INLINE) {
          wrapperAds = { error: [],
            impression: [],
            companion: [],
            linear: {},
            nonLinear: {}
          };
          var params = {
            adPodIndex : index + 1,
            adPodLength : linearAdCount
          };
          this.mergeVastAdResult(ad, wrapperAds);
          if (!ad.data || ad.data.adType !== 'vpaid') {
            if (_hasLinearAd(ad)) {
              var linearAdUnit = _handleLinearAd(ad, adLoaded, params);
              if (linearAdUnit) {
                //The ad can have both a linear and non linear creative. We'll
                //split these up into separate objects for ad playback
                linearAdUnit = _.clone(linearAdUnit);
                linearAdUnit.data.nonLinear = {};
                adUnits.push(linearAdUnit);
              }
            }
            if (_hasNonLinearAd(ad)) {
              var nonLinearAdUnit = _handleNonLinearAd(ad, adLoaded, params);
              if (nonLinearAdUnit) {
                //The ad can have both a linear and non linear creative. We'll
                //split these up into separate objects for ad playback
                nonLinearAdUnit = _.clone(nonLinearAdUnit);
                nonLinearAdUnit.data.linear = {};
                adUnits.push(nonLinearAdUnit);
              }
            }
          } else {
            adUnits.push(ad);
          }
        } else if (ad.type === AD_TYPE.WRAPPER) {
          //TODO: Add wrapper ad depth limit
          _handleWrapperAd(ad, adLoaded);
        }
      }, this));

      if (fallbackAd) {
        //TODO: Add wrapper ad depth limit
        if (fallbackAd.type === AD_TYPE.INLINE) {
          wrapperAds = {
            error: [],
            impression: [],
            companion: [],
            linear: {},
            nonLinear: {}
          };
          this.mergeVastAdResult(fallbackAd, wrapperAds);
          if (!fallbackAd.data || fallbackAd.data.adType !== 'vpaid') {
            //Prefer to show linear fallback ad
            processedFallbackAd = _handleLinearAd(fallbackAd, adLoaded);
            if (!processedFallbackAd) {
              processedFallbackAd = _handleNonLinearAd(fallbackAd, adLoaded);
            }
          } else {
            processedFallbackAd = fallbackAd;
          }
        }
        else if (ad.type === AD_TYPE.WRAPPER) {
          _handleWrapperAd(ad, adLoaded);
        }
      }

      if (adUnits.length > 0) {
        var previousAdUnit;
        //Set fallback ad and next ad for each ad unit. Depending on if an ad plays successfully
        //or fails to play, the next ad or fallback ad will be forced to play
        _.each(adUnits, _.bind(function(adUnit) {
          adUnit.fallbackAd = processedFallbackAd;
          if (previousAdUnit) {
            previousAdUnit.nextAdInPod = adUnit;
          }
          previousAdUnit = adUnit;
        }, this));

        handled = addToTimeline(adUnits[0]);
      }

      if (handled) {
        this.loaded = true;
      } else {
        failedAd();
      }

      if (currentAd && currentAd.ad && currentAd.ad.type === AD_REQUEST_TYPE)
      {
        //notify the amc of the pod ending
        this.amc.notifyPodEnded(currentAd.id);
      }

    }, this);

    /**
     * Helper function to handle wrapper ads.
     * @private
     * @method Vast#_handleWrapperAd
     * @param {object} vastAdObject The VAST ad object
     * @param {object} adLoaded The ad loaded object and metadata
     */
    var _handleWrapperAd = _.bind(function(vastAdObject, adLoaded) {
      if (vastAdObject.vastAdTagUri) {
        var adId = _getAdId(vastAdObject);
        // Store the ad object
        if (_.has(this.adTrackingInfo, adId)) {
          this.adTrackingInfo[adId].vastAdObject = vastAdObject;
          this.adTrackingInfo[adId].wrapperParentId = this.wrapperParentId || null;
        }
        // Theoretically, this branch should not ever execute because _getErrorTrackingInfo()
        // should have already added the ad id to the adTrackingInfo dictionary.
        else {
          this.adTrackingInfo[adId] = {
            vastAdObject: vastAdObject,
            errorURLs: [],
            wrapperParentId: this.wrapperParentId || null
          };
        }
        if (!this.testMode) {
          this.ajax(vastAdObject.vastAdTagUri, this.onVastError, 'xml', adLoaded, adId);
        }
      }
    }, this);

    /**
     * Helper function to determine if the response XML is a VMAP XML.
     * @private
     * @method Vast#_isVMAPResponse
     * @param {XMLDocument} xml The xml returned from loading the ad
     * @returns {boolean} true, if an element with the VMAP tag name is found. Otherwise,
     * returns false.
     */
    var _isVMAPResponse = _.bind(function(xml) {
      return $(xml).find("vmap\\:VMAP, VMAP").length > 0;
    }, this);

    /**
     * When the ad tag url comes back with a response.
     * @public
     * @method Vast#onResponse
     * @param {string} wrapperParentId The current ad's "parent" ad id. Could be
     * undefined if ad does not have parent/wrapper. We want to pass this in to the next vast response
     * so the new ad knows who its parent is for tracking event purposes.
     * @param {object} adLoaded The ad loaded object and metadata
     * @param {XMLDocument} xml The xml returned from loading the ad
     */
    this.onResponse = function(wrapperParentId, adLoaded, xml) {
      if (_isVMAPResponse(xml)) {
        this.onVMAPResponse(xml);
      }
      else {
        this.onVastResponse(adLoaded, xml, wrapperParentId);
      }
    };

    /**
     * When the vast Ad is loaded correctly it will call this callback. Here the data is parsed to see if it is a linear
     * or nonLinear Ad. It will pull the tracking, impression, companion and clicking information. Then merge the results
     * and send it to the correct handler based on if it is Linear or not.
     * @public
     * @method Vast#onVastResponse
     * @param {object} adLoaded The ad loaded object and metadata
     * @param {XMLDocument} xml The xml returned from loading the ad
     * @param {string} wrapperParentIdArg Is the current ad's "parent" ad id. This argument would be set on an ajax
     * call for a wrapper ad. This argument could also be undefined if ad did not have parent/wrapper.
     */
    this.onVastResponse = function(adLoaded, xml, wrapperParentIdArg) {
      this.wrapperParentId = wrapperParentIdArg;
      var vastAds = this.parser(xml, adLoaded);
      var vastVersion = getVastVersion(xml);
      if (!vastAds || !adLoaded || (_.isEmpty(vastAds.podded) && _.isEmpty(vastAds.standalone))) {
        OO.log("VAST: XML Parsing Error");
        this.trackError(this.ERROR_CODES.XML_PARSING, this.wrapperParentId);
        failedAd();
      } else {
        var fallbackAd;
        if(supportsAdFallback(vastVersion) && vastAds.standalone.length > 0) {
          fallbackAd = vastAds.standalone[0];
        }
        var ad;
        if (supportsPoddedAds(vastVersion)) {
          //If there are no podded ads
          if(_.isEmpty(vastAds.podded)) {
            //show the first standalone ad
            ad = vastAds.standalone[0];
            if (ad) {
              handleAds([ad], adLoaded);
            }
          }
          // A VAST response wrapped in VMAP could have allowMultipleAds specified by the VMAP AdBreak
          else if (adLoaded.vmap) {
            if (adLoaded.allowMultipleAds) {
              handleAds(vastAds.podded, adLoaded, fallbackAd);
            }
          }
          //else show the podded ads
          else {
            handleAds(vastAds.podded, adLoaded, fallbackAd);
          }
        } else {
          //show all standalone ads if podded ads are not supported
          handleAds(vastAds.standalone, adLoaded);
        }
      }
    };

    /**
     * Handler for VMAP XML responses.
     * @public
     * @method Vast#onVMAPResponse
     * @param {XMLDocument} xml The xml returned from loading the ad
     */
    this.onVMAPResponse = function(xml) {
      var jqueryXML = $(xml);
      var adBreakElements = jqueryXML.find("vmap\\:AdBreak, AdBreak");
      _.each(adBreakElements, function(adBreakElement) {
        var adBreak = _parseAdBreak(adBreakElement);
        if (!_.isEmpty(adBreak)) {
          this.adBreaks.push(adBreak);
          var adSourceElement = $(adBreakElement).find("vmap\\:AdSource, AdSource");
          var trackingEventsElement = _findVMAPTrackingEvents(adBreakElement);
          var extensionsElement = $(adBreakElement).find("vmap\\:Extensions, Extensions");
          if (trackingEventsElement.length > 0) {
            var trackingEvents = _parseVMAPTrackingEvents(trackingEventsElement);
            if (!_.isEmpty(trackingEvents)) {
              adBreak.trackingEvents = trackingEvents;
            }
          }
          if (adSourceElement.length > 0) {
            var adSource = _parseAdSource(adSourceElement);
            if (!_.isEmpty(adSource)) {
              adBreak.adSource = adSource;
              var adObject = _convertToAdObject(adBreak);
              if (adObject) {
                var adTagURIElement = $(adSourceElement).find("vmap\\:AdTagURI, AdTagURI");
                var vastAdDataElement = $(adSourceElement).find("vmap\\:VASTAdData, VASTAdData");

                // VMAP 1.0.1 fixed a typo where the inline vast data tag was named VASTData instead of
                // VASTAdData. To ensure backwards compatibility with VMAP 1.0 XMLs, if the code cannot
                // find the VASTAdData tag, try to search for the VASTData tag.
                if (vastAdDataElement.length === 0) {
                  vastAdDataElement = $(adSourceElement).find("vmap\\:VASTData, VASTData");
                }

                if (vastAdDataElement.length > 0) {
                  adSource.vastAdData = vastAdDataElement[0];
                  this.onVastResponse(adObject, vastAdDataElement[0]);
                }
                else if (adTagURIElement.length > 0) {
                  adSource.adTagURI = adTagURIElement.text();
                  if (!this.testMode){
                    this.ajax(adSource.adTagURI, this.onVastError, 'xml', adObject);
                  }
                }
              }
              else {
                OO.log("VAST, VMAP: Error creating Ad Object");
              }
            }
          }
        }
      }, this);
    };

    /**
     * Helper function to find all node names with "vmap:TrackingEvents" / "TrackingEvents", and pick only
     * the elements with "vmap:TrackingEvents".
     * Note: must search for both "vmap:TrackingEvents" and "TrackingEvents" because of weird issue where
     * Chrome cannot find "vmap:TrackingEvents" unless another selector is specified.
     * @private
     * @method Vast#_findVMAPTrackingEvents
     * @param {object} adBreakElement The adBreak element to search
     * @returns {object[]} The filtered array with only vmap tracking events.
     */
    var _findVMAPTrackingEvents = _.bind(function(adBreakElement) {
      var trackingEventsElement = $(adBreakElement).find("vmap\\:TrackingEvents, TrackingEvents");
      var VMAPTrackingEventsElement = _.filter(trackingEventsElement.toArray(), function(trackingEventElement) {
        return (trackingEventElement.tagName.toLowerCase().indexOf("vmap:") > -1);
      }, this);
      return VMAPTrackingEventsElement;
    }, this);

    /**
     * Helper function to convert VMAP tracking events into objects with attributes as properties.
     * @private
     * @method Vast#_parseVMAPTrackingEvents
     * @param {object} trackingEventsElement The tracking events element
     * @returns {object[]} The array of tracking event objects.
     */
    var _parseVMAPTrackingEvents = _.bind(function(trackingEventsElement) {
      var trackingEvents = [];
      var trackingElements = $(trackingEventsElement).find("vmap\\:Tracking, Tracking");
      if (trackingElements.length > 0) {
        _.each(trackingElements, function(trackingElement) {
          var tracking = {};
          trackingEvents.push(tracking);
          tracking.url = $(trackingElement).text();
          tracking.eventName = $(trackingElement).attr("event");
        }, this);
      }
      return trackingEvents;
    }, this);

    /**
     * Convert the adBreak attributes into an ad object that will be passed into _onVastResponse().
     * @private
     * @method Vast#_convertToAdObject
     * @param {object} adBreak The adBreak object
     * @returns {object} null if the timeOffset attribute does not match any format. Otherwise, the
     * ad object is returned.
     */
    var _convertToAdObject = _.bind(function(adBreak) {
      var adObject = {
        /*
         *ad_set_code: "",
         *click_url: "",
         *expires: 0,
         *first_shown: 0,
         *frequency: 2,
         *public_id: "",
         *signature: "",
         *tracking_url: [],
         *type: "",
         *url: ""
         */
        vmap: true,
        allowMultipleAds: true,
        time: 0,
        position_type: "t",
      };
      if (!adBreak) {
        return null;
      }
      if (adBreak.adSource && adBreak.adSource.allowMultipleAds) {
        // parse the attribute, and convert string to boolean if it is "true"/"false"
        var allowMultipleAds = adBreak.adSource.allowMultipleAds;
        if (allowMultipleAds == "true" || allowMultipleAds == "false") {
          adObject.allowMultipleAds = (allowMultipleAds == "true");
        }
      }
      if (adBreak.repeatAfter) {
        adObject.repeatAfter = _convertTimeStampToMilliseconds(adBreak.repeatAfter) / 1000;
      }
      if (adBreak.timeOffset) {
        switch(true) {
          // case: "start"
          case /^start$/.test(adBreak.timeOffset):
            adObject.time = 0;
            break;
          // case: "end"
          case /^end$/.test(adBreak.timeOffset):
            adObject.time = (this.amc.movieDuration + 1) * 1000;
            break;
          // case: hh:mm:ss.mmm | hh:mm:ss
          case /^\d{2}:\d{2}:\d{2}\.000$|^\d{2}:\d{2}:\d{2}$/.test(adBreak.timeOffset):
            adObject.time = _convertTimeStampToMilliseconds(adBreak.timeOffset);
            break;
          // case: [0, 100]%
          case /^\d{1,3}%$/.test(adBreak.timeOffset):
            // TODO: test percentage > 100
            adObject.time = _convertPercentToMilliseconds(adBreak.timeOffset);
            break;
          default:
            OO.log("VAST, VMAP: No Matching 'timeOffset' Attribute format");
            adObject = null;
        }
      }
      return adObject;
    }, this);

    /**
     * Helper function to convert the HMS timestamp into milliseconds.
     * @private
     * @method Vast#_convertTimeStampToMilliseconds
     * @param {string} timeString The timestamp string (format: hh:mm:ss / hh:mm:ss.mmm)
     * @returns {number} The number of milliseconds the timestamp represents.
     */
    var _convertTimeStampToMilliseconds = _.bind(function(timeString) {
      var hms = timeString.split(":");
      // + unary operator converts string to number
      var seconds = (+hms[0]) * 60 * 60 + (+hms[1]) * 60 + (+hms[2]) * 1000;
      return seconds;
    }, this);

    /**
     * Helper function to convert a percentage representing time into milliseconds.
     * @private
     * @method Vast#_convertPercentToMilliseconds
     * @param {string} timeString The string that represents a percentage (format: [0, 100]%)
     * @returns {number} The number of milliseconds the percentage represents.
     */
    var _convertPercentToMilliseconds = _.bind(function(timeString) {
      var percent = timeString.replace("%", "");
      // simplification of: (this.amc.movieDuration * percent / 100) * 1000
      var result = +(this.amc.movieDuration) * percent * 10;
      return result;
    }, this);

    /**
     * Create the adBreak object with its attributes as properties.
     * @private
     * @method Vast#_parseAdBreak
     * @param {object} adBreakElement The adBreak element to parse
     * @returns {object} The formatted adBreak object.
     */
    var _parseAdBreak = _.bind(function(adBreakElement) {
      var adBreak = {};
      adBreak.timeOffset = $(adBreakElement).attr("timeOffset");
      adBreak.breakType = $(adBreakElement).attr("breakType");
      adBreak.breakId = $(adBreakElement).attr("breakId");
      adBreak.repeatAfter = $(adBreakElement).attr("repeatAfter");
      return adBreak;
    }, this);

    /**
     * Create the adSource object with its attributes as properties.
     * @private
     * @method Vast#_parseAdSource
     * @param {object} adSourceElement The adSource element to parse
     * @returns {object} The formatted adSource object.
     */
    var _parseAdSource = _.bind(function(adSourceElement) {
      var adSource = {};
      adSource.id = $(adSourceElement).attr("id");
      adSource.allowMultipleAds = $(adSourceElement).attr("allowMultipleAds");
      adSource.followRedirects = $(adSourceElement).attr("followRedirects");
      return adSource;
    }, this);

    /**
     * Generates a parsed VPaid ad to load.
     * This is only required for VPAID ads
     * @private
     * @method Vast#_getVPaidCreative
     * @param {XMLDocument} adXml Current ad xml
     * @param {string} Current vast version
     * @param {object} adLoaded The ad loaded object and metadata
     * @return {object} Parsed vpaid's metadata ad
     */
    var _getVpaidCreative = _.bind(function(adXml, version, adLoaded) {
      //TODO: Add more comments in the function
      var adParams = '{}';

      this.$_node = $(adXml);
      this.format = _getVpaidFormat();
      var isLinear = this.format === 'Linear';

      var $node = this.$_node.find(this.format);
      if (!$node.length) {
        return;
      }

      var $paramsNode = $node.find('AdParameters');
      //PBI-1828 there have been cases where ads have multiple mediafile tags and it results in a bad url.
      //so make sure we just pick one of the files. Otherwise, they all get appended to each other later in the code.
      var $mediaNode = isLinear ? $node.find('MediaFile').first() : $node.find('StaticResource');
      var $companionsNode = this.$_node.find('CompanionAds');
      var $validNode = isLinear ? $mediaNode : $node;

      if (!$mediaNode.length || !_isValidVpaidCreative($validNode, isLinear)) {
        OO.log('VPaid: No valid media source, either is not a VPaid Ad or ad unit is not in javascript format.');
        return;
      }

      if ($paramsNode.length) {
        adParams = _cleanString($paramsNode.text());
      }

      //TODO: Should we use _cleanString on this?
      var mediaFile = {
        url: $mediaNode.text(),
        type: $mediaNode.attr('type') || $mediaNode.attr('creativeType')
      };

      $mediaNode = isLinear ? $mediaNode : $mediaNode.parent();
      mediaFile = _.extend(mediaFile, {
        width: Number($mediaNode.attr('width')),
        height: Number($mediaNode.attr('height')),
        tracking: this.getVpaidTracking($mediaNode[0])
      });

      var impressions = this.getVpaidImpressions();
      var tracking = this.getVpaidTracking(isLinear ? $node[0] : $node.parent()[0]);
      var errorTracking = _cleanString(this.$_node.find('Error').text());
      var videoClickTracking;
      if (isLinear) {
        videoClickTracking = {
          clickTracking: _cleanString(this.$_node.find('ClickTracking').text()),
          clickThrough: _cleanString(this.$_node.find('ClickThrough').text()),
          customClick: _cleanString(this.$_node.find('CustomClick').text())
        };
      } else {
        videoClickTracking = {
          nonLinearClickThrough: _cleanString(this.$_node.find('NonLinearClickThrough').text())
        }
      }

      var sequence = this.$_node.attr('sequence');
      var adPodLength = this.$_node.parent().find('[sequence] Linear').length;
      if (!supportsPoddedAds(version) || !_.isNumber(parseInt(sequence))) {
        sequence = null;
      }

      var companionAds = [];
      var companions = $companionsNode.find('Companion');
      if (companions.length !== 0) {
        companions.each(function(i, v){
          companionAds.push(parseCompanionAd($(v)));
        });
      }
      // this is for linear/nonlinear
      var ad = {
        mediaFiles: mediaFile,
        tracking: tracking,
        duration: isLinear ? this.$_node.find('Duration').text() : 0,
        skipOffset: $node.attr('skipoffset') || null
      };
      _.extend(ad, videoClickTracking);

      var data = {
        adType: 'vpaid',
        companion: companionAds,
        error: errorTracking,
        impression: impressions,
        linear: ad,
        nonLinear: ad,
        title: _cleanString(this.$_node.find('AdTitle').text()),
        tracking: tracking,
        type: isLinear ? this.amc.ADTYPE.LINEAR_VIDEO : this.amc.ADTYPE.NONLINEAR_OVERLAY,
        version: version,
        videoClickTracking: videoClickTracking
      };

      var result = {
        adPodIndex: parseInt(sequence) || 1,
        sequence: sequence || null,
        adPodLength: adPodLength ? adPodLength : 1,
        data: data,
        fallbackAd: null,
        positionSeconds: adLoaded.time / 1000,
        adParams: adParams,
        streams: {'mp4': ''},
        type: AD_TYPE.INLINE,
        mediaFile: mediaFile,
        version: version,
        durationInMilliseconds: OO.timeStringToSeconds(ad.duration) * 1000
      };

      return result;
    }, this);

    /**
     * Starts the click-to-linear ad
     * This is only required for VPAID ads
     * @private
     * @method Vast#_beginVpaidAd
     */
    var _beginVpaidAd = _.bind(function() {
      if (_isVpaidAd(currentAd)) {
        var ad = currentAd.vpaidAd;
        var clickthru = currentAd.ad.data.nonLinear ? currentAd.ad.data.nonLinear.nonLinearClickThrough : '';
        //TODO: Is this used for anything?
        var adLinear = _safeFunctionCall(ad, "getAdLinear");

        initSkipAdOffset(currentAd);
        //Since a VPAID 2.0 ad handles its own UI, we want the video player to hide its UI elements
        this.amc.hidePlayerUi();
        this.amc.notifyPodStarted(currentAd.id, currentAd.ad.adPodLength);

        this.amc.notifyLinearAdStarted(currentAd.id, {
          name: currentAd.data.title,
          duration : _safeFunctionCall(ad, "getAdDuration"),
          clickUrl: clickthru.length > 0,
          indexInPod: currentAd.ad.sequence,
          skippable : _safeFunctionCall(ad, "getAdSkippableState")
        });
      }
    }, this);

    /**
     * Once Ad Playback stopped
     * This is only required for VPAID ads
     * @private
     * @method Vast#_stopVpaidAd
     */
    var _stopVpaidAd = _.bind(function() {
      if (currentAd && currentAd.vpaidAd) {
        _clearVpaidTimeouts();
        vpaidAdStoppedTimeout = _.delay(_checkVpaidAdStopped, this.VPAID_AD_STOPPED_TIMEOUT);
        _safeFunctionCall(currentAd.vpaidAd, "stopAd");
      }
    }, this);

    /**
     * Gets current ad format, which is either Linear or NonLinear
     * This is only required for VPAID ads
     * @private
     * @method Vast#_getVpaidFormat
     * @return {object} Ad format
     */
    var _getVpaidFormat = _.bind(function() {
      var format, name, node;
      node = this.$_node[0].getElementsByTagName('Linear')[0];
      if (!node) {
        node = this.$_node[0].getElementsByTagName('NonLinear')[0];
      }
      if (!node) {
        return;
      }
      name = node.nodeName;
      format = name.toLowerCase() === 'linear' ? 'Linear' : 'NonLinear';
      return format;
    }, this);

    /**
     * Get tracking events.
     * This is only required for VPAID ads
     * @public
     * @method Vast#getVpaidImpressions
     * @return {array} Array with impressions urls
     */
    this.getVpaidImpressions = function() {
      var impressions, node, nodes, _i, _len;
      impressions = [];
      nodes = this.$_node[0].getElementsByTagName('Impression');
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        impressions.push({
          url: node.textContent
        });
      }
      return impressions;
    };

    /**
     * Get tracking events.
     * This is only required for VPAID ads
     * @public
     * @method Vast#getVpaidTracking
     * @param {object} parent DOM Element to look for tracking events
     * @return {array} Array with tracking events and urls
     */
    this.getVpaidTracking = function(parent) {
      var node, nodes, tracking, _i, _len;
      tracking = [];
      nodes = parent.getElementsByTagName('Tracking');
      if (!nodes) {
        //TODO: Would returning an empty array here be better?
        return;
      }
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        tracking.push({
          event: node.getAttribute('event'),
          url: node.textContent
        });
      }
      return tracking;
    };

    /**
     * Send error.
     * This is only required for VPAID ads
     * @public
     * @method Vast#sendVpaidError
     */
    this.sendVpaidError = function() {
      if (currentAd && currentAd.data) {
        var error = currentAd.data.error;
        if (error) {
          OO.pixelPing(error);
        }
      }
    };

    /**
     * Send impressions.
     * This is only required for VPAID ads
     * @public
     * @method Vast#sendVpaidImpressions
     */
    this.sendVpaidImpressions = function() {
      if (currentAd && currentAd.data) {
        var impressions = currentAd.data.impressions;
        _.each(impressions, function(impression) {
          if (impression && impression.url) {
            OO.pixelPing(impression.url);
          }
        });
      }
    };

    /**
     * Send tracking events.
     * This is only required for VPAID ads
     * @public
     * @method Vast#sendVpaidTracking
     * @param {string} type Event name to be send
     */
    this.sendVpaidTracking = function(type) {
      var ad = prevAd ? prevAd : currentAd;
      if (ad && ad.data) {
        var tracking = ad.data.tracking,
            currentEvent;
        if (tracking) {
          currentEvent = _.find(tracking, function(item, index) {
            return item.event == type;
          });

          if (currentEvent && currentEvent.url) {
            OO.pixelPing(currentEvent.url);
          }
        }
      }
    };

    /**
     * Send click tracking event.
     * This is only required for VPAID ads
     * @public
     * @method Vast#sendVpaidClickTracking
     * @param {object} ad Ad to look for the tracking url
     */
    this.sendVpaidClickTracking = function(ad) {
      if (ad && ad.data && ad.data.videoClickTracking) {
        var clickTracking = ad.data.videoClickTracking.clickTracking;
        if (clickTracking){
          OO.pixelPing(clickTracking);
        }
      }
    };

    /**
     * Listen and executes events sent by the ad unit
     * This is only required for VPAID ads
     * @private
     * @method Vast#_onVpaidAdEvent
     * @param {string} eventName Name of the event to process
     */
    var _onVpaidAdEvent = _.bind(function(eventName) {
      switch (eventName) {
        case VPAID_EVENTS.AD_LOADED:
          vpaidAdLoaded = true;
          //For VPAID we need to check for companions after ad is created
          if (_isVpaidAd(currentAd)) {
            this.checkCompanionAds(currentAd.ad);
          }
          _clearVpaidTimeouts();
          vpaidAdStartedTimeout = _.delay(_checkVpaidAdStarted, this.VPAID_AD_STARTED_TIMEOUT);
          _safeFunctionCall(currentAd.vpaidAd, "startAd");
          initSkipAdOffset(currentAd);
          // Added to make sure we display videoSlot correctly
          this._videoSlot.style.zIndex = 10001;
          break;

        case VPAID_EVENTS.AD_STARTED:
          vpaidAdStarted = true;
          _onSizeChanged();
          prevAd = currentAd ? currentAd : null;
          this.sendVpaidTracking('creativeView');

          // If a timing issue with VTC causes the VPAID ad to not load, force load and play once the ad is started
          var isLinear = _safeFunctionCall(currentAd.vpaidAd, "getAdLinear");
          if (isLinear && this._videoSlot && this._videoSlot.buffered && (this._videoSlot.buffered.length < 1)) {
            this._videoSlot.load();
            this._videoSlot.play();
          }
          break;

        case VPAID_EVENTS.AD_IMPRESSION:
          this.sendVpaidImpressions();
          break;

        case VPAID_EVENTS.AD_CLICK_THRU:
          var url = arguments[1];
          var playerHandles = arguments[3];
          // Refer to IAB 2.5.4 How to handle VPAID clicks in VAST context
          if (playerHandles) {
            if (url) {
              this.openUrl(url);
            } else {
              this.amc.adsClicked();
            }
          }
          this.sendVpaidClickTracking();
          break;

        case VPAID_EVENTS.AD_VIDEO_START:
          this.sendVpaidTracking('start');
          break;

        case VPAID_EVENTS.AD_VIDEO_FIRST_QUARTILE:
          this.sendVpaidTracking('firstQuartile');
          break;

        case VPAID_EVENTS.AD_VIDEO_MIDPOINT:
          this.sendVpaidTracking('midpoint');
          break;

        case VPAID_EVENTS.AD_VIDEO_THIRD_QUARTILE:
          this.sendVpaidTracking('thirdQuartile');
          break;

        case VPAID_EVENTS.AD_VIDEO_COMPLETE:
          this.sendVpaidTracking('complete');
          _stopVpaidAd();
          break;

        case VPAID_EVENTS.AD_STOPPED:
          vpaidAdStopped = true;
          if (currentAd) {
            _endAd(currentAd, false);
          }
          break;

        case VPAID_EVENTS.AD_INTERACTION:
          this.sendVpaidTracking('interaction');
          break;

        case VPAID_EVENTS.AD_ERROR:
          OO.log('VPaid: Ad unit error: ' + arguments[1]);
          this.sendVpaidTracking('error');
          this.sendVpaidError();
          failedAd();
          break;

        case VPAID_EVENTS.AD_DURATION_CHANGE:
          var remainingTime = _safeFunctionCall(currentAd.vpaidAd, "getAdRemainingTime");
          if (remainingTime <= 0) {
            _stopVpaidAd();
          }
          break;

        case VPAID_EVENTS.AD_SKIPPED:
          this.sendVpaidTracking('skip');
          if (currentAd) {
            _endAd(currentAd, false);
          }
          break;

        case VPAID_EVENTS.AD_SKIPPABLE_STATE_CHANGE:
          var skipState = _safeFunctionCall(currentAd.vpaidAd, "getAdSkippableState");
          this.amc.showSkipVideoAdButton(skipState, '0');
          break;

        case VPAID_EVENTS.AD_LINEAR_CHANGE:
          var adLinear = _safeFunctionCall(currentAd.vpaidAd, "getAdLinear");
          transitionFromNonLinearVideo = true;
          if (adLinear) {
            _beginVpaidAd();
            this.amc.ui.transitionToAd();
          }
          break;

        case VPAID_EVENTS.AD_VOLUME_CHANGE:
          var volume = _safeFunctionCall(currentAd.vpaidAd, "getAdVolume");
          if (volume) {
            this.sendVpaidTracking('unmute');
          } else {
            this.sendVpaidTracking('mute');
          }
          break;

        case VPAID_EVENTS.AD_USER_ACCEPT_INVITATION:
          this.sendVpaidTracking('acceptInvitation');
          break;

        case VPAID_EVENTS.AD_USER_MINIMIZE:
          this.sendVpaidTracking('collapse');
          break;

        case VPAID_EVENTS.AD_USER_CLOSE:
          this.sendVpaidTracking('close');
          break;

        case VPAID_EVENTS.AD_PAUSED:
          this.sendVpaidTracking('pause');
          fromPause = true;
          break;

        case VPAID_EVENTS.AD_PLAYING:
          this.sendVpaidTracking('resume');
          break;
      }
    }, this);

    /**
     * Set variables to its default state
     * @private
     * @method Vast#_resetAdState
     */
    var _resetAdState = _.bind(function() {
      _removeListeners(currentAd.vpaidAd);
      currentAd = null;
      this.currentAdBeingLoaded = null;
      this.format = null;
      this.node = null;
      vpaidIframeLoaded = false;
      vpaidAdLoaded = false;
      vpaidAdStarted = false;
      vpaidAdStopped = false;
      _clearVpaidTimeouts();
    }, this);

    /**
     * Remove any new lines, line breaks and spaces from string.
     * @private
     * @method Vast#_cleanString
     * @return {string} String with no spaces
     */
    var _cleanString = function(string) {
      return string.replace(/\r?\n|\r/g, '').trim();
    };

    /**
     * Check for clickthrough url
     * @private
     * @method Vast#_hasClickUrl
     * @return {object} Ad to look for the clickthrough
     */
    var _hasClickUrl = function(ad) {
      if (ad && ad.data) {
        var  videoClickTracking = ad.data.videoClickTracking;
        if (videoClickTracking.clickThrough) {
          return videoClickTracking.clickThrough.length > 0;
        }
      }
      return false;
    };

    /**
     * Check wether or not a vpaid ad is valid by checking the version and the minimum required functions
     * This is only required for VPAID ads
     * @method Vast#_isValidVPaid
     * @private
     * @return {boolean} VPaid validated value
     */
    var _isValidVPaid = _.bind(function() {
      var vpaidVersion = null;
      try{
        //TODO: Do we want int here? If so, consider var name vpaidMajorVersion
        vpaidVersion = parseInt(currentAd.vpaidAd.handshakeVersion('2.0'));
      } catch (e) {
        OO.log("VPAID 2.0: Error while fetching VPAID 2.0 creative handshakeVersion - " + e)
      }

      var isValid = true;

      if (vpaidVersion !== 2) {
        OO.log('VPaid Ad Unit version is not supported.');
        isValid = false;
      }

      var requiredFunctions = ['handshakeVersion', 'initAd', 'startAd', 'stopAd', 'skipAd', 'resizeAd',
                               'pauseAd', 'resumeAd', 'expandAd', 'collapseAd', 'subscribe', 'unsubscribe'];
      _.each(requiredFunctions, function(fn) {
        if (currentAd && currentAd.vpaidAd && typeof currentAd.vpaidAd[fn] !== 'function') {
          isValid = false;
          OO.log('VPaid Ad Unit is missing function: ' + fn);
        }
      });

      return isValid;
    }, this);

    /**
     * Creates a new slot for each ad unit with unique id to avoid conflicts between ads.
     * This is only required for VPAID ads
     * @private
     * @return {object} A DOM element with unique id.
     */
    var _createUniqueElement = _.bind(function() {
      var parent = this.amc.ui.playerSkinPluginsElement ?
                              this.amc.ui.playerSkinPluginsElement[0] : this.amc.ui.pluginsElement[0];

      //TODO: Does this element get disposed of properly when the ad is finished?
      var element = document.createElement('div');
      element.id = _.uniqueId('pluginElement_');
      element.style.width = '100%';
      element.style.height = '100%';
      parent.insertBefore(element, parent.firstChild);
      return element;
    }, this);

    /**
     * Used to generate a frame to load ad media files.
     * This is only required for VPAID ads
     * @private
     */
    var _getFrame = _.bind(function() {
     _clearVpaidTimeouts();
     vpaidIframeLoadedTimeout = _.delay(_checkVpaidIframeLoaded, this.VPAID_AD_IFRAME_TIMEOUT);
      //TODO: Do iframes created by this function get disposed of properly after the ad is finished?
      vpaidIframe = document.createElement('iframe');
      vpaidIframe.style.display = 'none';
      vpaidIframe.onload = _onIframeLoaded;
      document.body.appendChild(vpaidIframe);
    }, this);

    /**
     * Callback when the frame is loaded.
     * This is only required for VPAID ads
     * @private
     */
    var _onIframeLoaded = _.bind(function() {
      var loader = vpaidIframe.contentWindow.document.createElement('script');
      loader.src = _cleanString(currentAd.ad.mediaFile.url);
      loader.onload = this.initializeAd;
      loader.onerror = _.bind(function(e) {
        _clearVpaidTimeouts();
        OO.log('VPAID: iframe load threw an error: ' + e);
        _endAd(currentAd, true);
      }, this);
      vpaidIframe.contentWindow.document.body.appendChild(loader);
    }, this);

    /**
     * Gets Current Fullscreen state
     * This is only required for VPAID ads
     * @private
     * @method Vast#_getFsState
     */
    var _getFsState = _.bind(function() {
      var fs;

      if (document.fullscreen != null) {
        fs = document.fullscreen;
      } else if (document.mozFullScreen != null) {
        fs = document.mozFullScreen;
      } else if (document.webkitIsFullScreen != null) {
        fs = document.webkitIsFullScreen;
      } else if (document.msFullscreenElement != null) {
        fs = document.msFullscreenElement !== null;
      }

      if (fs == null) {
        fs = false;
      }

      return fs;
    }, this);

    /**
     * Callback for Ad Manager Controller size change notification.
     * @private
     * @method Vast#_onSizeChanged
     */
    var _onSizeChanged = _.bind(function() {
      _updateCreativeSize();
    }, this);

    /**
     * Updates creatives with size changes.
     * @private
     * @method Vast#_updateCreativeSize
     */
    var _updateCreativeSize = _.bind(function() {
      if (this._slot) {
        var viewMode = _getFsState() ? 'fullscreen' : 'normal';
        var width = viewMode === 'fullscreen' ? window.screen.width : this._slot.offsetWidth;
        var height = viewMode === 'fullscreen' ? window.screen.height : this._slot.offsetHeight;
        this.resize(width, height, viewMode);
      }
    }, this);

    /**
     * Callback for Ad Manager Controller. Handles going into and out of fullscreen mode.
     * This is only required for VPAID ads
     * @private
     * @method Vast#onFullScreenChanged
     * @param {string} eventname The name of the event for which this callback is called
     * @param {boolean} isFullscreen True if entering fullscreen mode and false when exiting
     */
    var _onFullscreenChanged = function(eventname, isFullscreen) {
      _onSizeChanged();

      // only try to ping tracking urls if player is playing an ad
      if (adMode) {
        if (isFullscreen) {
          _handleTrackingUrls(currentAd, ["fullscreen"]);
        }
        else if (!isFullscreen) {
          _handleTrackingUrls(currentAd, ["exitFullscreen"]);
        }
      }
    };

    /**
     * Callback for Ad Manager Controller. Handles volume changes.
     * @public
     * @method Vast#onAdVolumeChanged
     * @param {string} eventname The name of the event for which this callback is called
     * @param {number} volume The current volume level
     */
    this.onAdVolumeChanged = function(eventname, volume) {
      if (adMode) {
        if (volume === 0 && volume !== lastVolume) {
          isMuted = true;
          lastVolume = volume;
          _handleTrackingUrls(currentAd, ["mute"]);
        }
        else if (isMuted && volume !== lastVolume) {
          isMuted = false;
          lastVolume = volume;
          _handleTrackingUrls(currentAd, ["unmute"]);
        }
      }
    };

    /**
     * Remove ad listeners
     * This is only required for VPAID ads
     * @private
     * @method Vast#_removeListeners
     */
    var _removeListeners = function(currentAd) {
      var eventName;
      for (eventName in VPAID_EVENTS) {
        currentAd.unsubscribe(eventName);
      }
    };

    /**
     * Resizes the ad slot.
     * This is only required for VPAID ads
     * @public
     * @method Vast#resize
     * @param {integer} width New width to resize to
     * @param {integer} height New height to resize to
     * @param {string} viewMode Can take values: fullscreen or normal
     */
    this.resize = function(width, height, viewMode) {
      if (currentAd && currentAd.vpaidAd) {
        _safeFunctionCall(currentAd.vpaidAd, "resizeAd", [width, height, viewMode]);
      }
    };

    /**
     * Utility function to check if an ad is a VPAID ad.
     * @private
     * @method Vast#_isVpaidAd
     * @param ad The ad to check
     * @returns {boolean}
     */
    var _isVpaidAd = function(ad) {
      return ad && ad.ad && ad.ad.data && ad.ad.data.adType === 'vpaid';
    };

    // Helpers
    // Safely trigger an ad manager function
    //TODO: consider error message override
    var _safeFunctionCall = function(vpaidAd, funcName, params) {
      try {
        if (_.isFunction(vpaidAd[funcName])) {
          return vpaidAd[funcName].apply(vpaidAd, params);
        }
      } catch (err) {
        OO.log("VPAID 2.0: ",
          "function '" + funcName + "' threw exception -",
          err);
      }
      return null;
    };
  };
  return new Vast();
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../html5-common/js/utils/InitModules/InitOO.js":1,"../html5-common/js/utils/InitModules/InitOOHazmat.js":2,"../html5-common/js/utils/InitModules/InitOOJQuery.js":3,"../html5-common/js/utils/InitModules/InitOOPlayerParamsDefault.js":4,"../html5-common/js/utils/InitModules/InitOOUnderscore.js":5,"../html5-common/js/utils/constants.js":6,"../html5-common/js/utils/environment.js":7,"../html5-common/js/utils/utils.js":8}]},{},[12]);
