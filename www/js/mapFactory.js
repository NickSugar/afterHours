(function () {

  angular
    .module('afterHours.factory.map', [])
    .factory('mapService', mapService);


  mapService.$inject = ['$http', '$cordovaGeolocation'];


  function mapService($http, $cordovaGeolocation) {
    let vm = this;
    let service = {};
    
    service.mapInit = function (userLocation, places) {

              let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: {lat: userLocation.coords.latitude, lng: userLocation.coords.longitude}
              });

              var markers = [];

              var counter = 0;
              function detailsCallback (place, status) {

                let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var infowindow = new google.maps.InfoWindow();

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    label: labels[counter]
                  });
                  markers.push(marker);

                  google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                      'Place ID: ' + place.place_id + '<br>' +
                      place.formatted_address + '</div>');
                    infowindow.open(map, this);
                  });
                }
                counter++;
              }

              var placeService = new google.maps.places.PlacesService(map);
              var clear = setInterval(function () {
                if (counter < 20) {
                  var request = {
                    placeId: places.data.results[counter].place_id
                  };
                  placeService.getDetails(request, detailsCallback);
                }else {
                  var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                  clearInterval(clear);
                }
              }, 700);
            };
    return service;
  }
})();
