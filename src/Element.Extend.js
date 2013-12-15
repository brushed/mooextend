/*
Moo-extend: String-extensions
    Element: ifClass(), addHover(),onHover(), hoverUpdate(), getDefaultValue(), observe()
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
    addHover: function( clazz ){

        clazz = clazz || 'hover';

        return this.addEvents({
            mouseenter: function(){ this.addClass(clazz); },
            mouseleave: function(){ this.removeClass(clazz); }
        });

    },

    /*
    Function: onHover
        Convert element into a hover menu.

    Arguments:
        toggle - (string,optional) A CSS selector to match the hoverable toggle element

    Example
    > $('li.dropdown-menu').onHover('ul');
    */
    onHover: function( toggle ){

        var element = this;

        if( toggle = element.getParent(toggle) ){

             element.fade('hide');

             toggle.addEvents({
                mouseenter: function(){ element.fade(0.9); toggle.addClass('open'); },
                mouseleave: function(){ element.fade(0);   toggle.removeClass('open'); }
            });
        }

        return element;

    },

    /*
    Function: onToggle
        Set/reset '.active' class, based on 'data-toggle' attribute.

    Arguments:
        toggle - A CSS selector of the clickable toggle button
        active - CSS classname to toggle this element (default .active )

    Example
    >   wiki.add('div[data-toggle]', function(element){
    >       element.onToggle( element.get('data-toggle') );
    >   })


    */
    onToggle: function( toggle, active ){

        var element = this;

        if( toggle = document.getElements( toggle ) ){

            toggle.addEvent('click', function(event){
                event.stop();
                element.toggleClass( active || 'active');
            });

        }
        return element;

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
            values = [],
            checkbox; //helpers for checkboxes

        switch( self.get('tag') ){

            case 'select':

                Array.from(this.options).each( function(option){

                    if (option.defaultSelected){ values.push(option.value||option.text); }

                });

                return (self.multiple) ? values : values[0];

            case 'input':

                //if( type == 'checkbox' ){ return self.defaultChecked; }
                if( type == 'checkbox' ){ 
                
                    return new Element('input[type=checkbox]'+self.defaultChecked?"[checked]":"").value;

                }

                if( !'radio|hidden|text|password'.test(type) ){ break; }

            case 'textarea':

                return self.defaultValue;

            default: return false;

        }

    },

    /*
    Function: wrapChildren(delimiter, wrapper)
        Wraps lists of children, which are delimitted by certain DOM elements.

    Arguments
        - delimiter : (string) css selector matching the delimiting DOM element
        - wrapper : (string) wrapper dom element

    DOM Structure before
        a
        b
        b
        a
        b
    DOM Structure after  .wrapChildren(a,w)
        w
            b
            b
        w
            b

    Example:
    >   el.wrapChildren(/hr/i,'div.col');
    >   el.wrapChildren(/h[1-6]/i,'div.col');
    >   el.wrapChildren( element.getTag(), 'div.tab');
    */
    wrapChildren:function(delimiter, wrapper){

        var next, temp, items=[];
        wrapper = new Element(wrapper).inject(this,'top');

        while( next = wrapper.getNext() ){

            if( next.match(delimiter) ){

                if( items[0] ){
                    temp = wrapper;
                    wrapper = wrapper.clone().replaces(next);
                    temp.adopt(items);
                    items = [];
                }

            } else {

                items.push(next);

            }

        }

        items [0] ? wrapper.adopt(items) : wrapper.destroy();
        return this;

    },

    /*
    Function: observe
        Observe a dom element for changes, and trigger a callback function.

    Arguments:
        fn - callback function
        options - (object)
        options.event - (string) event-type to observe, default = 'keyup'
        options.delay - (number) timeout in ms, default = 300ms

    Example:
    >    $(formInput).observe(function(){
    >        alert('my value changed to '+this.get('value') );
    >    });

    */
    observe: function(callback, options){

        var element = this,
            value = element.get('value'),
            event = (options && options.event) || 'keyup',
            delay = (options && options.delay) || 300,
            timer = null;

        return element.set({autocomplete:'off'}).addEvent(event, function(){

            var v = element.get('value');

            if( v != value ){
                value = v;
                //console.log('observer ',v);
                clearTimeout( timer );
                timer = callback.delay(delay, element);
            }

        });

    }

});