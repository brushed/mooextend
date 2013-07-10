// list of files to load
// one after the other one
!function loadListOfScripts(document,list){

  // used when script is loaded
  function onload() {
    // if there is still one source
    if (src = list.shift()) {
      // append the script
      script = document.body.appendChild(
        document.createElement("SCRIPT")
      );
      // set the onload event via DOM Level 0
      script.onload = onload;
      // set the source
      script.src = src;
    }
  }

var
    // script DOM node
    script,
    // script source string
    src;

  // start adding scripts
  onload();

}(document,[
      'file1.js',
      'file2.js',
      'fileN.js'
]);


/*
!function(a,b){function c(){if(e=b.shift())d=a.body.appendChild(a.createElement("SCRIPT")),d.onload=c,d.src=e}var d,e;c()}(document,["file1.js","file2.js","fileN.js"]);

!function(a){function b(){if(e=c.shift())d=a.body.appendChild(a.createElement("SCRIPT")),d.onload=b,d.src=e}var c=["file1.js","file2.js","fileN.js"],d,e;b()}(document);

!function(b){function c(){if(d=e.shift())a=b.body.appendChild(b.createElement("SCRIPT")),a.onload=c,a.src=d}var e=['file1.js','file2.js','fileN.js'],a,d;c()}(document);
*/

/*
Ref. http://www.html5rocks.com/en/tutorials/speed/script-loading/

<link rel="subresource" href="//other-domain.com/1.js">
<link rel="subresource" href="2.js">

[
  '//other-domain.com/1.js',
  '2.js'
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});

*/

/*
var scripts = [
  '1.js',
  '2.js'
];
var src;
var script;
var pendingScripts = [];
var firstScript = document.scripts[0];

// Watch scripts load in IE
function stateChange() {
  // Execute as many scripts in order as we can
  var pendingScript;
  while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
    pendingScript = pendingScripts.shift();
    // avoid future loading events from this script (eg, if src changes)
    pendingScript.onreadystatechange = null;
    // can't just appendChild, old IE bug if element isn't closed
    firstScript.parentNode.insertBefore(pendingScript, firstScript);
  }
}

// loop through our script urls
while (src = scripts.shift()) {
  if ('async' in firstScript) { // modern browsers
    script = document.createElement('script');
    script.async = false;
    script.src = src;
    document.head.appendChild(script);
  }
  else if (firstScript.readyState) { // IE<10
    // create a script and add it to our todo pile
    script = document.createElement('script');
    pendingScripts.push(script);
    // listen for state changes
    script.onreadystatechange = stateChange;
    // must set src AFTER adding onreadystatechange listener
    // else we’ll miss the loaded event for cached scripts
    script.src = src;
  }
  else { // fall back to defer
    document.write('<script src="' + src + '" defer></'+'script>');
  }
}*/
!function(e,t,r){function n(){for(;d[0]&&"loaded"==d[0][f];)c=d.shift(),c[o]=!i.parentNode.insertBefore(c,i)}for(var s,a,c,d=[],i=e.scripts[0],o="onreadystatechange",f="readyState";s=r.shift();)a=e.createElement(t),"async"in i?(a.async=!1,e.head.appendChild(a)):i[f]?(d.push(a),a[o]=n):e.write("<"+t+' src="'+s+'" defer></'+t+">"),a.src=s}(document,"script",[
  "//other-domain.com/1.js",
  "2.js"
])
