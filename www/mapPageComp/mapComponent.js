(function() {
  'use strict'

  angular.module('afterHours')
    .component('mapPage', {
      templateUrl: './mapPageComp/map.html',
      controller: ['locateService', 'placesService','$scope', '$state', '$cordovaGeolocation',
        function (locateService, placesService, $scope, $state, $cordovaGeolocation) {
          let vm = this;

        }]
    });

}());
