(function () {

  angular
    .module('afterHours.factory.map', [])
    .factory('mapService', mapService);


  mapService.$inject = ['$http', '$state', '$cordovaGeolocation'];


  function mapService($http, $state, $cordovaGeolocation) {
    let vm = this;
    let service = {};

    service.mapInit = function (userLocation, places) {
              console.log(places);
              let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: {lat: userLocation.coords.latitude, lng: userLocation.coords.longitude}
              });

              function toggleBounce() {
                if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                }
              }

              var you = {
                url: './img/blueDot.png',
                anchor: new google.maps.Point(20, 20)
              };
              marker = new google.maps.Marker({
                map: map,
                icon: you,
                animation: google.maps.Animation.DROP,
                position: {lat: userLocation.coords.latitude, lng: userLocation.coords.longitude}
              });
              marker.addListener('click', toggleBounce);

              var markers = [];

              var counter = 0;
              function detailsCallback (place, status) {
                console.log(place);
                let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var infowindow = new google.maps.InfoWindow();

                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    label: labels[counter],
                    animation: google.maps.Animation.DROP
                  });
                  markers.push(marker);

                  google.maps.event.addListener(marker, 'click', function() {
                    // $state.go('map', {url: '/map'})
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                      '<a href="'+place.website+'">Website</a>' + '<br>' +
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
