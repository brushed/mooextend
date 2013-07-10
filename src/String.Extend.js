/*
Moo-extend: String-extensions
    String : capitalize,() deCamelize(), trunc(), xsubs()
*/
String.implement({

    /* fix mootools implementation , supporting i18n chars such as éàè... */
    capitalize: function(){
        return this.replace(/(\s|^)\S/g, function(match){
            return match.toUpperCase();
        });
    },

    /*
    Function: deCamelize
        Convert camelCase string to space-separated set of words.

    Example:
    >    "CamelCase".deCamelize() === "Camel Case";
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
    > "this is a long string".trunc(7) === "this is..."
    > "this is a long string".trunc(7,'__') === "this is__"
    */
    trunc: function (size, elips){
        return this.slice(0, size-1) + ((this.length<size) ? '' : (elips||'…'));
    },

    /*
    Function: xsubs (extended Substitute)
        Equal to substitute(), but with support for anonymous arguments.

        Named arguments:
        >    "Hello {text}".xsubs({text:"world"}) ==>  "Hello world"
        Anonymous arguments:
        >    "Hello {0}{1}".xsubs("world", "!") ===  "Hello world!"
    */
    xsubs: function(object, regexp){

        if( typeOf(object) != 'object' ){
            object = Array.from(arguments);
            regexp = null;
        }
        return this.substitute(object, regexp);
    },

    /*
    Function: sliceArgs
        Parse the arguments of a string or an element's class-name.
        Command pattern: <prefix>(-arg1)(-arg2)...
        Returns an array of arguments.
        > <command>.sliceArgs( args-string | element-with-classname );

    Arguments:
        object : (string) or (dom-element)
        regexp : (string) pattern match for the arguments

    Example
        > "zebra".sliceArgs( "zebra-eee-ffa" ); //returns ['eee','ffa']
        > "zebra".sliceArgs( "horse" );  //returns []

    */
    sliceArgs: function(args, regexp){

        if( args.grab /*isElement*/ ) args = args.className;

        if( !regexp) regexp = "(?:-\\w+)*"; //default '-' separated arguments

        return ( args.match( RegExp(this+regexp) )||[''] )[0].split('-').slice(1);

    }

});