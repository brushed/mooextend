/*
Class: Behavior
  Behavior is a way to initiate certain UI components for elements on the page
  by a given selector. The callback is only called once of each element.

  Inspired by: https://github.com/arian/elements-util/blob/master/lib/behavior.js
  Extended for jspwiki.

Example:

    var behavior = new Behavior()

    // define a new slider behavior, which initiates a slider class.
    behavior.add('.slider', function(element){
        new Slider(element)
    })
    //this function is invoked once, with all Elements passed as argument
    behavior.once('.slider', function(elements){
        new Slider(elements)
    })

    ...
    window.addEvent('domready', function(){ behavior.update() });

*/
var Behavior = new Class({

    initialize: function(){
        this.behaviors = [];
    },

    add: function(selector, behavior, options, once){

        this.behaviors.push({s: selector, b: behavior, o: options, once: once});
        return this;

    },

    once: function(selector, behavior, options){

        return this.add(selector, behavior, options, true);

    },

    update: function(){

        var cache = "_bhvr", updated, type, isClass, isFunction,
            nodes, node, i = 0, j, item, behavior, options;

        while( item = this.behaviors[ i++ ] ){

            //console.log("BEHAVIOR ", item.once?"ONCE ":"", nodes.length, item.s, typeOf(item.b) );
            options = item.o;
            behavior = item.b;
            type = typeOf(behavior);
            isClass = ( type == "class" );
            isFunction = ( type == "function" );

            nodes = $$(item.s); //selector
            if( nodes[0] ){

                if( item.once ){

                    if( isClass ){ new behavior(nodes, options); }
                    else if( isFunction ){ behavior(nodes, options); }

                } else {

                    for( j=0; node = nodes[ j++ ]; ){

                        updated = node[cache] || (node[cache] = []);

                        if ( updated.indexOf(item) < 0 ){

                            //if( isString ) node[behavior](options);
                            if( isClass ){ new behavior(node, options); }
                            else if( isFunction ){ behavior.call(node, node, options); }

                            updated.push( item );
                        }
                    }
                }
            }
        }

        return this;
    }

});
