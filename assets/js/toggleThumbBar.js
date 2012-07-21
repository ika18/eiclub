var EI = EI || {};

EI.toggleThumbBar = function(trigger, bar){
	var $trigger = $(trigger);
	var $thumbBar = $(bar);
	$trigger.click(function() {
		$thumbBar.slideToggle();
		$(this).parent().toggleClass('expand');
		return false;
	});
};

$(function(){
	EI.toggleThumbBar("#thumbTrigger a", "#previewThumb");
});
