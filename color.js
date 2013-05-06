/*
Class: Color
	Class for creating and manipulating colors in JavaScript.
	Minimal variant of the Color class, inspired by mootools
 
Syntax:
	>var myColor = new Color(color[, type]);

Arguments:
	# color - (mixed) A string or an array representation of a color.
	# type - (string, optional) A string representing the type of the color to create.

Color:
	There are 2 representations of color: String, RGB.
	For String representation see Element:setStyle for more information.

Examples:
	String representation:
	> '#fff'
	RGB representation:
	> [255, 255, 255]
	Or
	> [255, 255, 255, 1] //(For transparency.)

Returns:
	(array) A new Color instance.

Examples:
	> var black = new Color('#000');
	> var purple = new Color([255,0,255]);
	> var azure = new Color('azure');

Credit:
  mootools 1.11
*/
var Color = (function(){

var htmlColors = {
		aqua:[0,255,255],
		azure:[240,255,255],
		beige:[245,245,220],
		black:[0,0,0],
		blue:[0,0,255],
		brown:[165,42,42],
		cyan:[0,255,255],
		darkblue:[0,0,139],
		darkcyan:[0,139,139],
		darkgrey:[169,169,169],
		darkgreen:[0,100,0],
		darkkhaki:[189,183,107],
		darkmagenta:[139,0,139],
		darkolivegreen:[85,107,47],
		darkorange:[255,140,0],
		darkorchid:[153,50,204],
		darkred:[139,0,0],
		darksalmon:[233,150,122],
		darkviolet:[148,0,211],
		fuchsia:[255,0,255],
		gold:[255,215,0],
		green:[0,128,0],
		indigo:[75,0,130],
		khaki:[240,230,140],
		lightblue:[173,216,230],
		lightcyan:[224,255,255],
		lightgreen:[144,238,144],
		lightgrey:[211,211,211],
		lightpink:[255,182,193],
		lightyellow:[255,255,224],
		lime:[0,255,0],
		magenta:[255,0,255],
		maroon:[128,0,0],
		navy:[0,0,128],
		olive:[128,128,0],
		orange:[255,165,0],
		pink:[255,192,203],
		purple:[128,0,128],
		violet:[128,0,128],
		red:[255,0,0],
		silver:[192,192,192],
		white:[255,255,255],
		yellow:[255,255,0]
};
return new Class({

	initialize: function(color, type){
		//if (arguments.length >= 3){
		if (2 in arguments){
			type = 'rgb'; color = Array.slice(arguments, 0, 3);
		} else if (typeof color == 'string'){
			if (color.match(/rgb/)) color = color.rgbToHex().hexToRgb(true);
			//else if (color.match(/hsb/)) color = color.hsbToRgb();
			else color = htmlColors[color.trim().toLowerCase()] || color.hexToRgb(true);
		}
		type = type || 'rgb';
		/*
		switch (type){
			case 'hsb':
				var old = color;
				color = color.hsbToRgb();
				color.hsb = old;
			break;
			case 'hex': color = color.hexToRgb(true); break;
		}
		*/
		color.rgb = color.slice(0, 3);
		//color.hsb = color.hsb || color.rgbToHsb();
		color.hex = color.rgbToHex();
		return Object.append(color, this);
	},

	/*
	Method: mix
		Mixes two or more colors with the Color.

	Syntax:
		> var myMix = myColor.mix(color[, color2[, color3[, ...][, alpha]);

	Arguments:
		# color - (mixed) A single or many colors, in hex or rgb representation, to mix with this Color.
		# alpha - (number, optional) If the last argument is a number, it will be treated as the amount of the color to mix.

	Returns:
		(array) A new Color instance.

	Examples:
	(code)
	// mix black with white and purple, each time at 10% of the new color
	var darkpurple = new Color('#000').mix('#fff', [255, 0, 255], 10);
 
	$('myDiv').setStyle('background-color', darkpurple);
	(end)
	*/
	mix: function(){
		var colors = Array.from(arguments),
			rgb = Array.from(this),
			alpha = ((typeOf(colors.getLast()) == 'number') ? colors.pop() : 50)/100,
			alphaI = 1-alpha;

		colors.each(function(color){
			color = new Color(color);
			for (var i = 0; i < 3; i++) rgb[i] = Math.round((rgb[i] * alphaI) + (color[i] * alpha));
		});
		return new Color(rgb, 'rgb');
	},

	/*
	Method: invert
		Inverts the Color.

	Syntax:
		> var myInvert = myColor.invert();

	Returns:
		* (array) A new Color instance.

	Examples:
		(code)
		var white = new Color('#fff');
		var black = white.invert();
		(end)
	*/
	invert: function(){
		return new Color( this.map( function(value){
			return 255 - value;
		}));
	}
});

})();
