define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/gallery.tpl',
    'collections/gallery',
    'helpers/mousewheel'
], function($, _, Backbone, $$, tpl, GalleryCollection, mousewheel) {

    var GalleryView = Backbone.View.extend({
        tagName: 'ul',

        template: tpl,

        initialize: function() {
            this.collection = new GalleryCollection();

            var data = [
                {"actualUrl": window.baseUrl + "/assets/images/album/1.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/1_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/2.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/2_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/3.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/3_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/4.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/4_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/5.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/5_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/6.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/6_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/7.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/7_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/1.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/1_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/2.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/2_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/3.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/3_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/4.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/4_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/5.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/5_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/6.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/6_1.jpg"},
                {"actualUrl": window.baseUrl + "/assets/images/album/7.jpg", "thumbUrl": window.baseUrl + "/assets/images/album/7_1.jpg"}
            ];

            this.collection.bind('reset', this.render, this);

            this.collection.reset(data);
        },

        render: function() {
            var data = {
                gallery: this.collection.toJSON()
            };

            $(this.el).append($$.render(this.template, data));

            $('#previewThumb').html($(this.el));

            mousewheel('#previewThumb');
        },

        events: {
            'click a': 'replaceBackground'
        },

        replaceBackground: function(e) {
            var $loading = $('#pageLoading'),
            el = e.target;

            $loading.show();

            if(e.target.tagName !== 'A') {
                el = e.target.parentNode;
            }
            
            var src = $(el).attr('href'),
            $mainSection = $('#main'),
            $img = $('<img />');

            $img.attr('src', src)
            .addClass('fullView')
            .load(function(){
                $loading.hide();
                $mainSection.prepend($img);
                $img.next().fadeOut(1000, function() {
                    $(this).remove();
                });
            });

            return false;
        }

    });

    return GalleryView;
});

