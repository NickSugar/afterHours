(function () {

  angular
    .module('afterHours.factory.locateUser', [])
    .factory('locateService', locateService);

  locateService.$inject = ['$http', '$cordovaGeolocation'];

  function locateService($http, $cordovaGeolocation) {
    var service = {};

    service.locateUser = function () {
      let options = {timeout: 10000, enableHighAccuracy: true};

      return $cordovaGeolocation.getCurrentPosition(options)
        .then(function(position) {
          return position;
        })
        .catch(function(error) {
          console.log('Could not get location');
        });
    };
    return service
  }

})();
