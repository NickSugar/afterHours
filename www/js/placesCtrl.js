(function() {

  angular
    .module('afterHours.components.places', [])
    .controller('placesCtrl', placesCtrl);

  placesCtrl.$inject = ['placesService'];

  function placesCtrl(placesService) {
    var vm = this;

    placesService.findPlaces()
      .then(function(places) {
        vm.placesLatLng = places
        console.log(vm.placesLatLng);
      });
  }
})();
