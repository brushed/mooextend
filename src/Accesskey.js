/*
Function: Accesskey
    Highlight the available accesskeys to the user:
    - wrap the access key inside a span.accesskey to apply css style 
      (eg. underlining the access key)
    - add a suffix to the title attribute of the element with the accesskey
      in square brackets : "title [ key ]"
      
Arguments:
    element - DOM element
    template - (string) html template replacement string, default <span class='accesskey'>$1</span>
*/

function Accesskey(element, template){

    var accesskey = 'accesskey',
        key = element.get(accesskey),
        title = element.get('title');

    //we don't do double span.accesskeys
    if( key && !element.getElement('span.'+accesskey) ){

        element.set({
            html: element.get('html').replace(
                RegExp( '('+key+')', 'i'),
                template || "<span class='"+accesskey+"'>$1</span>"
            )         
        });

        if(title){ element.set('title', title + ' [ '+key+' ]'); }

        //console.log("ACCESSKEY ::",key, element.get('text'), element.get('title') );

    }
}