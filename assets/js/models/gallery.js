define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var GalleryModel = Backbone.Model.extend({
        defaults: {
            actualUrl: '',
            thumbUrl: ''
        }
    });

    return GalleryModel;
});

