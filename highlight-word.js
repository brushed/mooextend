/*
Class: HighlightWord
	Highlight any word or phrase of a previously search query.
	The query can be passed in as a parameter or will be read
	from the documents referrer url.

Credit:
	Inspired by http://www.kryogenix.org/code/browser/searchhi/

History:
	- Modified 21006 to fix query string parsing and add case insensitivity
	- Modified 20030227 by sgala@hisitech.com to skip words
	  with "-" and cut %2B (+) preceding pages
	- Refactored for JSPWiki -- now based on regexp

*/
function HighlightWord( node, query ){

	var highlight = "<span class='highlight'>$1</span>",
		words,

		//recursive node processing function
		walkDomTree = function(node, matchWord ){

		if( node ){

			//process all children
			for( var nn=null, n = node.firstChild; n ; n = nn ){
				// prefetch nextSibling cause the tree will be modified
				nn = n. nextSibling;
				walkDomTree(n, matchWord);
			}

			// continue on text-nodes, not yet highlighted
			if( node.nodeType == 3 ){

				var s = $getText( node ),tmp,f;

				s = s.replace(/</g,'&lt;'); // pre text elements may contain <xml> element

				if( matchWord.test( s ) ){

					tmp = new Element('span',{
							html: s.replace( matchWord, highlight)
						});

					f = document.createDocumentFragment();
					while( tmp.firstChild ) f.appendChild( tmp.firstChild );

					node.parentNode.replaceChild( f, node );

					tmp.dispose(); //avoid dom-leaks
				}
			}
		}
	};

	if( !query && document.referrer.test("(?:\\?|&)(?:q|query)=([^&]*)","g") ){ query = RegExp.$1; }

	if( query ){

		words = decodeURIComponent(query)
					.stripScripts() //xss vulnerability
					.replace( /\+/g, " " )
					.replace( /\s+-\S+/g, "" )
					.replace( /([\(\[\{\\\^\$\|\)\?\*\.\+])/g, "\\$1" ) //escape metachars
					.trim().split(/\s+/).join("|");

		walkDomTree( node , RegExp( "(" + words + ")" , "gi") );

	}

};
