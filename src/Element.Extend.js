/*
Moo-extend: String-extensions
    Element: ifClass(), addHover(),hoverOn(), hoverUpdate(), getDefaultValue()
*/

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
        The value returned in a POST will be input.get('value')
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

                //if( ( 'checkbox'==type ) && (self.checked != self.defaultChecked)) break;
                if( type == 'checkbox' ){ return self.defaultChecked; }

                if( !'radio|hidden|text|password'.test(type) ){ break; }

            case 'textarea':

                return self.defaultValue;

            default: return false;

        }

    }

});