define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'collections/menu',
    'text!templates/menu.tpl',
    'views/album'
], function($, _, Backbone, $$, MenuCollection, tpl, AlbumView) {
    var MenuView = Backbone.View.extend({
        tagName: 'li',

        template: tpl,

        events: {
            'click a.menu': 'navClick'
        },

        initialize: function() {
            this.albumView = new AlbumView({
                attributes: {
                    'data-menuId': this.model.get('menuId')
                }
            });
        },

        render: function() {

            $(this.el).append($$.render(this.template, this.model.toJSON()));

            $(this.el).append(this.albumView.render().el);

            return this;
        },

        navClick: function(e) {
            var $div = $(e.target).next('div');
            $div.width($(window).width());
            $div.slideToggle();

            $(e.target).parents('li').siblings().find('div').slideUp();
            return false;
        }
    });

    return MenuView; 
});