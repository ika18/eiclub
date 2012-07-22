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
		var option = Mustache.render(this.template, this.model.toJSON());
		this.$el.text(option).attr('value', this.model.get('menu_id'));
		return this;
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

$(function () {
    var appView = new AppView;
});