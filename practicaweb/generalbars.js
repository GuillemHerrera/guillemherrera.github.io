            var mapGeneralBars;
            
            function initGeneralBarsMap() {
                
                var mapOptions = {
                    zoom: 15,
                    center: new google.maps.LatLng(41.62817453698642, 2.167350947856903),
                    mapTypeId: 'hybrid',
                    disableDefaultUI: true,
                    fullscreenControl: true,
                    fullscreenControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM}


                };
                mapGeneralBars = new google.maps.Map(document.getElementById('map-canvas-close'),mapOptions);
                bares.forEach(crearMarker);
                
            }

            function crearMarker(binfo) {
                var point = new google.maps.LatLng(binfo.lat,binfo.lng);
               
                    if (binfo.name == 'Bar Can Fanga'){
                                var wopt = {
                                    content: '<div class="infoW-content">'
                                                + '<h2 class="infoW-name">' +binfo.name + '</h2>'
                                                + '<p> <strong>Dirección: </strong>' +binfo.adress + '</p>'
                                                + '<p> <strong>Telefono: </strong>' +binfo.telf + '</p>'
                                                + '<p> <strong>Su mejor tapa: </strong>' +binfo.tapa1 + '</p>'
                                                + '<p class="infoW-parent-img"><img class="infoW-img" src="' + binfo.img1 + '" /></p>'
                                                + '<p class="infoW-parent-buttons"><a class="indic" href="'+ binfo.url +'"> Visita su página </a>'
                                                + '<a class="indic" href="route.html"> Como llegar </a></p>'
                                            + '</div>'
                                };
                                var pOptions = {
                                    position: point, 
                                    map: mapGeneralBars, 
                                    title: binfo.name,
                                    label: 'L',
                                };

                    }else{
                                 var wopt = {
                                    content: '<div class="infoW-content">'
                                                + '<h2 class="infoW-name">' +binfo.name + '</h2>'
                                                + '<p> <strong>Dirección: </strong>' +binfo.adress + '</p>'
                                                + '<p> <strong>Telefono: </strong>' +binfo.telf + '</p>'
                                                + '<p> <strong>Su mejor tapa: </strong>' +binfo.tapa1 + '</p>'  
                                                + '<p class="infoW-parent-img"><img class="infoW-img" src="' + binfo.img1 + '" /></p>'
                                                + '<p class="infoW-parent-buttons"><a class="indic" href="'+ binfo.url +'"> Visita su página </a></p>'
                                            + '</div>'
                                };
                                var pOptions = {
                                    position: point, 
                                    map: mapGeneralBars, 
                                    title: binfo.name,
                                };
                    }
                
                var marker = new google.maps.Marker(pOptions);
                var infow = new google.maps.InfoWindow(wopt);
               
                google.maps.event.addListener(marker, 'click', function() {
                    infow.open(mapGeneralBars,marker);
                });
                google.maps.event.addListener(mapGeneralBars, 'click', function() {
                    infow.close(mapGeneralBars,marker);
                });
                
            }

            google.maps.event.addDomListener(window, 'load', initGeneralBarsMap);