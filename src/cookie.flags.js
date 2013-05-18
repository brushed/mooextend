/*
Class: Cookie.Flags
	Descendent of the mootools Cookie class.
	It stores the True/False state of a set of dom-elements in a cookie.

Example:
> todo
>	var cookie = new Cookie.Flags( 'mycookie_name', {duration:20});
>
>	default_state = false;
>	state = cookie.get(item, default_state); //add item to the cookie-repo ?? checkme...
>
>	cookie.write(item, true);


*/
Cookie.Flags = new Class({
	Extends: Cookie,

	initialize: function(key,options){
		var self = this;
		self.flags = '';
		self.elements = [];
		self.parent(key,options);
		self.pims = self.read();
		//console.log(this.key, 'pims:',this.pims);
	},

	write: function(element, bool){
		var self = this,
			flags = self.flags,
			index = self.elements.indexOf(element);

		if(index >= 0){
			flags = flags.slice(0,index) + (bool?'T':'F') + flags.slice(index+1);
			self.parent(flags); //write cookie
		}
		//console.log("Cookie.Flags.write", flags, index, bool);
	},

	get: function(element, bool){
		var self = this,
			cookie = self.pims,
			index = self.flags.length;

		if( cookie && (index < cookie.length) ){
			bool = (cookie.charAt(index)=='T');
		}
		self.flags += (bool?'T':'F');
		self.elements.push(element);
		//console.log("Cookie.Flags.get", cookie, index, this.flags)
		return bool;
	}
});


