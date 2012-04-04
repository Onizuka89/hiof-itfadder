Ext.define('ITFadder.view.Studentmap', {
	extend: 'Ext.Panel',
    xtype: 'mapcard',
	config: {
        iconCls: 'maps',
        title: 'Kart',
        items: [
		{
			xtype: 'titlebar',
			docked: 'top',
			title: '<p>Studentkart</p>',
		},
		{
			
			
			xtype: 'map',
			mapOptions : {
                center : position, 
                zoom : 14,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                navigationControl: false,
                overviewMapControl: false,
                scaleControl: false,
                mapTypeControl: false,
                panControl: false,
                zoomControl: true
                //Zoom controls are needed as pinch-zoom is not 
                //supported by PhoneGap on most Android phones
            },
            plugins : [
                new Ext.plugin.google.Tracker({
                    trackSuspended: true,   //suspend tracking initially
                    allowHighAccuracy: true,
                    marker: new google.maps.Marker({
                        position: position,
                        title: 'Du er her',
                        shadow: shadow,
                        icon: image
                    })
                }),
                new Ext.plugin.google.Traffic()
            ],
            listeners: {
                maprender: function(comp, map) {
                    var directionsDisplay = new google.maps.DirectionsRenderer();
					var directionsService = new google.maps.DirectionsService();
					directionsDisplay.setMap(map);
					
					var remmen = new google.maps.Marker({
                        position: new google.maps.LatLng(59.129102,11.352654),
                        title : 'Remmen',
                        map: map
                    });
					var stadion = new google.maps.Marker({
						position: new google.maps.LatLng(59.122655,11.376193),
						title: 'Stadion studentboliger',
						map: map
					});
					
					var kongens = new google.maps.Marker({
						position: new google.maps.LatLng(59.11869,11.388488),
						title: 'Kongens',
						map: map
					});
					

                    google.maps.event.addListener(remmen, 'click', function() {
                        infowindow.setContent("H�gskolen i �stfold");
						infowindow.open(map, remmen);
                    });					
					google.maps.event.addListener(remmen, 'dblclick', function() {
						calcRoute(position, remmen.position, map)  
                    });
					
					google.maps.event.addListener(stadion, 'click', function() {
                        infowindow.setContent("Stadion studentboliger");
						infowindow.open(map, stadion);
                    });					
					google.maps.event.addListener(stadion, 'dblclick', function() {
                        calcRoute(position, stadion.position, map)   
                    });
					
					google.maps.event.addListener(kongens, 'click', function() {
                        infowindow.setContent("Kongens");
						infowindow.open(map, kongens);
                    });					
					google.maps.event.addListener(kongens, 'dblclick', function() {
                        calcRoute(position, kongens.position, map)
                    });
                }

            }
		}
        ]
    }
});