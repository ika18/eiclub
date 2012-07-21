var EI = EI || {};

EI.changeAlbum = function() {
  var $albumBtn = $('.albumCover ul a');

  $albumBtn.click(function(e) {
    var $albumLink = $(this),
      album = $albumLink.attr('href').substring(1),
      template;

    $albumLink.parents('.albumCover').siblings('a').trigger('click');

    if(album !== '') {
      var template = $.ajax({
        url: 'assets/templates/photoList.tpl',
        dataType: 'text',
        async: false
      }).responseText;

      $.getJSON('temp/' + album + '.json',function(data) {
        var compliedTemplate = Mustache.render(template, data);

        $('#previewThumb ul').html(compliedTemplate);

        $('#previewThumb a:eq(0)').trigger('click');
      });
    }
    return false;
  });
}

$(function() {
  EI.changeAlbum();
});
