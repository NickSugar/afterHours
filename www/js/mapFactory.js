(function () {

  angular
    .module('afterHours.factory.map', [])
    .factory('mapService', mapService);


  mapService.$inject = ['$http', '$cordovaGeolocation'];


  function mapService($http, $cordovaGeolocation) {
    let service = {};
    service.mapInit = function (userLocation, places) {

              let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: {lat: userLocation.coords.latitude, lng: userLocation.coords.longitude}
              });

              // Create an array of alphabetical characters used to label the markers.
              let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

              // Add some markers to the map.
              // Note: The code uses the JavaScript Array.prototype.map() method to
              // create an array of markers based on a given "locations" array.
              // The map() method here has nothing to do with the Google Maps API.

              var locations = [];
              for (var i = 0; i < places.data.results.length; i++) {
                let latLngObject = {}
                latLngObject.lat = places.data.results[i].geometry.location.lat;
                latLngObject.lng = places.data.results[i].geometry.location.lng;
                locations.push(latLngObject)
              }

              // console.log(places);
              var markers = locations.map(function(location, i) {

                return new google.maps.Marker({
                  position: location,
                  label: labels[i % labels.length]
                });
              });

              var infowindow = new google.maps.InfoWindow();
              var placeService = new google.maps.places.PlacesService(map);



              function detailsCallback (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  google.maps.event.addListener(markers[j], 'click', function() {
                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                      'Place ID: ' + place.place_id + '<br>' +
                      place.formatted_address + '</div>');
                    infowindow.open(map, this);
                  });
                }
              }
              for (var j = 0; j < markers.length; j++) {
                var request = {
                  placeId: places.data.results[j].id
                };
                placeService.getDetails(request, detailsCallback);
              }


              var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

              // Add a marker clusterer to manage the markers.

            };

    return service;
  }

})();




// var marker = new google.maps.Marker({
//   map:map,
//   origin: new google.maps.Point(0, 0),
//   clickable: true,
//   anchor: new google.maps.Point(-17, 0),
//   position: new google.maps.LatLng(data.coord.lat, data.coord.lon),
//   icon: iconImgUrl, // null = default icon
//   zIndex:99999999 //to get the icon on the forefront
