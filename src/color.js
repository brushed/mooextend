/*
Class: Color
	Class for creating and manipulating colors in JavaScript.
	This is a minimized variant of the Color class, based Mootools.More,
	written for jspwiki.
	It adds supports for html color names. (ref. http://en.wikipedia.org/wiki/Web_colors)
 
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
	> var azure = new Color('red'); //support 16 standard vga color names
	> var azure = new Color('azure'); //support all 130 additional X11 color names

*/

!function(){

var RGB = 'rgb',
	VGA = "black#000 green#008000 silver#c0c0c0 lime#0f0 gray#808080 olive#808000 white#fff yellow#ff0 maroon#800000 navy#000080 red#f00 blue#00f purple#800080 teal#008080 fuchsia#f0f aqua#0ff",
	c0l0r = new Element('i'),

	Color = this.Color = new Type('Color', function(color, type){
	if (arguments.length >= 3){
		type = RGB; color = Array.slice(arguments, 0, 3);
	} else if (typeof color == 'string'){

		if(color.test(/^[\da-f]{3,6}$/)) color = "#"+color;
		c0l0r.setStyle('color',''); //clear the template
		color = ( VGA.test( RegExp(color+"(#\\S+)" ) ) ? RegExp.$1 :
			color.match(/rgb/) ? color.rgbToHex() :
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
		return new Color(255-this[0],255-this[1],255-this[2]);
		/*return new Color(this.map(function(value){
			return 255 - value;
		}));*/
	}

});

}();