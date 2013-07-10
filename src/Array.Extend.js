/*
Moo-extend: String-extensions
    Array:  rendAr(), max(), min()
*/


/*
Array.rendAr()
    Mini template engine to generate DOM objects from clean, elegant templates,
    by utilising the Mootools Slick engine.
    Extensions:
    - "attach" any DOM element to js object properties

Credit: https://github.com/Mr5o1/rendAr by Levi Wheatcroft (leviwheatcroft.com)

Requires:
    - core/Element
    - core/Elements
    - core/Array

Example Element.attach():
   new Element('div',{ attach:this });        //this.element now refers to div
   new Element('div',{ attach:[this] });    //this.element now refers to div
   new Element('div',{ attach:[this,'myproperty'] }); //this.myproperty now refers to div

Example rendAr()
   ['div',{attach:[this,'myproperty'] }].rendAr();

*/
Element.Properties.attach = {

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

});
