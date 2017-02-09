(function () {

  angular
    .module('afterHours.services.places', [])
    .service('placesService', placesService);

    var placesAPIkey = 'AIzaSyA2YYCGw5qx51mzpllS9ApznB57NsGAWLM';
    var placesAPI = 'https://galvanize-cors-proxy.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=';

    placesService.$inject = ['$http', 'locateService'];

  function placesService($http) {
    var vm = this;

    vm.findPlaces = function (userLatLng, type) {
      let latLng = userLatLng.coords.latitude.toString() +','+ userLatLng.coords.longitude.toString()
      return $http.get(placesAPI+type+'&location='+latLng+'&key='+placesAPIkey)
        .then(function(locations) {
          // console.log(locations);
          return locations;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return vm
  }

})();
