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
	ready( function(){ behavior.update() });
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

    console.log(this.behaviors);
        //array.forEach(this.behaviors, function(behavior){
        this.behaviors.each( function(behavior){
            //var nodes = $(behavior.s);
            //if (nodes) nodes.each(function(node){
            $$(behavior.s).each(function(node){
                node = $(node);
                var updated = node._behaviorUpdated || (node._behaviorUpdated = []);
                //if (array.indexOf(updated, behavior) == -1){
                if (updated.indexOf(behavior) == -1){
                    //behavior.b.call(node, node)
                    behavior.b.call(node, node, behavior.o);
                    updated.push(behavior);
                }
            })
        })
        return this;
    }
});