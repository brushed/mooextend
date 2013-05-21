/*
Function: localize
    Localize a string with optional parameters. (indexed or named)

Require:
    LocalizedString - (global hash) It stores all the {{name:value}} pairs
        name - starts with a prefix {{javascript.}}.
        value - (server generated) localized string, with optional {parameters}
            in curly braces.

Examples:
    (start code)
    //initialize the i18n strings
    var LocalizedStrings = {
        "javascript.moreInfo":"More",
        "javascript.imageInfo":"Image {0} of {1}",  //indexed parms
        "javascript.imageInfo2":Image {imgCount} of {totalCount}"   //named parms
        "javascript.curlyBraces":"Show \{Curly Braces}",  //escaped curly braces
    }

    "moreInfo".localize() === "More";
    "imageInfo".localize(2,4) ===  "Image 2 of 4"
    "imageInfo2".localize({imgCount:2, totalCount:4}) === "Image 2 of 4"
    "curlyBraces".localize() === "Show {Curly Braces}"

    (end)

Note:
    Make sure that this.LocalizedStrings is defined prior to binding it to the .localize function
*/
!function(i18nStrings, i18nprefix){

    String.implement('localize', function( params ){

            return ( i18nStrings[i18nprefix+this] || this ).substitute(
                ( typeOf(params) == 'object' ) ? params : Array.from(arguments)
            );

        }

    );

}( this.LocalizedStrings, 'javascript.');
