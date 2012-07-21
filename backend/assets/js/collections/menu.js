define([
    'jquery',
    'underscore',
    'backbone',
    'models/menu'
], function($, _, Backbone, MenuModel) {
    var MenuCollection = Backbone.Collection.extend({
        model: MenuModel
    });

    return MenuCollection; 
});

