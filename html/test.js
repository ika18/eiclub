$(function () {
	var $drag = $('#drag');

	$drag.bind('dragstart', function () {
		console.log('drag');
	});

	// $drag[0].addEventListener('dragstart', function () {
	// 	console.log('dragstart');
	// }, false);
})