define([
    'jquery',
    'underscore',
    'backbone',
    'models/album'
], function($, _, Backbone, AlbumModel) {
    var AlbumCollection = Backbone.Collection.extend({
        model: AlbumModel,

        findByMenuId: function(menuId) {
            return this.filter(function(model){
                return model.get('menuId') == menuId;
            });
        }
    });

    var album1 = {
        menuId: '1',
        albumId: '1',
        albumCoverUrl: 'assets/images/album/1_1.jpg'
    };

    var album2 = {
        menuId: '1',
        albumId: '2',
        albumCoverUrl: 'assets/images/album/hana/1_s.jpg'
    };

    var album3 = {
        menuId: '1',
        albumId: '3',
        albumCoverUrl: 'assets/images/album/2_1.jpg'
    };

    var album5 = {
        menuId: '2',
        albumId: '3',
        albumCoverUrl: 'assets/images/album/1_1.jpg'
    };

    var album6 = {
        menuId: '2',
        albumId: '3',
        albumCoverUrl: 'assets/images/album/2_1.jpg'
    };

    var albumCollection = new AlbumCollection([
            album1,
            album2,
            album3,
            album5,
            album6
        ]);

    return albumCollection.toJSON(); 
});