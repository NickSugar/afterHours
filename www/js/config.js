(function() {

  'use strict';

  angular
    .module('afterHours')
      .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
        .state('home', {
          url: '/',
          template: '<home-page></home-page>'
        })
        .state('map', {
          url: '/map',
          template: '<map-page></map-page>'
        })
        $urlRouterProvider.otherwise('/')
        $locationProvider.html5Mode(true)
    });
})();
