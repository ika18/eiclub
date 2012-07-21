var ddUpload = ddUpload || {};
        
(function(){
    var $dropListing,
        $dropArea,
        fileInput = document.createElement("input"),
        $body,
        $result,
        fileReader;
    
    ddUpload.setup = function () {
        $body = $('body');
        $dropListing = $('#output-listing01');
        $dropArea = $('#drop');
        $result = $('#result');

        if(typeof window["FileReader"] === "function") {
            // File API support
            $dropArea.bind('dragenter dragover dragleave', function (e) {
                e.stopPropagation();
                e.preventDefault();
                ddUpload.dragHover(e);
            })
            .bind('drop', function (e) {
                e.stopPropagation();
                e.preventDefault();
                ddUpload.dropHandler(e);
            });
        } 
    };

    ddUpload.dragHover = function (e) {
        if (e.type === "dragover") {
            $dropArea.addClass('hover');
        } else if (e.type === 'dragleave') {
            $dropArea.removeClass('hover');
        }
    };
    
    ddUpload.dropHandler = function (e) {
        var oe = e.originalEvent,
        fileList = oe.dataTransfer.files;
        $.each(fileList, function (index, file) {
            if (file.type.indexOf('image') <= -1) {
                return;
            }
            fileReader = new FileReader();
            fileReader.onload = (function (file) {
                return function (e) {
                    ddUpload.upload(file);                
                    $result.append('<li><img src="' + this.result + '" /></li>');
                };
            })(file);
            fileReader.readAsDataURL(file);
        });

    };

    ddUpload.upload = function (file) {k
        var xhr = new XMLHttpRequest(),
        url = 'upload.php';
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader("X_FILENAME", file.name);

        // xhr.send(file);

        xhr.onload = function(e) { 
            /* If we got an error display it. */
            if (xhr.responseText) {
                console.log(xhr.responseText);
            }
        };
    };
})();

$(function () {
    ddUpload.setup();
} )