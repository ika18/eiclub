(function ($) {

	"use strict"

	/*DndUpload Class definition*/
	var DndUpload = function (content, options) {
		this.options = options;
		this.$element = $(content);
		this.setup();
	};

	DndUpload.files = [];
	DndUpload.attrName = 'prev-thumb';

	DndUpload.prototype = {
		constructor: DndUpload,
		setup: function () {
			var that = this;
			this.$element.bind('dragenter dragover dragleave', function (e) {
				var type = e.type;
				e.stopPropagation();
                e.preventDefault();

                that.onDrag(type);

                // bind custom handlers
                if (type === 'dragover') {
                	typeof that.options.onDragOver == 'function' ? that.options.onDragOver() : '';
                }
                if (type === 'dragenter') {
                	typeof that.options.onDragEnter == 'function' ? that.options.onDragEnter() : '';
                }
                if (type === 'dragleave') {
                	typeof that.options.onDragLeave == 'function' ? that.options.onDragLeave() : '';
                }
            })
            .bind('drop', function (e) {
                e.stopPropagation();
                e.preventDefault();
                that.onDrag(e.type);
                that.onDrop(e);
            });

            $(this.options.uploadBtn).bind('click', {context: that}, this.onUpload);

            this.clickAbandon();
		},
		onDrag: function (type) {
			if (type === 'dragover') {
				this.$element.addClass('hover');
			} else if (type === 'dragleave' || type === 'drop') {
				this.$element.removeClass('hover');
			}
		},
		onDrop: function (e) {
			var that = this,
			$previewArea = $(that.options.previewArea),
			fileList = e.originalEvent.dataTransfer.files;
			
			// clear all images that was uploaded previously
			$previewArea.html('');
			DndUpload.files = [];

			if (fileList.length > 0 && typeof this.options.onDrop === 'function') {
				this.options.onDrop();
			}
			$.each(fileList, function (index, file) {
				if (file.type.indexOf('image') <= -1) {
	                return;
	            }
	            var fileReader = new FileReader();
	            fileReader.onload = (function (file) {
	                return function (e) {
						var $template = $($(that.options.previewTemplate).clone().html()),
						rname = file.fileName.substring(0, file.fileName.indexOf('.'));
						file.rname = rname;
						$template.find('img').attr({
							'src': this.result,
							'data-name': file.name
						})
						.end().find('label').attr('for', DndUpload.attrName + index)
						.end().find('input[type="text"]').attr({
							placeholder: rname,
							id: DndUpload.attrName + index,
							name: DndUpload.attrName + index
						})
						.bind('change', {file: file}, changeName)
						.end().find('a').bind('click', removeThumb);
						$previewArea.append($template);
						
	                };
	            })(file);
	            fileReader.readAsDataURL(file);

	            DndUpload.files.push(file);
			});
		},

		onUpload: function (e) {
			var max = DndUpload.files.length,
			album = $('#album').val();
			if (!album) {
				alert("You don't select any album to add");
				return;
			}
			if (DndUpload.files.length <= 0) {
				alert("There is no any photo ready to upload");
				return;
			}
			$.each(DndUpload.files, function (index, file) {
				var xhr = new XMLHttpRequest();
		        xhr.open('POST', e.data.context.options.url, true);
		        xhr.setRequestHeader("X_FILENAME", file.name);
		        xhr.setRequestHeader("X_NAME", file.rname);
		        xhr.setRequestHeader("X_ALBUM", file.album);
		        xhr.send(file);

		        xhr.onload = function(e) { 
		            /* If we got an error display it. */
		            if (xhr.responseText) {
		                var data = $.parseJSON(xhr.responseText);
		                if (data.status === "success") {
		                	max--;
		                } else if (data.status === "fail") {
		                	alert('Error');
		                }
		            }
		            
		            if (max <= 0) {
		            	uploadComplete();
		            }
		        };
			});
		},
		clickAbandon: function () {
			var that = this;
			$('#uploadModal .btn').not(this.options.uploadBtn).bind('click', function () {
	        	that.closeModal();
	        });
		},
		closeModal: function () {
			$('.modal .close').trigger('click');
		}
	};
	/*Private methods*/
	var removeThumb = function (e) {
		var $root = $(e.target).parents('li'),
		fileName = $root.find('img').attr('data-name');
		DndUpload.files = $.grep(DndUpload.files, function (file, index) {
			return file.name != fileName;
		});
		$root.remove();
		return false;
	};

	var changeName = function (e) {
		if ($.trim($(this).val()) !== '') {
			e.data.file.rname = $(this).val();
		} else {
			e.data.file.rname = $(this).attr('placeholder');
		}
	};

	var uploadComplete = function () {
		alert('Upload success!');
		DndUpload.prototype.closeModal();
	};


	$.fn.dndUpload = function (option) {
		return this.each(function () {
			var $this = $(this),
			data = $this.data('dndUpload'),
			options = $.extend({}, $.fn.dndUpload.defaults, $this.data(), typeof option == 'object' && option);

			new DndUpload(this, options)
		});
	};

	$.fn.dndUpload.defaults = {
		onDragEnter: '',
		onDragOver: '',
		onDragLeave: '',
		onDrop: '',
		url: 'upload.php',
		previewArea: '',
		previewTemplate: '',
		uploadBtn: ''
	};

})(window.jQuery);
