/*
Function: localize
    Localize a string with optional parameters. (indexed or named)

Require:
    I18N - (global hash) repository of {{name:value}} pairs
        name - starts with a prefix {{javascript.}}
        value - (server generated) localized string, with optional {parameters}
            in curly braces

Examples:
    (start code)
    //initialize the translation strings
    var I18N = {
        "javascript.moreInfo":"More",
        "javascript.imageInfo":"Image {0} of {1}",  //indexed parms
        "javascript.imageInfo2":Image {imgCount} of {totalCount}"   //named parms
        "javascript.curlyBraces":"Show \{Curly Braces}",  //escaped curly braces
    }

    "moreInfo".localize() === "More";
    "imageInfo".localize(2,4) ===  "Image 2 of 4"
    "imageInfo2".localize({totalCount:4, imgCount:2}) === "Image 2 of 4"
    "curlyBraces".localize() === "Show {Curly Braces}"

    (end)

Note:
    Make sure that this.I18N is defined prior to binding it to the .localize function
*/
!function(I18N, prefix){

    String.implement('localize', function( params ){

            return ( I18N[prefix+this] || this ).substitute(
                ( typeOf(params) == 'object' ) ? params : Array.from(arguments)
            );

        }

    );

}( this.I18N, 'javascript.');
