/*
Function: autofocus
    Set the focus of a certain form element, depending on the context of the page.
    Uses the html5 'autofocus' attribute; js fallback when autofocus is not supported.
    Protect against IEx: you can't set the focus on invisible elements.

Example:
    > var f = document.getElement('input:autofocus,textarea:autofocus');

*/
if( !('autofocus' in document.createElement('input') ) ){

    //Slick.defineAttributeGetter('autofocus', function(){
    //    return this.getAttribute('autofocus') && this.isVisible();
    //});
    //var f = document.getElement('input[autofocus],textarea[autofocus]');

    Slick.definePseudo('autofocus',function(value){
        return this.getAttribute('autofocus') && this.isVisible();
    });

}




