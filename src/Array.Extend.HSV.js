/*
Function: hsv2rgb
	Convert HSV values into RGB values
*/
Array.implement({
	hsv2rgb: function(){
		// easyrgb.com/math.php?MATH=M21#text21
		var r,A,B,C,F,
			self = this,
			hue = self[0]/360, //hue - degrees from 0 to 360
			sat = self[1]/100, //saturation - %
			val = self[2]/100; //value - %

		if( !sat/*sat==0*/ ){

			r=[val,val,val];

		} else {

	        hue = (hue>1) ? 0 : 6 * hue;
	        F = Math.floor(hue);
	        A = val * (1 - sat);
	        B = val * (1 - sat * (hue-F) );
	        C = val * (1 - sat * ( 1 - (hue-F)) );
	        //val = Math.round(val);

			r = (!F/*F==0*/) ? [val,C,A] : (F==1) ? [B,val,A] : (F==2) ? [A,val,C]:
				(F==3) ? [A,B,val] : (F==4) ? [C,A,val] : [val,A,B];

	    }

		return r.map(function(x){return Math.round(x*255); });

	},
	rgb2hsv: function(){

		var hue, //hue - degrees from 0 to 360
			sat, //saturation- %
			val, //value - %
			self = this,
			r = self[0]/255,
			g = self[1]/255,
			b = self[2]/255,
			d2,dR,dG,dB,
			maxVal = Math.max(r, g, b),
			delta = maxVal - Math.min(r, g, b);

		//val = Math.round( maxVal*100 );
		val = maxVal*100;

		if( !delta /*delta==0*/ ){		//This is a gray, no chroma..

			return [0, 0, val]; //[hue,sat,val]

		} else {				//Chromatic data

			sat = delta / maxVal;
			d2 = delta / 2;
			dR = (((maxVal - r) / 6) + d2) / delta;
			dG = (((maxVal - g) / 6) + d2) / delta;
			dB = (((maxVal - b) / 6) + d2) / delta;

			hue = (r == maxVal)  ? dB - dG
				: (g == maxVal)  ? (1/3) + dR - dB
				: /*b == maxVal*/ (2/3) + dG - dR;

			if (hue < 0) { hue += 1; }
			if (hue > 1) { hue -= 1; }

			//return[ Math.round(hue*360), sat*100, val];
			return[ hue*360, sat*100, val];
		}
	}
});
