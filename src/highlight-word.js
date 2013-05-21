/*
Class: HighlightWord
    Highlight any word or phrase of a previously search query.
    The query can be passed in as a parameter or will be read
    from the documents referrer url.

Credit:
    Inspired by http://www.kryogenix.org/code/browser/searchhi/
    Refactored for JSPWiki -- now based on regexp's.

Arguments
    node - (DOM-element)
    query - (optional) query string, default is document referrer query string
    highlight - (string) html template replacement string, default <span class='highlight'>$1</span>
*/
function HighlightWord( node, query, highlight ){

    var words,

        //recursive node processing function
        walk = function(node, regexp){

        if( node ){

            //process all children
            for( var nn=null, n = node.firstChild; n ; n = nn ){
                // prefetch nextSibling cause the tree will be modified
                nn = n. nextSibling;
                walk(n, matchWord);
            }

            // continue on text-nodes, not yet highlighted
            if( node.nodeType == 3 ){

                var s = node.innerText || node.textContent || '',
                    tmp,
                    frag;

                s = s.replace(/</g,'&lt;'); // pre text elements may contain <xml> element

                if( regexp.test( s ) ){

                    tmp = new Element('span',{
                        html: s.replace(regexp, highlight || "<span class='highlight'>$1</span>")
                    });

                    frag = document.createDocumentFragment();
                    while( tmp.firstChild ) frag.appendChild( tmp.firstChild );

                    node.parentNode.replaceChild( frag, node );

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
                    //.trim().split(/\s+/).join("|");
                    .trim().replace(/\s+/g,'|');

        walk( node , RegExp( "(" + words + ")" , "gi") );

    }

};
