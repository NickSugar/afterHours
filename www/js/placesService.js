(function () {

  angular
    .module('afterHours.services.places', [])
    .service('placesService', placesService);

    var placesAPIkey = 'AIzaSyA2YYCGw5qx51mzpllS9ApznB57NsGAWLM';
    var placesAPI = 'https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=';

    placesService.$inject = ['$http', 'locateService'];

  function placesService($http, locateService) {
    var vm = this;

    vm.findPlaces = function (userLatLng) {
      console.log(userLatLng);
      return $http.get(placesAPI+'restaurants'+'&location='+userLatLng+'&key='+placesAPIkey)
        .then(function(locations) {
          // console.log(locations);
          return locations;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return vm
    // locateService.locateUser()
    //   .then(function (userLocation) {
    //     console.log(userLocation);
    //     vm.findPlaces = function () {
    //       return $http.get(placesAPI+'restaurants'+'&location='+userLocation+'&key='+placesAPIkey)
    //         .then(function(locations) {
    //           // console.log(locations);
    //           return locations;
    //         })
    //         .catch(function (error) {
    //           console.log(error);
    //         });
    //     };
    //   })
  }

})();
