/*
Class: Placeholder
	Backwards compatible handling of the html5 'placeholder' attribute.

Example:
	<input name="search" placeholder="Search..." />

*/

var Placeholder = ('placeholder' in document.createElement('input')) ? function(){} : new Class({

	initialize: function(element, options){

		options = this.setOptions(options).options;

		var span = new Element('span.placeholder[role=display]',{
			text:element.placeholder,
			styles:{
				top: element.offsetTop,
				left: element.offsetLeft
		}});

		element.addEvents({
			focus: function(){ span.hide(); },
			blur: function(){ if (!element.value && !element.innerHTML){ span.show(); } }
		});

		element.offsetParent.appendChild(span);

	}
});