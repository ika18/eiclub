Backbone.emulateJSON = true;

var errorMsg = function () {
	alert('An error occured, please try later! Or connect with Ika Wu please!');
};

var Menu = Backbone.Model.extend({
    defaults: {
        'menu_id': '',
        'menu_name': '',
        'menu_seq': ''
    },
});

var MenuCollection = Backbone.Collection.extend({
    model: Menu,
    url: '/api/menuapi/menu/format/json/id'
});

var Menus = new MenuCollection;

var Album = Backbone.Model.extend({
    defaults: {
        'album_id': '',
        'album_name': '',
        'menu_id': ''
    },
    url: '/api/albumapi/album/format/json/id'
});

var AlbumCollection = Backbone.Collection.extend({
    model: Album,
    url: '/api/albumapi/album/format/json/id'
});

var Albums = new AlbumCollection;

var MenuTabView = Backbone.View.extend({
	tagName: 'li',
	href: '#tab',

    template: $('#tab-template').html(),

    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render, this);
    },

    render: function () {
    	var li = $(Mustache.render(this.template, this.model.toJSON())).attr('href', this.href + this.model.get('menu_id'));
        this.$el.html(li);
        return this;
    }
});

var AlbumContentView = Backbone.View.extend({
    tagName: 'tr',
    elId: 'tab',
    attributes: {
        'class': 'tab-pane'
    },
    template: $('#album-template').html(),
    initialize: function () {

    },
    render: function () {
        var tr = $(Mustache.render(this.template, this.model.toJSON()));
        this.$el.html(tr).addClass(this.elId + this.model.get('menu_id'));

        var tab = $('.tabbable .nav-tabs li.active a').attr('href').substring(4);
        if (!tab) {
            this.$el.addClass('active');
        }
        else if (this.model.get('menu_id') == tab) {
            this.$el.addClass('active');
        }
        return this;
    }
});

var MenuSelectView = Backbone.View.extend({
	tagName: 'option',
	template: $('#menu-select-template').html(),
	initialize: function () {
		_.bindAll(this, 'render');
		this.model.bind('change', this.render, this);
	},

	render: function () {
        var data = this.model.toJSON();
		var option = Mustache.render(this.template, this.model.toJSON());
		this.$el.text(option).attr('value', this.model.get('menu_id'));
		return this;
	}
});

var AddAlbumView = Backbone.View.extend({
    el: $('#add-album'),
    events: {
        'submit': 'formSubmit',
        'focus #album_name': 'focusInput',
        'change #menu_name': 'changeSelect'
    },

    initialize: function () {
        this.$select = $('#menu_name');
        this.$input = $('#album_name');
        this.$tbody = $('#album-content tbody');
    },

    formSubmit: function (e) {
        e.preventDefault();

        var menu_id = this.$select.val();
        var album_name = $.trim(this.$input.val());
        var that = this;
        var valid = true;
        if (menu_id === '') {
            showErrorHelper(this.$select);
            valid = false;
        }
        if (!album_name.length) {
            showErrorHelper(this.$input);
            valid = false;
        }

        if (!valid) {
            return false;
        }

        var album = new Album();
        album.save({
            'album_name': album_name,
            'menu_id': menu_id
        }, {
            success: function (model, response) {
                if (response.status !== 'fail') {

                    that.$input.parents('.control-group').attr('class', 'control-group success');
                    that.$input.next().text('Menu has been added!');

                    var time = setTimeout(function () {
                        that.$input.parents('.control-group').attr('class', 'control-group')
                        .end().val('');
                        that.$input.next().text('');

                        // var tab = $('.tabbable .nav-tabs li.active a').attr('href').substring(4);
                        
                        // // if (model.get('menu_id') == tab) {

                        // // }

                        Albums.add(response);

                        clearTimeout(time);
                    }, 1000);
                } else {
                    errorMsg();
                }
            },
            error: function (model, response) {
                errorMsg();
            }
        });
    },

    focusInput: function (e) {
        hideErrorHelper($(e.target));
    },

    changeSelect: function (e) {
        hideErrorHelper($(e.target));
    }
});

var AppView = Backbone.View.extend({
    el: $('body'),

    events: {
        'click #album-tab a': 'tabbable'
    },

    initialize: function () {
        Menus.fetch({
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

        _.bindAll(this, 'addMenu', 'addMenus', 'addAlbum', 'addAlbums');
        Menus.bind('add', this.addMenu, this);
        Menus.bind('reset', this.addMenus, this);
        Albums.bind('add', this.addAlbum, this);
        Albums.bind('reset', this.addAlbums, this);

        this.$tab = this.$('#album-tab');
        this.$select = this.$('#menu_name');
        this.$content = this.$('.album-table');
    },

    addMenu: function (menu) {
        var menuTabView = new MenuTabView({model: menu});
        this.$tab.append(menuTabView.render().el);

        var menuSelectView = new MenuSelectView({model: menu});
        this.$select.append(menuSelectView.render().el);
    },
    addMenus: function () {
        Menus.each(this.addMenu);
    },

    addAlbum: function (album) {
        var albumContentView = new AlbumContentView({model: album});
        this.$content.append(albumContentView.render().el);
    },
    addAlbums: function () {
        Albums.each(this.addAlbum);
    },
    tabbable: function (e) {
        e.preventDefault();
        var $me = $(e.target);
        var tabName = $me.attr('href').substring(1);
        var $parent = $me.parents('.tabbable');
        if (tabName.length) {
            $parent.find('.tab-content').find('.tab-pane').removeClass('active').end()
            .find('.' + tabName).addClass('active');
        } else {
            $parent.find('.tab-content').find('.tab-pane').addClass('active');
        }
        
    }
});

var showErrorHelper = function ($el, msg) {
    $el.parents('.control-group').attr('class', 'control-group error');
    $el.next().text('This field can\'t be empty!');
};

var hideErrorHelper = function ($el) {
    $el.parents('.control-group').removeClass('error');
    $el.next().text('');
};

$(function () {
    var appView = new AppView;
    var addAlbumView = new AddAlbumView;
});