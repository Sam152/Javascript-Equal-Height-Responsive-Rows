(function($) {

  /**
   * Set all elements within the collection to have the same height.
   */
  $.fn.equalHeight = function(){
    var heights = [];
    $.each(this, function(i, element){
      $element = $(element);
      var element_height;
      // Should we include the elements padding in it's height?
      var includePadding = $element.css('box-sizing') == 'border-box';
      if (includePadding) {
        element_height = $element.innerHeight();
      } else {
        element_height = $element.height();
      }
      heights.push(element_height);
    });
    this.height(Math.max.apply(window, heights));
    return this;
  }

  /**
   * Create a grid of equal height elements.
   */
  $.fn.equalHeightGrid = function(columns){
    var $tiles = this;
    for (var i = 0; i < $tiles.length; i++) {
      if (i % columns == 0) {
        var row = $($tiles[i]);
        for(var n = 1;n < columns;n++){
          row = row.add($tiles[i + n]);
        }
        row.equalHeight();
      }
    }
    return this;
  };

})(jQuery);