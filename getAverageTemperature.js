
(function ($) {
	'use strict';

	$.fn.avgWeather = function( options ) {
		var settings = $.extend({}, $.fn.avgWeather.defaults, options);

		$(this).each(function () {
			var $targetTotal = $('.total-temp',this),
				$count = $('.cities li[data-zip]', this).length,
				iconUrl = 'http://openweathermap.org/img/w/',
				total = 0;


			$('li[data-zip]', this).each(function() {
				var $target= $('.temp', this),
					$targetIcon = $('.icon', this),
					$zipCode = $(this).attr('data-zip'),
					jsonUrl = 'http://api.openweathermap.org/data/2.5/weather',
					temp,
					icon;

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
							temp = Math.round(data.main.temp);
							icon = iconUrl + data.weather[0].icon + '.png';
	
							$target.text(temp);
							total += temp;
							$targetTotal.text(total / $count);
							$targetIcon.attr('src', icon);
						}
					});

			});
			return this;
		});
	};

	$.fn.avgWeather.defaults = {
		// set true or false to toggle the counts & API calls
		apiKey: '66195cb6dbcf32ae854c00d0ed3b0534',
		tempUnits: ''
	};

}(jQuery));