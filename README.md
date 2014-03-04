mooextend
=========

Alpha - work in progress / use at your own risk

Some extensions for native data-types in mootools:

- Accesskey : style DOM elements with 'accesskey' property

- Array.Extend
	- slick() : convert an array of css-selectors into set of DOM elements. 
	    (mini template engine) Based on the mootools Slick engine. (see https://github.com/Mr5o1/rendAr)
    - scale(scale) : scale all values of a (number) array (default scale 0..1)
	- min() : return minimum value of an array of numbers
	- max() : return maximum value of an array of numbers
	- rgb2hsv : convert RGB values into HSV values
	- hsv2rgb : Convert HSV values into RGB values

- Array.NaturalSort(column) : support natural sorting on one- and two-dimensional arrays.
    Sorts the elements of an array, using a more 'natural' algoritm.
    Keep a cache of the prepared sortable values.

    Example:

        [0, 1, "017", 6, , 21 ].naturalSort();  //[0, 1, 6, "017", 21]

        [[6,"chap 1-14"],["05","chap 1-4"]].naturalSort(1); //[["05","chap 1-4"],[6,"chap 1-14"]]


- Autofocus : mimic html5 autofocus functionality

- Behavior : flexible extension of DOM elements with variour behaviour, based on css-selectors
    - add(selector, behavior, options,once) : add behavior, which is invoked for each matching element 
    - once(selector, behavior, options) : add behavior, which is invoked once with an array of all matching elements
    - update() : invoke all behaviours

- Color : Class for creating and manipulating colors in JavaScript.
    This is a minimized variant of the Color class, based Mootools.More.
    It adds supports for html color names. 

- Cookie.Flags : Extension of the mootools Cookie class. It stores the True/False state of a set of dom-elements in a cookie.

- Date.Extend:
  - toISOString: convert Date to the ISO8601 format 'yyyy-mm-dd'

- Element.Extend
	- ifClass(condition, trueClass, falseClass) : add/remove css classes based on a condition
	- addHover(clazz): provide support for :hover effects on all elements, also in IE.
	- onHover(parent) : create hoverable dropdown menu
	- onToggle(toggle,active): Set/reset '.active' class, based on 'data-toggle' attribute
	- getDefaultValue(): get default value of a form element
	- groupChildren(start, grab, replaceFn): wraps lists of children, which are delimited by certain DOM elements.
    - observe(callback, options) : delayed on-change event for input/textarea elements
	- wrapChildren(delimiter,wrapper): wrap a lists of children, delimited by a certain DOM element

- Element.Placeholder : fallback support for html5 placeholder attribute

- Form.File, Form.MultipleFile, Request.File :
    Creates support for a multiple file upload form, based on styles from Bootstrap.
    Based on https://github.com/arian/mootools-form-upload

- HighlightQuery : highlight any word or phrase of a previously search query.

- String.Extend
	- capitalize() : fix mootools implementation supporting i18n chars such as éàè..
	- deCamelize() : convert camelCase string to space-separated set of words
	- trunc(size, ellipse) : convert string to a maximum length
    - localize : tiny localization routines (built for jspwiki)
	- xsubs(object,regexp) : same as substitute() with support for anonymous arguments
	- slick() : convert CSS-selector into a DOM element. (mini template engine)
	    Based on the mootools Slick engine. 
	- sliceArgs(args, regexp): parse the arguments of a string or an element's class-name.
    - fetchContext: retrieve bootstrap state/context from an element's classname


- Tips : add a Tip behavior to a set of DOM Elements, styling is based on bootstrap

- Textarea : extend the HTML Textarea element with many text selection features
    - toElement : return the DOM textarea element.
    - getValue: return the value (text content) of the textarea.
    - slice: mimics the string slice function on the value (text content) of the textarea.
    - getFromStart: return the first not selected part of the textarea, till the start of the selection.
    - getTillEnd: return the last not selected part of the textarea, starting from the end of the selection.
    - getSelection: return the selected text as a string
    - setSelectionRange(start,end): select the selection range of the textarea from start to end
    - getSelectionRange: returns an object describing the textarea selection range.
    - setSelection: replaces the selection with a new value (concatenation of arguments).
        On return, the selection is set to the replaced text string.
    - insertAfter: insert the arguments after the selection, and puts caret after inserted value
    - isCaretAtStartOfLine: return boolean indicating whether caret is at the start of a line.
    - getCoordinates: returns the absolute coordinates (px) of the character 
        at a certain offset in the textarea. Default returns pixel coordinates of the selection.  

