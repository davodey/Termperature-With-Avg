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

	$.fn.currentWeather = function( options ) {
		var settings = $.extend({}, $.fn.currentWeather.defaults, options),
			input = $(this).find('input'),
			$cityName = $(this).find('.city-name'),
			$currentTemp = $(this).find('.current-temp'),
			$forcastIcon = $(this).find('.forcast-icon'),
			iconUrl = 'http://openweathermap.org/img/w/';

		return $(this).find('button').click(function(){
			var icon,
				$zipCode = input.val(),
				jsonUrl = 'http://api.openweathermap.org/data/2.5/weather';

			$.ajax({
				url: jsonUrl,
				cache: true,
				type: 'GET',
				dataType: 'jsonp',
				data: {
					zip: $zipCode,
					units: settings.tempUnits,
					country: 'US',
					appid: settings.apiKey
				},
				success: function (data) {
					icon = iconUrl + data.weather[0].icon + '.png';

					if (data.main.temp < 70) {
						$currentTemp.css('color','blue');
					} else {
						$currentTemp.css('color','red');
					}
					$cityName.text(data.name);
					$currentTemp.text(Math.round(data.main.temp));
					$forcastIcon.attr('src', icon);
					$('.locationInfo').show();
				}
			});
		});
	};

	$.fn.currentWeather.defaults = {
		// set true or false to toggle the counts & API calls
		apiKey: '66195cb6dbcf32ae854c00d0ed3b0534',
		tempUnits: ''
	};

}(jQuery));