/*
Dynamic Style: Tips
    Add Tip behavior to a set of DOM Elements

Bootstrap
(start code)
    //tip anchors
    <element> Caption
        <body> ...body... </body>
    </element>        

    //layout of the tip, with absolute position
    div.tooltip(.active)(.top|.left|.right|.bottom)
        div.tooltip-inner
            <body> ... </body>                        
        div.tooltip-arrow
(end)
*/
var Tips = function Tips(elements,options){

        var tt = 'div.tooltip',
            TheTip = [tt,[tt+'-inner'/*,tt+'-arrow'*/]].slick().inject(document.body),
            inner = TheTip.getFirst();

        $$(elements).addEvents({

        	mousemove: function(e){
		        TheTip.setStyles({ top:e.page.y +10, left:e.page.x + 10 });
        	},

        	mouseenter: function(e){
		        inner.adopt( this.getFirst() ) ;
	    	    TheTip.addClass('in'); //.fade('in');
    	    },
			
        	mouseleave: function(e){
		        TheTip.removeClass('in'); //.fade('out');
        	    this.adopt( inner.getFirst() );
        	}
        });
}


