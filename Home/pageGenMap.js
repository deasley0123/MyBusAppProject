//
// Where secondary changes to MapPage go
//

// create marker display button for a list
// return the option
createMapMarkerOption = function(index) {
    
    var $mapMarkerOption = $('<li><a href="#" class="ui-btn">' + busRoutes[index].route_num + ' - ' + busRoutes[index].route_name + '</a></li>');
    
    var busRouteID = busRoutes[index].route_id;
    //
    // the anon function should toggle/appear to toggle the approriate route
    // current implemenation simply loads the single route without any context for other routes
    //
    // current idea:    save currently displayed routes to a 2D array where each entry is [route, isDisplayed]
    //                  check given route in array to see if isDisplayed = true
    //                  if so,  set isDisplayed to false and display all routes where isDisplayed = true
    //                  if not, set isDisplayed to true  and display all routes where isDisplayed = true
    
    $mapMarkerOption.click( function() {
        
        // toggle current route's display condition
        for (var i = 0; i < displayedRoutes.length; i++) {
            if (displayedRoutes[i][0] == busRouteID) {
                displayedRoutes[i][1] = !displayedRoutes[i][1]; // toggle true/false
            }
        }
        loadDisplayedMarkers();
        
    });
    return $mapMarkerOption;
    
}

createList = function() {
    
	// apply formatting to popup element
	var $mapMarkersList = $('<ul data-role="listview" data-inset="true" style="min-width:210px;"data-theme="b"></ul>');
	$mapMarkersList.append('<li data-role="divider" data-theme="a">Routes</li>');

	// add button to the popup list which displays/disables a Route's markers(popup from the Navbar)
	for(var i = 0; i < busRoutes.length; i++)
	{
		$mapMarkersList.append( createMapMarkerOption(i) );
	}

	// display all markers from the popup button
	var $mapMarkerOption = $('<li><a href="#" class="ui-btn">' + 'Display All Markers' + '</a></li>');
	$mapMarkerOption.click( loadAllMarkers );
	$mapMarkersList.append($mapMarkerOption);

	// hide all markers from the popup button
	$mapMarkerOption = $('<li><a href="#" class="ui-btn">' + 'Remove All Markers' + '</a></li>');
	$mapMarkerOption.click( removeAllMarkers );
	$mapMarkersList.append($mapMarkerOption);
    
    return $mapMarkersList;
}

// Load popup
loadPopup = function() {

	//add scrolling capability
	$('#popupMapMarkers').css('overflow-y', 'scroll');

	$('#popupMapMarkers').on(
	{
		popupbeforeposition: function()
		{
			var maxHeight = $(window).height() - 70;
			$('#popupMapMarkers').css('max-height', maxHeight + 'px');
		}
	});
}

// Load map
loadMap = function() {
    
	map = new GMaps({
		el: "#map",
		lat: 38.955028,
		lng: -95.262750,
		zoomControl : true,
		zoomControlOpt: {
			style : "SMALL",
			position: "TOP_LEFT"
		},
		panControl : false,
		streetViewControl : false,
		mapTypeControl: false,
		overviewMapControl: false,
		width: "95%",
		height: "95%"
	});
        // refresh map on page transition
	$(document).on( "pageshow", function() {
		map.refresh();
	});
    
}

// load map markers as indicated by displayedRoutes[]
loadDisplayedMarkers = function() {
	
    map.removeMarkers();
    console.log( JSON.stringify(displayedRoutes) );
    
    // check if stop has a route to be displayed
    // first loop - iterate through stops
    loop1:
    for(var i = 0; i < busStops.length; i++) {
        
        // second loop - iterate through routes on given stop
        var shouldDisplay = false;
        loop2:
        for(var j = 0; j < busStops[i].route_id_arr.length; j++) {
            
            // third loop - check if stop has a route to be displayed
            loop3:
            for(var k = 0; k < displayedRoutes.length; k++) {
                if(   ( busStops[i].route_id_arr[j] == displayedRoutes[k][0] )
                                                    && displayedRoutes[k][1] ) {
                    shouldDisplay = true;
                    break loop2; // leave second loop
                }
            }
        }
        // display this stop marker
        if(shouldDisplay) {  
            var mapRouteButton = '';
            for(var j = 0; j < (busStops[i])["route_id_arr"].length; j++)
            {
                var mapRouteName = "Route " + (busStops[i])["route_id_arr"][j].slice(3,5);
                var routeID = "\'" + (busStops[i])["route_id_arr"][j] + "\'";
                mapRouteButton = mapRouteButton + '<li><a class="ui-btn" onclick="amendRouteContent('+ i + ',' + routeID + ')" href="#RoutesPage" >' + mapRouteName + '</a></li>';
            }
            var markerObject = map.addMarker( {
                lat: busStops[i].stop_lat,
                lng: busStops[i].stop_lon,
                title: busStops[i].stop_name,
                infoWindow: {
                    content: '<p>'+busStops[i].stop_name+'</p><p>Stop '+busStops[i].stop_code+
                    '</p><ul>' + mapRouteButton + '</ul>'
                }
            } );
        } // End IF
    } // End First Loops
}

// load all map markers
loadAllMarkers = function() {
  
    for(var i = 0; i < busRoutes.length; i++) {
        displayedRoutes.push([busRoutes[i].route_id,true]);
    }
    loadDisplayedMarkers();
}

removeAllMarkers = function() { 

    // set all routes to not be displayed
    for (var i = 0; i < displayedRoutes.length; i++) {
        displayedRoutes[i][1] = false;
    }
    map.removeMarkers(); 
}
