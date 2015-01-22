(function($) {
  'use strict';

    /**
     * Set all elements within the collection to have the same height.
     */
    $.fn.equalHeight = function() {
        var heights = [];
        $.each(this, function(i, element) {
            var $element = $(element);
            var elementHeight;
            // Should we include the elements padding in it's height?
            var includePadding = ($element.css('box-sizing') === 'border-box') || ($element.css('-moz-box-sizing') === 'border-box');
            if (includePadding) {
                elementHeight = $element.innerHeight();
            } else {
                elementHeight = $element.height();
            }
            heights.push(elementHeight);
        });
        this.css('height', Math.max.apply(window, heights) + 'px');
        return this;
    };

    /**
     * Create a grid of equal height elements.
     */
    $.fn.equalHeightGrid = function(columns) {
        var $tiles = this;
        $tiles.css('height', 'auto');
        for (var i = 0; i < $tiles.length; i++) {
            if (i % columns === 0) {
                var row = $($tiles[i]);
                for (var n = 1; n < columns; n++) {
                    row = row.add($tiles[i + n]);
                }
                row.equalHeight();
            }
        }
        return this;
    };

    /**
     * Detect how many columns there are in a given layout.
     */
    $.fn.detectGridColumns = function() {
        var offset = 0,
            cols = 0;
        this.each(function(i, elem) {
            var elemOffset = $(elem).offset().top;
            if (offset === 0 || elemOffset === offset) {
                cols++;
                offset = elemOffset;
            } else {
                return false;
            }
        });
        return cols;
    };

    /**
     * Ensure equal heights now, on ready, load and resize.
     */
    $.fn.responsiveEqualHeightGrid = function(callback) {
        var _this = this;

        function syncHeights() {
            var cols = _this.detectGridColumns();
            _this.equalHeightGrid(cols);
        }
        $(window).bind('resize load', syncHeights);
        syncHeights();
	callback();
        return this;
    };

})(window.jQuery);
