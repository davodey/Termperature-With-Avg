/*!
 *  Custom share counts with totals!
 *  Version: 1.0.0
 *  Author: David O'Dey
 *  Website: www.davidodey.com
 *  Twitter: @davodey
 *  Github: https://github.com/davodey
 *  License: MIT http://en.wikipedia.org/wiki/MIT_License or GPLv2 http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

(function ($) {
	'use strict';

	$.fn.avgWeather = function( options ) {
		var settings = $.extend({}, $.fn.avgWeather.defaults, options);

		return $(this).each(function () {
			var $targetTotal = $(this).find('.total-temp'),
				$count = $(this).find('.cities li[data-zip]').length,
				iconUrl = 'http://openweathermap.org/img/w/',
				total = 0;


			$(this).find('li[data-zip]').each(function() {
				var $target= $(this).find('.temp'),
					$targetIcon = $(this).find('.icon'),
					$zipCode = $(this).attr('data-zip'),
					jsonUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=' + $zipCode + ',us&units='+ settings.tempUnits + '&appid=' + settings.apiKey,
					temp,
					icon;

					$.ajax({
						url: jsonUrl,
						cache: true,
						type: 'POST',
						dataType: 'jsonp',
						success: function (data) {
							temp = Math.round(data.main.temp);
							icon = iconUrl + data.weather[0].icon + '.png';
	
							$target.text(temp);
							total += temp;
							$targetTotal.text(total / $count);
							$targetIcon.attr('src', icon);
						}
					});

			});
		});
	};

	$.fn.avgWeather.defaults = {
		// set true or false to toggle the counts & API calls
		apiKey: '66195cb6dbcf32ae854c00d0ed3b0534',
		tempUnits: 'Imperial'
	};

}(jQuery));