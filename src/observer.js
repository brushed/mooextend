/*
Class: Observer
	Class to observe a dom element for changes.

Example:
>	$(formInput).observe(function(){
>		alert('my value changed to '+this.get('value') );
>	});

*/
var Observer = new Class({

	Implements: Options,

	options: {
		event: 'keyup',
		delay: 300
	},
	initialize: function(el, fn, options){
		var self = this;
		options = self.setOptions(options).options;
		self.element = el = $(el);
		self.callback = fn;
		self.timeout = null;
		self.listener = self.fired.bind(self);
		self.value = el.get('value');
		el.set({autocomplete:'off'}).addEvent(options.event, self.listener);
	},
	fired: function(){
		var self = this,
			el = self.element,
			value = el.value;

		if( self.value != value ){
			self.clear();
			self.value = value;
			self.timeout = self.callback.delay(self.options.delay, null, [el]);
		}
	},
	clear: function(){
		clearTimeout(this.timeout);
	},
	stop: function(){
		var self = this;
		self.element.removeEvent(self.options.event, self.listener);
		self.clear();
	}
});

Element.implement({
	observe: function(fn, options){
		return new Observer(this, fn, options);
	}
});
