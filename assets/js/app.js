define([
    'jquery',
    'underscore',
    'backbone',
    'models/menu',
    'views/menu',
    'views/gallery'
], function($, _, Backbone, MenuModel, MenuView, GalleryView) {

    var initialize = function() {
        var menuData = [
            {menuId: 1, name: 'Newest collection'},
            {menuId: 2, name: 'Wedding photo gallary'},
            // {id: 1, name: 'Wedding dress'},
            // {id: 1, name: 'Other collection'}
        ];

        _.each(menuData, function(data) {
            var model = new MenuModel(data);
            var menuView = new MenuView({model: model});
            $('#mainNav > ul').append(menuView.render().el);
            // menuView.render();
        });  

        new GalleryView;
    };

    return {
        initialize: initialize
    };
});
