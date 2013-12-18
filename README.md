A simple jQuery plugin to allow users to create equal height containers and grids using JavaScript where CSS2 cannot.

Usage
-----

```
$('.group-of-elements').equalHeight();
```

Or if you could like the heights to be evaluated on a row-by-row basis.

```
$('.group-of-elements').equalHeightGrid(n); // Where n is the number of columns.
```

If you have a responsive layout and need to detect how many columns exist in your layout you can use the following:

```
var $elements = $('.group-of-elements');
var columns = $elements.detectGridColumns();
$elements.equalHeightGrid(columns);
```

If you would like to keep the grids in sync on document ready, window load and resize, you can use the following as a shortcut to the above:

```
$('.group-of-elements').responsiveEqualHeightGrid();
```

If you would like to run the above code as you enter and exit breakpoints (as opposed to simply binding to window.resize) you can use <a href="https://github.com/ten1seven/jRespond">jRespond</a> and manually manage when "equalHeightGrid" is called.

Demo
----

You can see a demo in action <a href="http://sam152.github.io/Javascript-Grids/demo.html">here</a>.