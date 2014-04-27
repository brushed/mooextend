/*
Function: toISOString
    Return the current date in ISO8601 format 'yyyy-mm-dd'.
    (ref. EcmaScript 5)

Example:
> alert( new Date().toISOString() ); // alerts 2009-05-21
> alert( new Date().toISOString() ); // alerts 2009-05-21T16:06:05.000TZ
*/
Date.extend({
    toISOString: function(){
        var d = this,
            dd = d.getDate(),
            mm = d.getMonth()+1;

        return d.getFullYear() + '-' + (mm<10 ?'0':'') + mm + '-' + (dd<10 ?'0':'') + dd;
    }
});
