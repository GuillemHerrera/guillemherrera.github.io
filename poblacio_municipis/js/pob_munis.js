var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapboxgl-styles/mapa_municipal.json',
    hash: true,
    center: [-1.7, 41.4],
    zoom: 5
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

var layers_list = ['1857', '1877', '1900','1910', '1920', '1930', '1936', '1940',
					'1945', '1950', '1955', '1960', '1965', '1970', '1975', '1981', '1986'];
$('.year-display').text(layers_list[0]);



map.on('load', function() {

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


function increaseOpacity(layer_id){

	var opacity = map.getPaintProperty(layer_id, 'fill-opacity');
	opacity += 0.1;
	map.setPaintProperty(layer_id, 'fill-opacity', opacity);
	console.log(opacity);

}

var fading;
var index = 0;
var opacity_current = 1;
var opacity_next = 0;
//console.log('fading' + layers_list[index]);
map.setPaintProperty(layers_list[0], 'fill-opacity', 1);
map.setPaintProperty(layers_list[1], 'fill-opacity', 0);
map.setPaintProperty(layers_list[2], 'fill-opacity', 0);


function fadeLayersManual(layer_list) {

        opacity_current -= 0.1;
        opacity_next += 0.1;

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
        console.log(opacity_next);
        }

    }

function FadeLayersTransition(layer_list){
	var index=0;
	var i;
	console.log('reseting layers-opacity');
	for (i = 0; i < layer_list.length; i++) {
	  if (i==0){
	  $('.year-display').text(layers_list[i]);
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
	  	$('.year-display').text(layers_list[index-1]);
	  	console.log('starting fading '+ layers_list[index]);
	  	map.setPaintProperty(layer_list[index], 'fill-opacity', 1);
	  	index++;
	  	setTimeout(SettingOpacity, 1001); 
  		//console.log('faded! '+ layers_list[index]);
	  }
	  else if (index == layer_list.length) {
	  	$('.year-display').text(layers_list[index-1]);
	  	console.log('last layer '+ layers_list[index-1]);
	  	
	  }
		
	}



}


$('#animate-layers').click(function(){
	//fadeLayers(layers_list);
	//increaseOpacity('1986');
	FadeLayersTransition(layers_list);
	//fadeLayersManual(layers_list);
});

});

