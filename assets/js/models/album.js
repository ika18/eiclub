define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var GalleryModel = Backbone.Model.extend({
        defaults: {
            menuId: '',
            albumId: '',
            albumCoverUrl: ''
        }
    });

    return GalleryModel;
});

