define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'text!templates/album.tpl',
    'collections/album'
], function($, _, Backbone, $$, tpl, albumCollection) {
    var AlbumView = Backbone.View.extend({
        tagName: 'div',

        className: 'albumCover',

        template: tpl,

        events: {
            'click img': 'changeAlbum'
        },

        initialize: function() {
            // this.albums = albumCollection.findByMenuId(this.attributes.menuId);
        },

        render: function() {
            var menuId = this.attributes['data-menuId'];
            var data = _.filter(albumCollection, function(album) {
                return album.menuId == menuId;
            });

            var viewData = {
                album: data
            };

            $(this.el).html($$.render(this.template, viewData));

            return this;
        },

        changeAlbum: function (e) {
            console.log(e.target);
        }
    });

    return AlbumView; 
});