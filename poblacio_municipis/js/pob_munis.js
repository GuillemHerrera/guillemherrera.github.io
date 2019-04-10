var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapboxgl-styles/mapa_municipal.json',
    hash: true,
    center: [-1.517, 41.8],
    zoom: 7
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

var layers_list = ['1857', '1877', '1900','1910', '1920', '1930', '1936', '1940',
					'1945', '1950', '1955', '1960', '1965', '1970', '1975', '1981', '1986',
					'1990', '1995', '2000', '2005', '2010', '2015', '2018'];
$('.year-display').text('Any:' +layers_list[0]);

//map.querySourceFeatures('municipis', {sourceLayer: 'pob_municipis_INE_4326', filter:['>', '2000', 0]})
//Object.entries(result[0].properties)
var relatedFeatures;
var popup = new mapboxgl.Popup({
closeButton: false
});

map.on('load', function() {

//needed to add highligted layer as a local source. 
//highlight function is not fast enough with layer from mbtiles hosted in github

map.addSource('m-h', {
"type": "geojson",
"data": 'https://raw.githubusercontent.com/GuillemHerrera/guillemherrera.github.io/master/poblacio_municipis/js/munis-highligted.geojson'
});


map.addLayer({
      "id": "munis-highligted",
      "type": "fill",
      "source": "m-h",
      //"source-layer": "pob_municipis_INE_4326",
      "paint": {
        "fill-outline-color": "#484896",
        "fill-color": "#6e599f",
        "fill-opacity": 0.75
        },
      "filter": ["==", "nom_muni", ""]
    }); 

function fadeLayers(layer_list) {
    var fading;
    var index = 0;
    var opacity_current = 1;
    var opacity_next = 0;
    console.log('fading' + layer_list[index]);
    
    map.setPaintProperty(layer_list[0], 'fill-opacity', 1);
    map.setPaintProperty(layer_list[1], 'fill-opacity', 0);
    map.setPaintProperty(layer_list[2], 'fill-opacity', 0);

    function toggle_layer () {
    	
        
        opacity_current -= 0.001;
        opacity_next += 0.001;

        if (index == layer_list.length -1){
        	cancelAnimationFrame(fading);	
        }
        else if (opacity_next >= 1){
            // complete
            map.setPaintProperty(layer_list[index], 'fill-opacity', 0);
        	map.setPaintProperty(layer_list[index + 1], 'fill-opacity', 1);
            index += 1;
            opacity_current = 1;
            opacity_next = 0;
            console.log('fading' + layer_list[index]);
            
        }

        else {
        //map.setPaintProperty(layer_list[index], 'fill-opacity', opacity_current);
        map.setPaintProperty(layer_list[index + 1], 'fill-opacity', opacity_next);
        //console.log(opacity_next);
        }

        requestAnimationFrame(toggle_layer);
    }
    fading = requestAnimationFrame(toggle_layer);
} 

function FadeLayersTransition(layer_list){
	var index=0;
	var i;
	console.log('reseting layers-opacity');
	for (i = 0; i < layer_list.length; i++) {
	  if (i==0){
	  $('.year-display').text('Any: ' +layers_list[i]);
	  map.setPaintProperty(layer_list[i], 'fill-opacity', 1);
	  } else {
	  map.setPaintProperty(layer_list[i], 'fill-opacity', 0);	
	  }

	}
	
	setTimeout(SettingOpacity, 1001);
	
	function SettingOpacity(){
	  if (index==0){
	  	console.log('initial layer '+ layers_list[index]);
	  	index++;
	  	setTimeout(SettingOpacity, 1001);
	  }
	  else if(index<layer_list.length){
	  	$('.year-display').text('Any: ' +layers_list[index-1]);
	  	console.log('starting fading '+ layers_list[index]);
	  	map.setPaintProperty(layer_list[index], 'fill-opacity', 1);
	  	index++;
	  	setTimeout(SettingOpacity, 1001); 
  		//console.log('faded! '+ layers_list[index]);
	  }
	  else if (index == layer_list.length) {
	  	$('.year-display').text('Any: ' + layers_list[index-1]);
	  	console.log('last layer '+ layers_list[index-1]);
	  	
	  }
		
	}



}
map.on('mousemove', '1857', function(e) {
	// Change the cursor style as a UI indicator.
	map.getCanvas().style.cursor = 'pointer';
	 
	// Single out the first found feature.
	var feature = e.features[0];
	console.log(feature);
	 
	// Query the counties layer visible in the map. Use the filter
	// param to only collect results that share the same county name.
	relatedFeatures = map.querySourceFeatures('municipis', {
		sourceLayer: 'pob_municipis_INE_4326',
		filter: ['==', 'nom_muni', feature.properties.nom_muni]
		});
	console.log(relatedFeatures);

	delete relatedFeatures[0].properties.COD_5;
	delete relatedFeatures[0].properties.nom_muni;
	myChart.data.datasets[0].label = feature.properties.nom_muni;
	myChart.data.labels = Object.keys(relatedFeatures[0].properties);
	myChart.data.datasets[0].data = Object.values(relatedFeatures[0].properties);
	myChart.update();
	
	map.setFilter('munis-highligted', ['==', 'nom_muni', feature.properties.nom_muni]);
	 
	// Display a popup with the name of the county
	popup.setLngLat(e.lngLat)
	.setText(feature.properties.nom_muni)
	.addTo(map);

});

map.on('mouseleave', '1857', function() {
	map.getCanvas().style.cursor = '';
	popup.remove();
	map.setFilter('munis-highligted', ['==', 'nom_muni', '']);
	//overlay.style.display = 'none';
	});


$('#animate-layers').click(function(){
	//fadeLayers(layers_list);
	//increaseOpacity('1986');
	FadeLayersTransition(layers_list);
	//fadeLayersManual(layers_list);
});

});

