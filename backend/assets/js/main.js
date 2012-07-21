
require.config({
    baseUrl: document.location.origin,
    paths: {
        'helpers': 'assets/js/helpers/',
        'text': 'assets/js/helpers/text',
        'order': 'assets/js/helpers/order',
        'jquery': 'assets/js/libs/jquery/_jquery',
        'underscore': 'assets/js/libs/underscore/_underscore',
        'backbone': 'assets/js/libs/backbone/_backbone',
        'mustache': 'assets/js/libs/mustache/_mustache',
        'collections': 'assets/js/collections',
        'models': 'assets/js/models',
        'views': 'assets/js/views',
        'templates': 'assets/templates'
    }
});

require(['assets/js/app','order!jquery','order!underscore','order!backbone'], function(app) {

    app.initialize();

});