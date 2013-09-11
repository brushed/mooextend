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

    ...
    window.addEvent('domready', function(){ behavior.update() });

*/
var Behavior = new Class({

    initialize: function(){
        this.behaviors = [];
    },

    add: function(selector, behavior, options){

        this.behaviors.push({s: selector, b: behavior, o: options});
        return this;

    },

    update: function(){

        //console.log(this.behaviors);
        var cache = "_bhvr", updated, type;

        this.behaviors.each( function( behavior ){

            $$(behavior.s).each( function(node){

                updated = node[cache] || (node[cache] = []);

                if ( updated.indexOf(behavior) == -1 ){

                    //console.log( behavior.s, typeOf(behavior.b) );
                    type = typeOf(behavior.b);
                    //if( type == 'string' ) node[behavior.b](behavior.o);
                    if( type == 'class'){ new behavior.b(node, behavior.o); }
                    else if( type == 'function'){ behavior.b.call(node, node, behavior.o); }

                    updated.push( behavior );
                }
            })

        })

        return this;
    }

});