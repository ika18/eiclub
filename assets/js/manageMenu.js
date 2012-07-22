Backbone.emulateJSON = true;

var errorMsg = function () {
    alert('An error occured, please try later! Or connect with Ika Wu please!');
};

var url = '/api/menuapi/menu/format/json/id';

var Menu = Backbone.Model.extend({
    defaults: {
        'menu_id': '',
        'menu_name': '',
        'menu_seq': ''
    },
    clear: function (callback) {
        this.destroy({
            success: function (model, response) {
                if (response.status === 'ok' && callback) {
                    callback();
                }
            },
            error: function () {
                errorMsg();
            }
        });
    }
});

var MenuCollection = Backbone.Collection.extend({
    model: Menu,
    url: url
});

var Menus = new MenuCollection;

var MenuView = Backbone.View.extend({
    tagName: 'tr',

    events: {
        'click .editBtn': 'edit',
        'click .closeBtn': 'close',
        'click .updateBten': 'save',
        'click .removeBtn': 'remove',
        'focus input:text': 'focusInput'
    },

    template: $('#menu-template').html(),

    initialize: function () {
        _.bindAll(this, 'render', 'close', 'remove');
        this.model.bind('change', this.render, this);
        // this.model.bind('destroy', this.remove, this);
    },

    render: function() {
        this.$el.html(Mustache.render(this.template, this.model.toJSON()));

        this.$input = this.$('input:text');
        this.$control = this.$('.control-group');
        this.$helper = this.$('.help-inline');

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
        e.preventDefault();
        var $root = $(e.target).parents('tr'),
        menu_name = $.trim($root.find('input[name="menu_name"]').val()),
        menu_id = $root.find('input[name="menu_id"]').val();

        if (menu_name.length) {
            
        } else {
            this.$control.attr('class', 'control-group error');
            this.$helper.text('Menu Name can\'t be empty!');
        }
    },
    remove: function (e) {
        e.preventDefault();
        var that = this;
        var confirm = window.confirm("Are you sure to delete this menu?");
        if (confirm) {
            this.model.clear(function () {
                that.$el.remove();
            });
        }
    },
    focusInput: function (e) {
        this.$input.parents('.control-group').removeClass('error');
        this.$helper.text('');
    }
});


var AppView = Backbone.View.extend({
    el: $('#menu-table'),

    initialize: function () {
        Menus.fetch({
            error: function () {
                errorMsg();
            }
        });
        _.bindAll(this, 'addOne', 'addAll');
        Menus.bind('add', this.addOne, this);
        Menus.bind('reset', this.addAll, this);
    },

    addOne: function (menu) {
        var view = new MenuView({model: menu});
        menu.id = menu.get('menu_id');
        this.$('tbody').append(view.render().el);
    },
    addAll: function () {
        Menus.each(this.addOne);
    }
});

var AddMenuView = Backbone.View.extend({
    el: $('#add-menu'),

    events: {
        'submit': 'formSubmit',
        'focus #menu_name': 'focusInput'
    },

    initialize: function () {
        this.$input = this.$('#menu_name');
        this.$control = this.$('.control-group');
        this.$helper = this.$input.next();
    },

    formSubmit: function () {
        var menu_name = this.$input.val(),
        that = this;
        if (menu_name) {
            var menu = new Menu();

            menu.url = url;
            menu.save({
                'menu_name': menu_name,
                'menu_seq': Menus.length + 1
            }, {
                success: function (model, response) {
                    if (response.status !== 'fail') {
                        menu.set({
                            'menu_id': response.menu_id
                        });

                        that.$input.parents('.control-group').attr('class', 'control-group success');
                        that.$helper.text('Menu has been added!');

                        var time = setTimeout(function () {
                            that.$input.parents('.control-group').attr('class', 'control-group')
                            .end().val('');
                            that.$helper.text('');

                            // add new model to collection, 
                            // then it will trigger collection add event
                            Menus.add(response);
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
            this.$control.attr('class', 'control-group error');
            this.$helper.text('Menu Name can\'t be empty!');
        }
        return false;
    },

    focusInput: function (e) {
        this.$input.parents('.control-group').removeClass('error');
        this.$helper.text('');
    }
});

$(function () {
    var appView = new AppView;
    var addMenuView = new AddMenuView;
});