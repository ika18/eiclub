define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var MenuModel = Backbone.Model.extend({
        defaults: {
        	menuId: '',
            name: ''
        }
    });

    return MenuModel;
});

