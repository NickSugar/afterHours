(function() {
  'use strict'

  angular.module('afterHours')
    .component('mapPage', {
      templateUrl: './mapPageComp/map.html',
      controller: ['locateService', 'placesService',
        function (locateService, placesService) {
          let vm = this;
          vm.test = 'Map test'
        }]
    });

}());
