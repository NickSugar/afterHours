(function() {
  'use strict'

  angular.module('afterHours')
    .component('homePage', {
      templateUrl: './homePageComp/home.html',
      controller: ['locateService', 'placesService',
        function (locateService, placesService) {
          let vm = this;

          locateService.locateUser()
            .then(function(userLocation) {
              vm.userLatLng = userLocation
              // console.log(vm.userLatLng);

              placesService.findPlaces(vm.userLatLng)
                .then(function(places) {
                  vm.placesLatLng = places;
                  console.log(vm.placesLatLng);
                });
            });



        }]
    });

}());
