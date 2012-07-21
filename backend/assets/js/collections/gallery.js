define([
    'jquery',
    'underscore',
    'backbone',
    'models/gallery'
], function($, _, Backbone, GalleryModel) {
    var GalleryCollection = Backbone.Collection.extend({
        model: GalleryModel
    });

    return GalleryCollection; 
});

