var EI = EI || {};

EI.toggleNav = function(trigger){
  var $trigger = $(trigger),
      $aboutus = $('#aboutus');

  $trigger.click(function(e) {
    var $div = $(this).next('div');
    $div.not($aboutus).width($(window).width());
    $div.slideToggle();

    $(this).parents('li').siblings().find('div').slideUp();
    return false;
  });

  $(window).bind('resize', function() {
    $trigger.next('div').not($aboutus).width($(window).width());
  });

};

$(function(){
	EI.toggleNav("#mainNav > ul > li > a");
});

