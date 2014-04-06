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

        T_Class = T_Class||'';
        F_Class = F_Class||'';

        return this.addClass(flag?T_Class:F_Class).removeClass(flag?F_Class:T_Class);

    },

    /*
    Function: wrapChildren
        This method moves this Element around its children elements.
        The Element is moved to the position of the passed element and becomes the parent.
        All child-nodes are moved to the new element.

    Arguments:
        el - DOM element.

    Returns:
        (element) This Element.

    DOM Structure:
    (start code)
        //before
        div#firstElement
            <children>

        //javaScript
        var secondElement = 'div#secondElement'.slick();
        secondElement.wrapChildren($('myFirstElement'));

        //after
        div#firstElement
            div#secondElement
            <children>    
    (end)
    */
    /*CHECKME: obsolete ??
    wrapChildren : function(el){
    
        while( el.firstChild ){ this.appendChild( el.firstChild ); }
        el.appendChild( this ) ;
        return this;

    },
    */

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
    onHover: function( toggle, onOpen ){

        var element = this;

        if( toggle = element.getParent(toggle) ){

             element.fade('hide');

             toggle.addEvents({
                mouseenter: function(){ element.fade(0.9); toggle.addClass('open'); if(onOpen) onOpen(); },
                mouseleave: function(){ element.fade(0);   toggle.removeClass('open'); }
            });

        }
        return element;
    },

    /*
    Function: onToggle
        Set/reset '.active' class of an element, based on click events received on 
        the element referred to by the 'data-toggle' attribute.

    Arguments:
        toggle - A CSS selector of clickable toggle buttons
            The selector "buttons" is used to style a group of checkboxes or radio-buttons.  (ref. Bootstrap)
            
        active - CSS classname to toggle this element (default is '.active' )

    Example
    (start code)
       wiki.add('[data-toggle]', function(element){
           element.onToggle( element.get('data-toggle') );
       })
    (end)
    
    DOM Structure
    (start code)
        //normal toggle case
        div[data-toggle="button#somebutton"](.active) 
        ..
        button#somebutton Click here to toggle that
        
        //special toggle case with "buttons" selector
        div.btn-group[data-toggle="buttons"]
            label.btn.btn-default(.active)
                input[type="radio"][name="aRadio"] checked='checked' value="One" />
            label.btn.btn-default(.active)
                input[type="radio"][name="aRadio"] value="Two" />
        
    (end)

    */
    onToggle: function( toggle, active ){

        var element = this;
        active = active || "active";

        if( toggle == "buttons" ){
        
            toggle = function(){
                //FIXME: differentiate between radioboxes and checkboxes !!
                element.getElements('.'+active).removeClass(active);
                element.getElements(':checked !').addClass(active);
            };
            toggle();
            element.addEvent('click', toggle);
        
        } else {

            //if(!document.getElements(toggle)[0]){ console.log("toggle error:",toggle); }
            document.getElements(toggle).addEvent('click', function(event){
                event.stop();
                element.toggleClass( active );
            });

        }
        return element;

    },

    /*
    Function onModal
        Open a modal dialog with ''message''.
        Used on forms (submit) or form-elements (click), to get a 
        confirmation prior to executing the default behaviour of the event.
        TODO: use DOM based modal dialog rather then JS confirm(..)
    
    Example:
    (start code)    
        wiki.add('[data-modal]', function(element){
            element.onConfirm( element.get('data-modal') );
        });
        
    (end)

    */
    onModal:function( message ){

        this.addEvent( this.match('form') ? 'submit' : 'click' , function(e){

            return window.confirm(message);
            /*
            TODO
            build modal dialog
            modalbody.set('html',message);
            return modaldialog.show();
            */

        });
    },
    
    /*
    Function sticky
        Simulate 'position:sticky'.
        Keep the element fixed on the screen, during scrolling.
        FIXME: only supports top-bottom scrolling.
    
    Example:
    (start code)    
        //css
        .sticky {
            display:block;
            .transition(background 2s ease);     
            + .sticky-spacer { .hide; }
        }
        .stickyOn {
            position: fixed;
            top: 0;
            z-index: @sticky-index;
            background: @sticky-bg-color;

            // avoid page-bump when sticky become 'fixed', by adding a spacer with its height
            + .sticky-spacer { show; }    
        }
    
        wiki.add('.sticky', function(element){ element.onSticky() );  });        
    (end)
    */
    onSticky: function(){
    
        var element = this,
            origOffset = element.getPosition(document.body).y, //get offset relative to the doc.body
            origWidth = element.offsetWidth,
            on;

        'div.sticky-spacer'.slick({height:element.offsetHeight}).inject(element,'after');

        //FFS: considering adding throttle to limit event invocations eg 'scroll:throttle'
        document.addEvent('scroll', function(){

            on = ( window.scrollY >= origOffset );

            element.ifClass( on, 'stickyOn' ).setStyle('width', on ? origWidth : '' );
            //redo the width of the fixed element, cause 'position:fixed' is relative to the document, 
            //therefore it may loose inherited box widths (FFS: quid other inherited styles ??)

        });
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

                if( type == 'checkbox' ){   //checkbox.get-value = returns 'on' on some browsers, T/F on others

                    return ('input[type=checkbox]'+(self.defaultChecked?":checked":"")).slick().get('value');

                }

                if( !'radio|hidden|text|password'.test(type) ){ break; }

            case 'textarea':

                return self.defaultValue;

            default: return false;

        }

    },

    /*
    Function: groupChildren(start, grab)
        groups lists of children, which are delimited by certain DOM elements.

    Arguments
        - start : (string) css selector to match delimiting DOM elements
        - grab : (string) css selector, grabs a subset of dom elements
                    and replaces the start element
        - replacesFn: (callback function) called at the point of replacing the
                start-element with the grab-element

    DOM Structure:
    (start code)
        //before groupChildren(start,grab)
        start
        b
        b
        start
        b
        //after groupChildren(start,grab)
        grab [data-inherit="{text:.<start.text>.,id:.<start.id>.}"]
            b
            b
        grab [data-inherit="{text:.<start.text>.,id:.<start.id>.}"]
            b

    Example:
    >   el.groupChildren(/hr/i,'div.col');  
    >   el.groupChildren(/h[1-6]/i,'div.col');
    >   el.groupChildren( container.getTag(), 'div');
    */
    groupChildren:function(start, grab, replacesFn){

        var next, 
            group = grab.slick().inject(this,'top'),
            firstGroupDone = false;

        //need at least one start element to get going
        if( this.getElement(start) ){

            while( next = group.nextSibling ){
            
                if( ( next.nodeType!=3 ) && next.match(start) ){  //start a new group
                    
                    if( firstGroupDone ){  group = grab.slick(); } //make a new group
                    if( replacesFn ) replacesFn(group, next);
                    group.replaces( next );  //destroys the matched start element
                    firstGroupDone = true;

                } else {

                    group.appendChild( next );  //grap all other elements in the group 

                }
            }
        }
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