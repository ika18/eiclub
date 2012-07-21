var EI = EI || {};

EI.mouseWheelOnThumb = function(el) {
    var $container = $(el),
        $ul = $container.children('ul'),
        ulPadding = 15;


    $container.mousemove(function(e){
      var divWidth = $container.width();
      var lastLi = $ul.find('li:last-child');
      
      var ulWidth = lastLi[0].offsetLeft + lastLi.outerWidth() + ulPadding;

      var left = (e.pageX - $container.offset().left) * (ulWidth-divWidth) / divWidth;
      $container.scrollLeft(left);
    });
};

$(function(){ 
	EI.mouseWheelOnThumb('#previewThumb');

  $('#mainNav ul div').not($('#aboutus')).each(function() {
    EI.mouseWheelOnThumb(this);
  });
});

