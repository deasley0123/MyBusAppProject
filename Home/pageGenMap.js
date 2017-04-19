//
// Where secondary changes to MapPage go
//

// create marker display button for a list
// return the option
createMapMarkerOption = function(index) {
    
    var $mapMarkerOption = $('<li><a href="#" class="ui-btn">' + busRoutes[index].route_num + ' - ' + busRoutes[index].route_name + '</a></li>');
    
    var busRoutesID = busRoutes[index].route_num;

    //
    // the anon function should toggle/appear to toggle the approriate route
    // current implemenation simply loads the single route without any context for other routes
    //
    // current idea:    save currently displayed routes to a 2D array where each entry is [route, isDisplayed]
    //                  check given route in array to see if isDisplayed = true
    //                  if so,  set isDisplayed to false and display all routes where isDisplayed = true
    //                  if not, set isDisplayed to true  and display all routes where isDisplayed = true
    
    $mapMarkerOption.click( function() {
        map.removeMarkers();
        
        //go through busStops array
        for(var j = 0; j < busStops.length; j++)
        {
            //go through route_id array within each busStop array element
            for(var k = 0; k < (busStops[j])["route_id_arr"].length; k++)
            {
                // Variables for the mapRouteButton
                var busStopRouteID = (busStops[j])["route_id_arr"][k].slice(3,5);  
                var mapRouteName = "Route " + busRoutesID;
                var mapRouteButton = '';
                var routeID = "\'" + (busStops[j])["route_id_arr"][k] + "\'";
                
                // Create button for each route on the button
                mapRouteButton = mapRouteButton + '<li><a class="ui-btn" onclick="amendRouteContent('+ j + ',' + routeID + ')" href="#RoutesPage" >' + mapRouteName + '</a></li>';
                if(busRoutesID == busStopRouteID)
                {
                    var markerObject = map.addMarker(
                    {
                        lat: busStops[j].stop_lat,
                        lng: busStops[j].stop_lon,
                        title: busStops[j].stop_name,
                        infoWindow: {
                            //content: '<p>'+busStops[j].stop_name+'</p><p>Stop '+busStops[j].stop_code+'</p>'+"<button onclick='amendRouteContent("+j+","+busStops[j].route_id_arr+")'>Click me</button>"
                            content: '<p>'+busStops[j].stop_name+'</p><p>Stop '+busStops[j].stop_code+'</p><ul>' + mapRouteButton + '</ul>'
                        }
                    });
                }
            }
        }
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
	$mapMarkerOption.click( map.removeMarkers );
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

// load all map markers
loadAllMarkers = function() {
	
    for(var i = 0; i < busStops.length; i++)
	{
		var mapRouteButton = '';
		for(var j = 0; j < (busStops[i])["route_id_arr"].length; j++)
		{
			var mapRouteName = "Route " + (busStops[i])["route_id_arr"][j].slice(3,5);
			var routeID = "\'" + (busStops[i])["route_id_arr"][j] + "\'";
			mapRouteButton = mapRouteButton + '<li><a class="ui-btn" onclick="amendRouteContent('+ i + ',' + routeID + ')" href="#RoutesPage" >' + mapRouteName + '</a></li>';
		}
		var markerObject = map.addMarker(
		{
			lat: busStops[i].stop_lat,
			lng: busStops[i].stop_lon,
			title: busStops[i].stop_name,
			infoWindow: {
				content: '<p>'+busStops[i].stop_name+'</p><p>Stop '+busStops[i].stop_code+
				'</p><ul>' + mapRouteButton + '</ul>'
			}
		});
	}
}