Backbone.emulateJSON = true;

var errorMsg = function () {
    alert('An error occured, please try later! Or connect with Ika Wu please!');
};

var menuUrl = '/api/menuapi/menu/format/json/id';
var albumUrl = '/api/albumapi/album/format/json/id';

var Menu = Backbone.Model.extend({
    defaults: {
        'menu_id': '',
        'menu_name': '',
        'menu_seq': ''
    },
});

var MenuCollection = Backbone.Collection.extend({
    model: Menu,
    url: menuUrl
});

var Menus = new MenuCollection;

var Album = Backbone.Model.extend({
    defaults: {
        'album_id': '',
        'album_name': '',
        'menu_id': ''
    }
});

var AlbumCollection = Backbone.Collection.extend({
    model: Album,
    url: albumUrl
});

var Albums = new AlbumCollection;

var MenuAlbumView = Backbone.View.extend({
	el: $('#menu-album-list'),
	template: $('#select-option-template').html(),

	initialize: function () {
		this.$menuSelect = $('#menu-list');
		this.$albumSelect = $('#album-list');
		this.render();
	},

	render: function () {
		if (this.model.get('menu_seq')) {
			this.$menuSelect.append(Mustache.render(this.template, this.model.toJSON()));
		} else {
			this.$albumSelect.append(Mustache.render(this.template, this.model.toJSON()));
		}
	}
});

var AppView = Backbone.View.extend({
	el: $('body'),

	events: {
		'change #menu-list': 'changeMenu'
	},

	initialize: function () {
		Menus.fetch({
			success: function (collection, resposne) {
				// console.log(resposne);
			},
            error: function () {
                errorMsg();
            }
        });

        Albums.fetch({
            success: function (collection, resposne) {
                // console.log(resposne);
            },
            error: function () {
                errorMsg();
            }
        });

        // _.bindAll(this, 'addMenu', 'addMenus', 'addAlbum', 'addAlbums');
        Menus.bind('add', this.addMenu, this);
        Menus.bind('reset', this.addMenus, this);
        Albums.bind('add', this.addAlbum, this);
        Albums.bind('reset', this.addAlbums, this);

        this.$menuSelect = $('#menu-list');
		this.$albumSelect = $('#album-list');
	},

	addMenu: function (menu) {
		var menuAlbumView = new MenuAlbumView({model: menu});
	},

	addMenus: function () {
		Menus.each(this.addMenu);
	},

	addAlbum: function (album) {
		var menuAlbumView = new MenuAlbumView({model: album});
	},

	addAlbums: function () {
		Albums.each(this.addAlbum);
		this.cleanAlbumSelect();
	},

	changeMenu: function () {
		var menu_id = this.$menuSelect.val();
		this.cleanAlbumSelect();
		if (menu_id) {
			this.$albumSelect.find('[data-parent="' + menu_id + '"]').show();
		}
		
	},
	cleanAlbumSelect: function () {
		this.$albumSelect.children(':not([value=""])').hide();
		this.$albumSelect.children('[value=""]').prop('selected', true);
	}
});

$(function () {
	var appView = new AppView;
});