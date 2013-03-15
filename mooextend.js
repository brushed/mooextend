/*
Global shortcuts:
  $E : shortcut for document.getElement(css-selector)
	$A : shortcut for Array.from , convert args to array
	$getText : Fast retrieval of textvalue of a dom node. (no conversion to a mootools Element)

FIXME: Hide them from the global namespace
*/
var $ = document.id;
	//$E = document.getElement.bind(document),
	//$getText = function(el){  return el.innerText || el.textContent || ''; };

if(typeof(console) === 'undefined'){
    var console = {}
    console.log = /*console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = */ function(){};
}


/*
Global: mootools-extensions
*/
String.implement({

	/* fix mootools implementation
	   supporting i18n chars such as éàè...
	*/
    capitalize: function(){
        return this.replace(/(\s|^)\S/g, function(match){
            return match.toUpperCase();
        });
    },

	/*
	Function: deCamelize
		Convert camelCase string to space-separated set of words.

	Example:
	> "CamelCase".deCamelize(); //returns "Camel Case"
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
	> "this is a long string".trunc(7); //returns "this is..."
	> "this is a long string".trunc(7,'__'); //returns "this is__"
	*/
	trunc: function (size, elips) {
		return this.slice(0, size-1) + ((this.length<size) ? '' : (elips||'…'));
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
with small updates (jspwiki)

provides:
- Array.rendAr

requires:
- core/1.3.0:Element
- core/1.3.0:Elements
- core/1.3.0:Array

...
*/
/*
Example:
	//this.modal = null;
	this.element = [
		'div.some-div', [
			'div.another-div',
			'div.modal', {attach:[this,'modal'], events:{click:clickHdl}},
			'div.done'
		]
	].rendAr();

	this.modal.hide();

*/
Element.Properties.attach = {
	set: function(object) {
		//console.log(object);
		object[0][ object[1]||'element' ] = this;
		/*
		var keys = (object[1]||'element').split('.'),key;
		object = object[0];
		while( object && (key = keys.shift() )){
			object = ( key in object ? object[key] : undefined );
		};
		if(object){ object = this; }
		*/
		//this.store('attach', object);
	}
};
Array.implement({

	rendAr: function() {
		var elements = [],type;
		this.each( function(item){
			type = typeOf(item);
			//console.log(type, item);
			if (type == 'element')  elements.push(item);
			else if (type == 'string')   elements.push(new Element(item));
			else if (type == 'object')   elements.getLast().set(item);
			else if (type == 'array')    elements.getLast().adopt(item.rendAr());
			else if (type == 'elements') elements.append(item);
         });
      return elements[1] ? new Elements(elements) : elements[0];
   }

});


Element.implement({

	/*
	Function: ifClass
		Convenience function.
		Add or remove a css class from an element depending on a conditional flag.

	Arguments:
		flag : (boolean)
		trueClass : (string) css class name, add on true, remove on false
		falseClass : (string) css class name, remove on true, add on false

	Returns:
		(element) - This Element

	Examples:
	>	$('page').ifClass( i>5, 'hideMe' );
	*/
	ifClass : function(flag, trueClass, falseClass){

		if(trueClass)  this[(flag ? 'add':'remove')+'Class'](trueClass);
		if(falseClass) this[(flag ? 'remove':'add')+'Class'](falseClass);
		return this;

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
	>	$('thisElement').addHover();
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

		var element = this,
			parent = element.getParent(parent);

		if(parent){
	 		element.store("$hoverP",parent).set('visibility','visible').fade('hide'); //checkme

 			parent.addEvents({
				mouseenter: function(){ element.fade(0) },
				mouseleave: function(){
				  	element.hoverUpdate();
				  	element.fade(0.9);
				}
			});
		}
		return element;

	},

	/*
	Function: hoverUpdate
		Reposition the menu
	*/
	updateHover: function(){

//check -- is this needed ?  should be done automatically by css
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

				if(	!'radio|hidden|text|password'.test(type) ){ break; }

			case 'textarea':

				return self.defaultValue;

			default: return false;

		}

	}

});


