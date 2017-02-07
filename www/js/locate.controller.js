// Ionic Starter App
(function() {

  'use strict';

  angular
    .module('afterHours.components.locate', [])
    .controller('locateController', locateController);

  locateController.$inject = ['locateService'];

  function locateController(locateService) {
    var vm = this;

    locateService.locateUser()
      .then(function(userLocation) {
        vm.userLatLng = userLocation.loc
        // console.log(vm.userLatLng);
      });
  }
})();
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
