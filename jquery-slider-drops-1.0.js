(function($){
	$.fn.sliderDrops = function(settings) {

		var EL = $(this);

		var settingsDefault = {
			label: 'Slider Drops',
			width: 250, 			// px
			start: 0, 				// start position of point %
			end: 60, 				// end position of point %
			inputs: {
				position: 'edges', // top,edges
				start: 'start_name',
				end: 'end_name',
				visibility: true, // false
				className: 'slider_drops__styled_input'
			},
			pipeColor: '#d4910f',
			sliderColor: '#B33434'
		};

		var app = {
			_point: {
				start: 0,		// px
				end: 0,			// px
			},
			_slederWidth: 0,	
			_runer_width: 18,
			_settings: {},

			init: function() {
				app.loadSettings();
				console.log(app.checkRunnerPosition('start'));
				console.log(app.checkRunnerPosition('end'));
				app.calculateSlWidth();
				$(EL).html(app.view());
			},

			checkRunnerPosition: function(position){
				var stt = app._settings;
				var w = stt.width;
				app._point[position] = stt.width * stt[position] / 100;
				return app._point[position];
			},

			calculateSlWidth: function() {
				app._slederWidth = app._settings.end - app._settings.start;
				return app._slederWidth;
			},
			
			loadSettings: function() {
				if(settings === undefined){
					app._settings = settingsDefault;
				} else {
					// merge 2 objects in 1
					app._settings = $.extend(settings, settingsDefault);
				}
				app.validateSettings();
			},

			validateSettings: function() {
				// @todo validate settings!
				var pc = app.hexToRgb(app._settings.pipeColor);
				app.setRgbColor(pc, 'pipeColor');
				var sc = app.hexToRgb(app._settings.sliderColor);
				app.setRgbColor(sc, 'sliderColor');
			},

			setRgbColor: function(pc, field){
				app._settings[field] = 'rgb(' + pc.r + ',' + pc.g + ',' + pc.b + ')';
				app._settings[field + 'Decorate'] = 'rgb(' + (pc.r + 10) + ',' + (pc.g + 10) + ',' + (pc.b + 10) + ')';
			},

			hexToRgb: function (hexColor){
				if(!/^\#?[\da-f]{6}$/i.test(hexColor))
					return null;
				var color = (hexColor.charAt(0)=="#") ? hexColor.substring(1):hexColor;
				return {
					"r" : parseInt(color.substring(0,2),16),
					"g" : parseInt(color.substring(2,4),16),
					"b" : parseInt(color.substring(4,6),16)
				}
			},

			view: function(){
				var tpl = '<div class="slider_drops">'
                                +'<label for="">'+ app._settings.label +'</label>'
                                +'<div class="slider_drops__clearfix">'
                                    +'<input type="text" name="'+ app._settings.inputs.start +'" class="'+ app._settings.inputs.className +' slider_drops__pull-left">'
                                    +'<input type="text" name="'+ app._settings.inputs.start +'" class="'+ app._settings.inputs.className +' slider_drops__pull-right">'
                                    +'<div class="slider_drops__pipe" style="width: '+ app._settings.width +'px">'
                                        +'<div class="slider_drops__scale_pipe" style="width: '+ app._slederWidth +'%">'
                                            +'<div class="slider_drops__scale_pipe_decorator"></div>'
                                        +'</div>'
                                        +'<div class="slider_drops__pipe_decorator"></div>'
                                        +'<div class="slider_drops__runner slider_drops__runner_left" style="left: '+ (app._point.start - app._runer_width/2 ) +'px"></div>'
                                        +'<div class="slider_drops__runner slider_drops__runner_rigth" style="left: '+ (app._point.end - app._runer_width/2 ) +'px"></div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
                return tpl;
			}

		};

		app.init();
		console.log(app._settings);
	}
})(jQuery);