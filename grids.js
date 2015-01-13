(function($) {

  /**
   * Set all elements within the collection to have the same height.
   */
  $.fn.equalHeight = function(){
    var heights = [],equalHeight;
    $.each(this, function(i, element){
      var $element = $(element), element_height,
      // Should we include the elements padding in it's height?
      includePadding = ($element.css('box-sizing') == 'border-box') || ($element.css('-moz-box-sizing') == 'border-box');
      if (includePadding) {
        element_height = $element.innerHeight();
      } else {
        element_height = $element.height();
      }
      this.originalHeight = element_height;
      heights.push(element_height);
    });
    equalHeight = Math.max.apply(window, heights);
    this.css('height',  equalHeight + 'px');
    $.each(this, function(){
      this.equalHeight = equalHeight;
    });
    return this;
  };

  /**
   * Create a grid of equal height elements.
   */
  $.fn.equalHeightGrid = function(columns){
    var $tiles = this;
    $tiles.css('height', 'auto');
    for (var i = 0; i < $tiles.length; i++) {
      if (i % columns === 0) {
        var row = $($tiles[i]);
        for(var n = 1;n < columns;n++){
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
    var offset = 0, cols = 0;
    this.each(function(i, elem) {
      var elem_offset = $(elem).offset().top;
      if (offset === 0 || elem_offset == offset) {
        cols++;
        offset = elem_offset;
      } else {
        return false;
      }
    });
    return cols;
  };

  /**
   * Ensure equal heights now, on ready, load and resize.
   */
  $.fn.responsiveEqualHeightGrid = function() {
    function syncHeights() {
      var cols = this.detectGridColumns(),currentHeights = [];
      
      $(this).each(function(i){
        currentHeights[i] = this.equalHeight;
      });
      this.equalHeightGrid(cols);
      $(this).each(function(i){
          if(currentHeights[i]!=this.equalHeight){
            $(this).trigger('heightResize',[this.equalHeight,this.originalHeight]);
          }
      });
    }
    $(window).bind('resize load', $.proxy(syncHeights,this));
    $.proxy(syncHeights,this);
    return this;
  };

})(jQuery);
