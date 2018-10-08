var map;
var boundStationsArray = [];
var geojson = {
    type: "FeatureCollection",
    features: [],
    };
$(document).ready(function () {
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VpbGxlbWhlcnJlcmEiLCJhIjoiY2pjamdtMjMyMjU3OTJ3cGEzOHk0eGt3MCJ9.37rBv4h8G6B33tiBCDhsow';
map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/guillemherrera/cjdmb3def1gr92sp9g2j6qen1',
  center: [2.16859, 41.3954],
  zoom: 3.5,
  minzoom: 3,
  maxzoom: 10,
  hash: false,
  pitch: 60
  });
map.on('load', function () {
    map.addSource("windLayer", {
        type: "raster",
        tiles: ["https://tile.openweathermap.org/map/wind/{z}/{x}/{y}.png?appid=5e92732603fbd313828ea9351de0c78c"],
    });  //fin map source
    map.addLayer({
        'id': 'wind',
        'type': 'raster',
        'source': 'windLayer',
        'minzoom': 0,
        'maxzoom': 20,
        'paint': {'raster-opacity': 0.4}
        });
  });
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

stationscall();
window.setTimeout(function() {
                map.getSource('geojsonStations').setData(geojson);
            }, 1000);
map.on('moveend', function () {
  stationscall();
  window.setTimeout(function() {
    map.getSource('geojsonStations').setData(geojson);
}, 1000);
});

function stationscall() {
  var bounds  = map.getBounds(); 
  var stationscall = 'https://secure.geonames.org/weatherJSON?' +
      'north=' + bounds.getNorth() + '&' +
      'south=' + bounds.getSouth() + '&' +
      'east=' + bounds.getEast() + '&' +
      'west=' + bounds.getWest() + '&' +
      'maxRows=1000&' + 
      'username=guillemhm';

      $.ajax({
      url: stationscall,
      method: "GET",
      dataType: "json",
      success: function (response) {
          
          boundStationsArray = response.weatherObservations;
          makeGeoJson(boundStationsArray);
          //console.info(geojson);
      },
      complete: displayGeoJsonPoints()
  });
}

function  makeGeoJson (stationslist) {

    geojson = {
    type: "FeatureCollection",
    features: [],
    };
    for (i = 0; i < stationslist.length; i++) {
      geojson.features.push({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [stationslist[i].lng, stationslist[i].lat]
                    },
          "properties": {
            "id": stationslist[i].ICAO,
            "windDirection": stationslist[i].windDirection,
            "windSpeed": Number(stationslist[i].windSpeed),
          }
      });
    }
}

function displayGeoJsonPoints () {
          
          map.on('load', function () {

            map.addSource("geojsonStations", {
                "type": "geojson",
                "data": geojson
            });

            map.addLayer({
                id: "stations",
                interactive: "true",
                type: "symbol",
                source: 'geojsonStations',
                "layout": {
                    "icon-image": "drawing",
                    "icon-allow-overlap": {
                            stops : [[0,false], [4, true]]
                           },
                    "icon-size": {
                          property: 'windSpeed',
                          type: 'exponential',
                          stops: [
                            [0, 0],
                            [10, 1],
                            [30, 2],
                            [60, 3]
                          ],
                          default: 0.5
                          },
                    "icon-rotate":{
                          type: 'identity',
                          property: 'windDirection'
                          },
                    "icon-padding": 1

                         }
            });
          });
}


var popup2 = new mapboxgl.Popup();

map.on('click', function (a) {
      var lng = a.lngLat.lng;
      var lat = a.lngLat.lat;
      //console.info(lat);
      var preproxy = 'https://thingproxy.freeboard.io/fetch/';
      var positioncall = preproxy +'https://api.darksky.net/forecast/66b4870d52e4f5c95469bdc50d6c422f/' +
      lat+','+lng+'?exclude=hourly,daily,flags&units=si'; 
      console.info(positioncall);
      $.ajax({
        url: positioncall,
        method: "GET",
        dataType: "json",
        success: function (response) {
                    makePopup(response);                     
        },
      });
});

function makePopup(minfo){
  var popup = new mapboxgl.Popup()
    .setLngLat([minfo.longitude, minfo.latitude])
    .setHTML ('<p>'+minfo.currently.summary +'</p><canvas id="'+minfo.currently.icon+'" width="64" height="64">'+
    '</canvas><p> Wind: '+minfo.currently.windSpeed+'m/s</p>')
    .addTo(map);
    var skycons = new Skycons({"color": "black"});
    skycons.add(minfo.currently.icon, minfo.currently.icon);
    skycons.play();
}

$( ".icon-toggle" ).click(function() {
  $( "#legend" ).toggle('slow');
});

$( "#map" ).click(function() {
  $( "#click" ).hide('slow');
});


});

