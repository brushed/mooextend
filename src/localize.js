/*
Function: localize
	Localize a string; replace optional parameters.
	You can use indexed parameters, or a set of key:value pairs.
	Uses the {{LocalizedString}} global hash.

	{{LocalizedStrings}} is the store of all {{name:value}} pairs
	with the localisation replacment values.
	The name of an item starts with a prefix {{javascript.}}.
	The value of an item may contain indexed or named parameters.

Examples:
>	//initialize the i18n strings
>	LocalizedStrings = {
>		"javascript.some.resource.key":"localised resource key {0}" ,
>		"javascript.moreInfo":"More",
>		"javascript.imageInfo":"Image {0} of {1}",
>		"javascript.imageInfo2":Image {imgCount} of {totalCount}"
>		"javascript.curlyBraces":"Show \{Curly Braces}",
>	}
>
>	//no parameters
>	"moreInfo".localize() =="More";
>	//indexed parameters
>	"imageInfo".localize(2,4); => "Image {0} of {1}" becomes "Image 2 of 4"
>	//named parameters
>	"imageInfo2".localize({imgCount:2, totalCount:4}); => "Image {imgCount} of {totalCount}" becomes "Image 2 of 4"
>	//escape curly braces
>	"curlyBraces".localize(); => "Show \{Curly Braces}" becomes "Show {Curly Braces}"

Note:
	Make sure that this.LocalizedStrings is defined prior to binding it to the .localize function
*/

(function(i18nStrings, i18nprefix){
	String.implement({
		localize: function( parms ){
			return (i18nStrings[i18nprefix+this] || this).substitute(
				(typeOf(parms)=='object') ? parms : Array.from(arguments)
			);
		}
	});
})( this.LocalizedStrings, 'javascript.');
