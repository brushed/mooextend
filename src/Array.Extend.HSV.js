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
            F = hue|0;  //Math.floor(hue);
            A = val * (1 - sat);
            B = val * (1 - sat * (hue-F) );     
            C = val + A - B; //val * (1 - sat * ( 1 - (hue-F)) );
            //val = Math.round(val);

            r = (F==0) ? [val, C, A] : 
                (F==1) ? [B, val, A] : 
                (F==2) ? [A, val ,C] :
                (F==3) ? [A, B, val] : 
                (F==4) ? [C, A, val] : [val, A, B];

        }

        return r.map( function(x){ return(.5 + x*255)|0; }); ///Math.round()
        //return [ (.5+r[0]*255)|0, (.5+r[1]*255)|0, (.5+r[2]*255)|0 ];

    },
    
    rgb2hsv: function(){

        var hue=0, //hue - degrees from 0 to 360
            sat=0, //saturation- %
            self = this,
            r = self[0]/255,
            g = self[1]/255,
            b = self[2]/255,
            d2,dR,dG,dB,
            maxVal = [r,g,b].max(), // Math.max(r, g, b),
            //val = Math.round( maxVal*100 )
            val = maxVal*100, //value - %
            delta = maxVal - [r,g,b].min(); //Math.min(r, g, b);

                        //if delta==0 : this is a gray, no chroma..
        if( delta ){    //else chromatic data

            sat = delta / maxVal;
            d2 = delta / 2;
            dR = (((maxVal - r) / 6) + d2) / delta;
            dG = (((maxVal - g) / 6) + d2) / delta;
            dB = (((maxVal - b) / 6) + d2) / delta;

            hue = (r == maxVal) ? dB - dG
                : (g == maxVal) ? (1/3) + dR - dB
                : /*b == maxVal*/ (2/3) + dG - dR;

            if (hue < 0) { hue += 1; }
            if (hue > 1) { hue -= 1; }

        }
        
        return[ (.5+hue*360)|0, sat*100, val];
    }
});
