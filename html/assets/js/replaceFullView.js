var EI = EI || {};

EI.replaceFullView = function(el) {
	// delegate click event to el
	$('body').on('click', el, function(){
		var src = $(this).attr('href');
		var $loading = $('#pageLoading');
		var $mainSection = $('#main');

		$loading.show();

		$img = $('<img />');
		$img.attr('src', src).addClass('fullView');

		$img.load(function(){
			$loading.hide();
			$mainSection.prepend($img);
			$img.next().fadeOut(1000, function() {
				$(this).remove();
			});
		});
		return false;
	});
};

$(function(){
	EI.replaceFullView('#previewThumb a');
});
