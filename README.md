mooextend
=========

Some extentions for native data-types in mootools:
- String
	- capitalize() : fix mootools implementation supporting i18n chars such as éàè..
	- deCamelize() : convert camelCase string to space-separated set of words
	- trunc(size, elips) : convert string to a maximum length
	- xsubs(object,regexp) : same as substitute() with support for anonymous arguments
	- sliceArgs(args, regexp): parse the arguments of a string or an element's class-name.

- Array
	- rendArr() : based on https://github.com/Mr5o1/rendAr
	- min() : return minimum value of an array of numbers
	- max() : return maximum value of an array of numbers

- Element
	- ifClass(condition, trueClass, falseClass) : add/remove css classes based on a condition
	- addHover(clazz): provide support for :hover effects on all elements, also in IE.
	- onHover(parent) : convert an element into a hover menu
	- hoverUpdate() : reposition hover menu with its parent (fixme)
	- getDefaultValue(): get default value of a form element

Other supporting classes
- Observer : delayed on-change event for input/textarea elements
- Placeholder : fallback support for html5 placeholder attribute
- Behavior : support css behaviors, based on mootools 2.0
- Localize : tiny localization routines (built for jspwiki)


