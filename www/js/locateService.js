(function () {

  angular
    .module('afterHours.services', [])
    .service('locateService', locateService);

  locateService.$inject = ['$http'];

  function locateService($http) {
    var vm = this;
    vm.locateUser = function () {
      return $http.get('http://ipinfo.io')
        .then(function(location) {
          return location.data.loc;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return vm
  }

})();
