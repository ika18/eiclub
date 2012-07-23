Backbone.emulateJSON = true;

var menuIndex = 1;
var errorMsg = function () {
	alert('An error occured, please try later! Or connect with Ika Wu please!');
};

var Menu = Backbone.Model.extend({
    defaults: {
        'menu_id': '',
        'menu_name': '',
        'menu_seq': ''
    }
});

var MenuCollection = Backbone.Collection.extend({
    model: Menu,
    url: '/api/menuapi/menu/format/json/id'
});

var Album = Backbone.Model.extend({
    defaults: {
        'album_id': '',
        'album_name': '',
        'menu_id': ''
    }
});

var AlbumCollection = Backbone.Collection.extend({
    model: Album,
    url: '/api/albumapi/menu/format/json/id'
});


var Menus = new MenuCollection;

var MenuTabView = Backbone.View.extend({
	tagName: 'li',

	href: '#tab',

    events: {
    	'click #album-tab a': 'tabable'
    },

    template: $('#tab-template').html(),

    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render, this);
    },

    render: function () {
    	var li = $(Mustache.render(this.template, this.model.toJSON())).attr('href', this.href + menuIndex);
        this.$el.html(li);
        menuIndex++;
        return this;
    },
    tabable: function (e) {
    	e.preventDefault();
    	$(e.target).tab('show');
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

    initialize: function () {
        Menus.fetch({
            error: function () {
                errorMsg();
            }
        });
        _.bindAll(this, 'addOne', 'addAll');
        Menus.bind('add', this.addOne, this);
        Menus.bind('reset', this.addAll, this);

        this.$tab = this.$('#album-tab');
        this.$select = this.$('#menu_name');
    },

    addOne: function (menu) {
        var menuTabView = new MenuTabView({model: menu});
        this.$tab.append(menuTabView.render().el);

        var menuSelectView = new MenuSelectView({model: menu});
        this.$select.append(menuSelectView.render().el);
    },
    addAll: function () {
        Menus.each(this.addOne);

		this.$tab.children(':eq(0)').addClass('active');
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