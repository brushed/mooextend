/*
Global: mootools-extensions
    String : capitalize,() deCamelize(), trunc(), xsubs()
    Array:  rendAr(), max(), min()
    Element: ifClass(), addHover(),hoverOn(), hoverUpdate(), getDefaultValue()
*/

/*
if(typeof(console) === 'undefined'){
    var console = {}
    console.log = //console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile =
        function(){};
}
*/

String.implement({

    /* fix mootools implementation , supporting i18n chars such as éàè... */
    capitalize: function(){
        return this.replace(/(\s|^)\S/g, function(match){
            return match.toUpperCase();
        });
    },

    /*
    Function: deCamelize
        Convert camelCase string to space-separated set of words.

    Example:
    >    "CamelCase".deCamelize() === "Camel Case";
    */
    deCamelize: function(){
        //return this.replace(/([a-z])([A-Z])/g,"$1 $2");
        //return this.replace(/([a-zà-ý])([A-ZÀ-Ý])/g,"$1 $2");
        return this.replace(/([a-z\xe0-\xfd])([A-Z\xc0-\xdd])/g,"$1 $2");
    },

    /*
    Function: trunc
        Truncate a string to a maximum length

    Arguments:
        size - maximum length of the string, excluding the length of the elips
        elips - (optional) replaces the truncated part (defaults to '...')

    Alternative
        Use css propoerty
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;

    Example:
    > "this is a long string".trunc(7) === "this is..."
    > "this is a long string".trunc(7,'__') === "this is__"
    */
    trunc: function (size, elips){
        return this.slice(0, size-1) + ((this.length<size) ? '' : (elips||'…'));
    },

    /*
    Function: xsubs (extended Substitute)
        Equal to substitute(), but with support for anonymous arguments.

        Named arguments:
        >    "Hello {text}".xsubs({text:"world"}) ==>  "Hello world"
        Anonymous arguments:
        >    "Hello {0}{1}".xsubs("world", "!") ===  "Hello world!"
    */
    xsubs: function(object, regexp){

        if( typeOf(object) != 'object' ){
            object = Array.from(arguments);
            regexp = null;
        }
        return this.substitute(object, regexp);
    },

    /*
    Function: sliceArgs
        Parse the arguments of a string or an element's class-name.
        Command pattern: <prefix>(-arg1)(-arg2)...
        Returns an array of arguments.
        > <command>.sliceArgs( args-string | element-with-classname );

    Arguments:
        object : (string) or (dom-element)
        regexp : (string) pattern match for the arguments

    Example
        > "zebra".sliceArgs( "zebra-eee-ffa" );

    */
    sliceArgs: function(args, regexp){

        if( args.grab /*typeOf(args)=='element'*/) args = args.className;
        if( !regexp) regexp = "(?:-\\w+)*";
        return ( args.match( RegExp(this+regexp) )||[''] )[0].split('-').slice(1);

    }

});


/*
---
script: rendAr.js
version: v0.4
description: rendAr utilises the Mootools Slick engine to generate DOM objects from clean, elegant templates.
license: MIT-style
download: http://mootools.net/forge/p/rendar/v0.1
source: https://github.com/Mr5o1/rendAr
demo: http://leviwheatcroft.com/rendAr/demo.htm

authors:
- Levi Wheatcroft (leviwheatcroft.com)
- with few extentions:  attach feature; code optimizations

provides:
- Array.rendAr

requires:
- core/1.3.0:Element
- core/1.3.0:Elements
- core/1.3.0:Array

...
*/
Element.Properties.attach = {

    //Usage:
    //    new Element('div',{ attach:this });        //this.element now refers to div
    //    new Element('div',{ attach:[this] });    //this.element now refers to div
    //    new Element('div',{ attach:[this,'myproperty'] }); //this.myproperty now refers to div
    //    ['div',{attach:[this,'myproperty'] }].rendAr();

    set: function( object ){
        if(!object[0]) object = [object];
        object[0][ object[1] || 'element' ] = this;
    }

};

Array.implement({

    rendAr: function() {

        var elements = [],type;

        this.each( function(item){
            type = typeOf(item);
            if ( type == 'elements' ) elements.append(item);
            else if ( item.grab /*isElement*/ ) elements.push(item);
            else if ( item.big  /*isString*/ ) elements.push(new Element(item));
            else if ( type == 'object' ) elements.getLast().set(item);
            else if ( item.pop /*isArray*/ ) elements.getLast().adopt(item.rendAr());
        });

        return elements[1] ? new Elements(elements) : elements[0];
    },

    max: function(){ return Math.max.apply(null, this); },
    min: function(){ return Math.min.apply(null, this); }

    /* natural sort algortihm
    sortNat: function(){

    }
    */

});


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

Element.implement({

    /*
    Function: ifClass
        Convenience function.
        Add or remove a css class from an element depending on a conditional flag.

    Arguments:
        flag : (boolean)
        T_Class : (string) css class name, add on true, remove on false
        F_Class : (string) css class name, remove on true, add on false

    Returns:
        (element) - This Element

    Examples:
    >    $('page').ifClass( i>5, 'hideMe' );
    */
    ifClass : function(flag, T_Class, F_Class){

        return  this.addClass(flag?T_Class:F_Class).removeClass(flag?F_Class:T_Class);

    },

    /*
    Function: addHover
        Shortcut function to add 'hover' css class to an element.
        This allows to support :hover effects on all elements, also in IE.

    Arguments
        clazz - (optional) hover class-name, default is {{hover}}

    Returns:
        (element) - This Element

    Examples:
    >    $('thisElement').addHover();
    */
    addHover: function(clazz){

        clazz = clazz || 'hover';

        return this.addEvents({
            mouseenter: function(){ this.addClass(clazz); },
            mouseleave: function(){ this.removeClass(clazz); }
        });

    },

    /*
    Function: hoverOn
        Convert element into a hover menu.

    Arguments:
        parent - (string,optional) A tag name to match the found element(s) with. A full CSS selector can be passed.
    */
    hoverOn: function(parent){

        var element = this;

        if( parent = element.getParent(parent) ){

             element.store("$hoverparent",parent).set('visibility','visible').fade('hide'); //checkme

             parent.addEvents({
                mouseenter: function(){ element.fade(0) },
                mouseleave: function(){    element.hoverUpdate().fade(0.9) }
            });
        }
        return element;

    },

    /*
    Function: hoverUpdate
        Reposition the menu
        Checkme : replace by css ?
    */
    hoverUpdate: function(){

        var parent = this.get("$hoverparent");

        if( parent ){
            parent = parent.getCoordinates();
            this.setStyles({ left:parent.left, top:parent.top + parent.height });
        }
        return this;

    },



    /*
    Function: getDefaultValue
        Returns the default value of a form element.
        Inspired by get('value') of mootools, v1.1

    Note:
        Checkboxes will return true/false depending on the default checked status.
        ( input.checked to read actual value )
        The value returned in the POST will be input.get('value')
        and is depending on the value set by the 'value' attribute (optional)

    Returns:
        (value) - the default value of the element; or false if not applicable.

    Examples:
    > $('thisElement').getDefaultValue();
    */
    getDefaultValue: function(){

        var self = this,
            type = self.get('type'),
            values = [];

        switch( self.get('tag') ){

            case 'select':

                Array.from(this.options).each( function(option){

                    if (option.defaultSelected){ values.push(option.value||option.text); }

                });

                return (self.multiple) ? values : values[0];

            case 'input':

                //if( ('checkbox'==type) && (self.checked != self.defaultChecked)) break;
                if('checkbox'==type){ return self.defaultChecked; }

                if(    !'radio|hidden|text|password'.test(type) ){ break; }

            case 'textarea':

                return self.defaultValue;

            default: return false;

        }

    }

});


