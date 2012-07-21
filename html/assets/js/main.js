require.config({
    baseUrl: 'assets/',
    paths: {
        'helpers': 'js/helpers/',
        'text': 'js/helpers/text',
        'order': 'js/helpers/order',
        'jquery': 'js/libs/jquery/_jquery',
        'underscore': 'js/libs/underscore/_underscore',
        'backbone': 'js/libs/backbone/_backbone',
        'mustache': 'js/libs/mustache/_mustache',
        'collections': 'js/collections',
        'models': 'js/models',
        'views': 'js/views',
        'templates': 'templates'
    }
});

require(['js/app','order!jquery','order!underscore','order!backbone'], function(app) {

    app.initialize();

});
