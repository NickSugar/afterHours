(function() {
  'use strict';

  angular.module('afterHours')
    .component('homePage', {
      templateUrl: './homePageComp/home.html',
      controller: ['locateService', 'placesService', 'mapService', HomeCtrl ]
    });

  function  HomeCtrl(locateService, placesService, mapService) {
          let vm = this;

          vm.search = '';

          vm.categories = {
            restrooms: [
              'Restrooms',
              'ion-transgender',
              'bar&convenience_store&gas_station&store'
            ],
            restaurant: [
              'Restaurants',
              'ion-android-restaurant',
              'restaurant'
            ],
            bar: [
              'Bars',
              'ion-android-bar',
              'bar'
            ],
            liquor_store: [
              'Liquor Stores',
              'ion-ios-flask',
              'liquor_store'
            ],
            meal_delivery: [
              'Meal Delivery',
              'ion-pizza',
              'meal_delivery'
            ],
            night_club: [
              'Night Clubs',
              'ion-ios-cloudy-night',
              'night_club'
            ],
            parking: [
              'Parking',
              'ion-model-s',
              'parking'
            ],
            gas_station: [
              'Gas Station',
              'ion-android-car',
              'gas_station'
            ],
            store: [
              'Store',
              'ion-ios-cart',
              'store'
            ],
            lodging: [
              'Lodging',
              'ion-home',
              'lodging'
            ],
            atm: [
              'ATM',
              'ion-cash',
              'atm'
            ]
          };

          vm.clickedCategory = function (type) {

            locateService.locateUser()
              .then(function(userLocation) {
                vm.userLatLng = userLocation;

                placesService.findPlaces(vm.userLatLng, type)
                  .then(function(places) {
                    let placesObject = places;
                    console.log();
                    mapService.mapInit(vm.userLatLng, placesObject);
                  });
              });
          };
    }
}());
