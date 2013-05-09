/*
Class: Color
	Class for creating and manipulating colors in JavaScript.
	This is a minimized variant of the Color class, based Mootools.More,
	written for jspwiki.
	It also supports the html color names.
 
Syntax:
	>var myColor = new Color(color[, type]);

Arguments:
	# color - (mixed) A string or an array representation of a color.
	# type - (string, optional) A string representing the type of the color to create.

Color:
	There are 2 representations of color: String, RGB.
	For String representation see Element:setStyle for more information.

Returns:
	(array) A new Color instance.

Examples:
	> var black = new Color('#000');
	> var purple = new Color([255,0,255]);
	> var purple = new Color([255,0,255, .75]);
	> var azure = new Color('azure'); //support html names

*/

!function(){

var RGB = 'rgb',
	c0l0r = new Element('i'),
	Color = this.Color = new Type('Color', function(color, type){
	if (arguments.length >= 3){
		type = RGB; color = Array.slice(arguments, 0, 3);
	} else if (typeof color == 'string'){
		color = ( color.match(/rgb/) ?
			color.rgbToHex() :
			c0l0r.setStyle('color',color).getStyle('color') ).hexToRgb(true);

	}
	type = type || RGB;
	color.rgb = color.slice(0, 3);
	color.hex = color.rgbToHex();
	return Object.append(color, this);
});

Color.implement({

	mix: function(){
		var colors = Array.slice(arguments),
			alpha = ( (typeOf(colors.getLast()) == 'number') ? colors.pop() : 50 )/100,
			alphaI = 1-alpha,
			rgb = this.slice();

		colors.each(function(color){
			color = new Color(color);
			for (var i = 0; i < 3; i++) rgb[i] = ((rgb[i] * alphaI) + (color[i] * alpha)).round();
		});
		return new Color(rgb, RGB);
	},

	invert: function(){
		return new Color(this.map(function(value){
			return 255 - value;
		}));
	}

});

}();