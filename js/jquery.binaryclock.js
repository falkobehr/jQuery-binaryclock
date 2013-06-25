/*!
 *
 * jQuery binaryclock
 *
 * Brand new timing – project done for Razorfish agency screens.
 *
 * @version 1.0
 *
 * @example:
 *  jQuery('#box').binaryclock();
 *
 * Copyright (c) 2013 Falko Behr http://falkonien.de
 * Dual licensed under the MIT and GPL licenses.
 *
 * @author Falko Behr hello@falkonien.de
 * @copyright Falko Behr http://falkonien.de
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @license GNU http://www.gnu.org/licenses/gpl-3.0.html
 *
 */

;(function( $, window, document, undefined ) {

	var pluginName = 'binaryclock',
		defaults = {
			city: 'Berlin (default)',
			hours: '0',
			showTime: true
		};

	function Binaryclock( element, options ) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Binaryclock.prototype.init = function() {

		var _el = this.element;
		var _city = this.options.city;
		var _hours = this.options.hours;
		var _bShowTime = this.options.showTime;

		_addMarkup( _el, _city );
		_setTime( _el, _hours, _bShowTime );
		setInterval(function() {
			_setTime( _el, _hours, _bShowTime );
		}, 25);

	};

	var _getHours = function( time_, sHours_ ) {

		var _newTime = parseInt(time_)+parseInt(sHours_);
		_newTime = ( _newTime < 0 ) ? parseInt(24 + _newTime) : _newTime;

		return _newTime+'';

	};

	var _setTime = function( el_, hours_, bShowTime_ ) {

		var $clock = $(el_).find('.bi-clock');
		var _oTime = new Date();

		var _sHours = _oTime.getHours();
		_sHours = _getHours( _sHours, hours_ );
		_sHours = ( _sHours < 10 ) ? '0'+_sHours : _sHours+'';

		var _sMinutes = _oTime.getMinutes();
		_sMinutes = ( _sMinutes < 10 ) ? '0'+_sMinutes : _sMinutes+'';

		var _sSeconds = _oTime.getSeconds();
		_sSeconds = ( _sSeconds < 10 ) ? '0'+_sSeconds : _sSeconds+'';

		_iMaxSeconds = 12*60*60;
		_iOpaHours = ( _sHours < 12 ) ? _sHours : 23-_sHours;
		_iSeconds = (parseInt(_iOpaHours)*60*60) + parseInt(_sMinutes*60)+ parseInt(_sSeconds);

		$hours = $clock.find('#hours ul');
		$hours.eq(0).attr('data-num', _sHours[0] );
		$hours.eq(1).attr('data-num', _sHours[1] );

		$minutes = $clock.find('#minutes ul');
		$minutes.eq(0).attr('data-num', _sMinutes[0] );
		$minutes.eq(1).attr('data-num', _sMinutes[1] );

		$seconds = $clock.find('#seconds ul');
		$seconds.eq(0).attr('data-num', _sSeconds[0] );
		$seconds.eq(1).attr('data-num', _sSeconds[1] );

		if( bShowTime_ ) {
			$(el_).find('p span').text(_sHours+':'+_sMinutes+':'+_sSeconds);
		}

	};

	var _addMarkup = function( el_, city_ ) {

		$(el_).html('<ul class="bi-clock"><li id="hours"><ul class="bi-line"><li></li><li></li></ul><ul class="bi-line"><li></li><li></li><li></li><li></li></ul></li><li id="minutes"><ul class="bi-line"><li></li><li></li><li></li></ul><ul class="bi-line"><li></li><li></li><li></li><li></li></ul></li><li id="seconds"><ul class="bi-line"><li></li><li></li><li></li></ul><ul class="bi-line"><li></li><li></li><li></li><li></li></ul></li></ul>');

		var _clock = $(el_).append('<p>'+city_+' <span></span></p>');

	};

	$.fn.binaryclock = function( options ) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
				new Binaryclock( this, options ));
			}
		});
	}

})( jQuery, window, document );