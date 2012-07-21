$(function () {
	// define modal behavior
	$('#uploadModal').modal({
		backdrop: 'static',
		keyboard: false,
		show: false
	});

	var $dropArea = $('.dropArea'),
	$btn = $('.dropArea a[data-toggle="modal"]'),
	url = $('#uploadModal').find('form').attr('action');

	$dropArea.dndUpload({
		onDrop: function () {
			$btn.trigger('click');
		},
		previewArea: '#uploadModal .thumbnails',
		previewTemplate: '#thumbnail-template',
		uploadBtn: '#uploadBtn',
		url: url
	});
})