            var mapRouteBar;
            var destinationBar = {lat: 41.63165290101946,  
                                  lng: 2.1671149134635925, 
                                  name: 'Bar Can Fanga'
                                  };
            var startPoint = {lat: 41.63280613273712,   
                              lng: 2.1626203582127346, 
                              };
            var routePoints = [new google.maps.LatLng(41.63280613273712, 2.1626203582127346),
                            new google.maps.LatLng(41.63256205629822, 2.1627512723262043),
                            new google.maps.LatLng(41.63245480270423, 2.162881113572439),
                            new google.maps.LatLng(41.63248086434163, 2.1630809381440486),
                            new google.maps.LatLng(41.63243375291249, 2.1634269431069697),
                            new google.maps.LatLng(41.632382631961114, 2.163675047461311),
                            new google.maps.LatLng(41.632169126372936, 2.1637944057624736),
                            new google.maps.LatLng(41.631849367854876, 2.164086766545097),
                            new google.maps.LatLng(41.631313092171304, 2.1645615175202693),
                            new google.maps.LatLng(41.63198769618587, 2.1659374908267637),
                            new google.maps.LatLng(41.63194559629048, 2.165926761990704),
                            new google.maps.LatLng(41.63128703006179, 2.166536964541592),
                            new google.maps.LatLng(41.63155667214692, 2.1671686247645994)
                        ];
            var destinationBarLatLng = new google.maps.LatLng(destinationBar.lat, destinationBar.lng);
            routePoints.push(destinationBarLatLng);   

           function initRouteBarMap() {
                
                var mapOptions = {
                    zoom: 18,
                    center: new google.maps.LatLng(41.63222281469203, 2.1643770039190713),
                    mapTypeId: 'hybrid',
                    disableDefaultUI: true,
                    
                };

                mapRouteBar = new google.maps.Map(document.getElementById('map-canvas-route'), mapOptions);
                
                crearMarker(startPoint, 'S', 'Tu ubicacion');
                crearMarker(destinationBar, 'E', 'Destino');

                var polOpt = {
                    path: routePoints,
                    map: mapRouteBar,
                    strokeColor:'#0000ff',
                    strokeWeight: '7'
                };  

                var route = new google.maps.Polyline(polOpt);  
                var trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(mapRouteBar);
            }

            function crearMarker(binfo, label,text) {
                var point = new google.maps.LatLng(binfo.lat,binfo.lng);
                var pOptions = {
                    position: point,
                    label: label,
                    map: mapRouteBar, 
                    title: binfo.name
                };
                var marker = new google.maps.Marker(pOptions);
                var wopt = {
                    content: text
                };
                var infow = new google.maps.InfoWindow(wopt);
                infow.open(mapRouteBar,marker);               
            }

            google.maps.event.addDomListener(window, 'load', initRouteBarMap);