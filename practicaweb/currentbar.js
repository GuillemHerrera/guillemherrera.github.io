            var mapCurrent;
            var currentBar ={};

            function initCurrentBarMap() {
                var currentBarName = document.getElementById("name").innerHTML;
                var mapOptions = {
                    zoom: 18,
                    center: new google.maps.LatLng(41.62817453698642, 2.167350947856903),
                    mapTypeId: 'hybrid',
                    disableDefaultUI: true,
                };

                mapCurrent = new google.maps.Map(document.getElementById('map-canvas'),
                    mapOptions);

                currentBar = getByValue(bares,currentBarName);
                crearMarker(currentBar);
                setBarContent();
            }

            function crearMarker(binfo) {
                var point = new google.maps.LatLng(binfo.lat,binfo.lng);
                mapCurrent.setCenter(point);  
                var pOptions = {
                    position: point, 
                    map: mapCurrent, 
                    title: binfo.name
                };
                var marker = new google.maps.Marker(pOptions);
                var wopt = {
                    content: '<div class="infoW-content">'
                                    + '<h2 class="infoW-name">' +binfo.name + '</h2>'
                                    + '<p>' + binfo.desc + '</p>' 
                                    + '<p class="infoW-parent-img"><img class="infoW-img" src="' + binfo.img1 + '" /></p>'
                                + '</div>'
                }
                var infow = new google.maps.InfoWindow(wopt);
                google.maps.event.addListener(marker, 'click',  function (event) {
                    infow.open(mapCurrent,marker);
                });
                google.maps.event.addListener(mapCurrent, 'click',  function (event) {
                    infow.close(mapCurrent,marker);
                });
                
            }
            
            function getByValue(array, value) {

              for ( i=0; i<=array.length; i++) {
                if (array[i].name == value) 
                return array[i];
              }
            }

            function setBarContent(){
                document.getElementById('img1').setAttribute("src", currentBar.img1);
                document.getElementById('img2').setAttribute("src", currentBar.img2);
                document.getElementById('tapa1').innerHTML=currentBar.tapa1;
                document.getElementById('tapa2').innerHTML=currentBar.tapa3;
                document.getElementById('tapa3').innerHTML=currentBar.tapa2;
                document.getElementById('bar-telf').innerHTML='<strong>Telf: </strong>'+ currentBar.telf;
                document.getElementById('bar-adress').innerHTML='<strong>Dirección: </strong>'+ currentBar.adress;
                document.getElementById('bar-desc').innerHTML= currentBar.desc;
            }
            
            google.maps.event.addDomListener(window, 'load', initCurrentBarMap);
           