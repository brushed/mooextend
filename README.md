mooextend
=========

Alpha - work in progress / use at your own risk

Some extensions for native data-types in mootools:

- Array.Extend
	- rendAr() : based on https://github.com/Mr5o1/rendAr
	- min() : return minimum value of an array of numbers
	- max() : return maximum value of an array of numbers

- Array.NaturalSort(column) : support natural sorting on one- and two-dimensional arrays.
    Sorts the elements of an array, using a more 'natural' algoritm.
    Keep a cache of the prepared sortable values.

    Example:

        [0, 1, "017", 6, , 21 ].naturalSort();  //[0, 1, 6, "017", 21]

        [[6,"chap 1-14"],["05","chap 1-4"]].naturalSort(1); //[["05","chap 1-4"],[6,"chap 1-14"]]


- Autofocus : mimimc html5 autofocus functionality


- Element.Extend
	- ifClass(condition, trueClass, falseClass) : add/remove css classes based on a condition
	- addHover(clazz): provide support for :hover effects on all elements, also in IE.
	- onHover(parent) : create hoverable dropdown menu
	- getDefaultValue(): get default value of a form element
    - observe(callback, options) : delayed on-change event for input/textarea elements

- Element.Placeholder : fallback support for html5 placeholder attribute


- Behavior : support css behaviors, based on mootools 2.0

- Localize : tiny localization routines (built for jspwiki)

- String.Extend
	- capitalize() : fix mootools implementation supporting i18n chars such as éàè..
	- deCamelize() : convert camelCase string to space-separated set of words
	- trunc(size, ellipse) : convert string to a maximum length
	- xsubs(object,regexp) : same as substitute() with support for anonymous arguments
	- sliceArgs(args, regexp): parse the arguments of a string or an element's class-name.

