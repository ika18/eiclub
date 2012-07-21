Backbone.emulateJSON = true;

var errorMsg = function () {
    alert('An error occured, please try later! Or connect with Ika Wu please!');
};

var Urls = {
    getMenus: '/api/menuapi/menus/format/json',
    // addMenu: function (str) {
    //     return window.location.origin + '/api/menuapi/menu/' + str + 'format/json'
    // },
    addMenu: '/api/menuapi/menu/format/json',
    // deleteMenu: function (id) {
    //     return window.location.origin + '/api/menuapi/menu/id/' + id + '/format/json';
    // }
    deleteMenu: '/api/menuapi/menu/'
}

var Menu = Backbone.Model.extend({
    defaults: {
        'menu_id': '',
        'menu_name': '',
        'menu_seq': ''
    }
});

var MenuCollection = Backbone.Collection.extend({
    model: Menu,
    url: Urls.getMenus
});

var Menus = new MenuCollection;

var MenuView = Backbone.View.extend({
    tagName: 'tr',

    events: {
        'click .editBtn': 'edit',
        'click .closeBtn': 'close',
        'click .updateBten': 'save',
        'click .removeBtn': 'remove'
    },

    template: $('#menu-template').html(),

    initialize: function () {
        _.bindAll(this, 'render', 'close', 'remove');
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, this.model.toJSON()));
        return this;
    },

    edit: function (e) {
        var $tr = $(e.target).parents('tr');
        val = $tr.addClass('editMode').find("td:eq(1) .view").text();
        $tr.find("td:eq(1) input").attr('placeholder', val).focus();
        return false;
    },
    close: function (e) {
        $(e.target).parents('tr').removeClass('editMode').find("td:eq(1) input").val('');
        return false;
    },
    save: function (e) {
        var $root = $(e.target).parents('tr'),
        menu_name = $root.find('input[name="menu_name"]').val(),
        menu_id = $root.find('input[name="menu_id"]').val();
        if (menu_name) {
            console.log(menu_name);
            console.log(menu_id);
        }   
    },
    remove: function () {
        // var confirm = window.confirm("Are you sure to delete this menu?");
        // if (confirm) {
            // this.model.url = Urls.deleteMenu(this.model.get('menu_id'));
            // this.model.url = Urls.deleteMenu;
            // this.model.destroy();
        // }
        console.log(this.model);
        return false;
    }
});


var AppView = Backbone.View.extend({
    el: $('#menu-table'),

    initialize: function () {
        Menus.fetch({
            // success: function (collection, response) {
            // }
        });
        _.bindAll(this, 'addOne', 'addAll');
        Menus.bind('add', this.addOne, this);
        Menus.bind('reset', this.addAll, this);
    },


    addOne: function (menu) {
        var view = new MenuView({model: menu});
        this.$('tbody').append(view.render().el);
    },
    addAll: function () {
        Menus.each(this.addOne);
    }
});

var AddMenuView = Backbone.View.extend({
    el: $('#add-menu'),

    events: {
        'submit': 'formSubmit'
    },

    initialize: function () {
        this.$input = this.$('#menu_name');
        this.$helper = this.$input.next();
    },

    formSubmit: function () {
        var menu_name = this.$input.val(),
        that = this;
        if (menu_name) {
            var menu = new Menu();

            menu.url = Urls.addMenu;
            menu.save({
                'menu_name': menu_name,
                'menu_seq': Menus.length + 1
            }, {
                success: function (model, response) {
                    if (response.status !== 'faile') {
                        menu.set({
                            'menu_id': response.menu_id
                        });

                        that.$input.parents('.control-group').attr('class', 'control-group success');
                        that.$helper.text('Menu has been added!');

                        var time = setTimeout(function () {
                            that.$input.parents('.control-group').attr('class', 'control-group');
                            that.$helper.text('');
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
        } else {
            this.$input.parents('.control-group').attr('class', 'control-group error');
            this.$helper.text('Menu Name can\'t be empty!');
        }
        return false;
    }
});

$(function () {
    var appView = new AppView;
    var addMenuView = new AddMenuView;
});