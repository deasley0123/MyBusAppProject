//
// Where secondary changes to MapPage go
//

// create marker display button for a list
// return the option
createMapMarkerOption = function(index) {
    
    var $mapMarkerOption = $('<label><input class="markerRoute" type="checkbox" data-theme="b"/>' + busRoutes[index].route_num + ' - ' + busRoutes[index].route_name + '</label>');
    
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
        //console.log(JSON.stringify(displayedRoutes.length));
        loadDisplayedMarkers();
        
    });
    return $mapMarkerOption;
    
}

createList = function() {
    
	// apply formatting to popup element
	//var $mapMarkersList = $('<ul data-role="listview" data-inset="true" style="min-width:210px;"data-theme="b"></ul>');
    var $mapMarkersList = $('<div id="checkboxList" data-role="controlgroup"></div>');
	$mapMarkersList.append('<legend style="margin: auto;"><h4 data-theme="a">Display Route Options</h4>');

	// add button to the popup list which displays/disables a Route's markers(popup from the Navbar)
	for(var i = 0; i < busRoutes.length; i++)
	{
		$mapMarkersList.append( createMapMarkerOption(i) );
	}

	// display all markers from the popup button
	var $mapMarkerOption = $('<a class="ui-btn allMarkers">Display All Routes</a>');
	$mapMarkerOption.click( loadAllMarkers );
	$mapMarkersList.append($mapMarkerOption);

	// hide all markers from the popup button
	$mapMarkerOption = $('<a class="ui-btn allMarkers">Remove All Routes</a>');
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
    // check all of the checkboxes in the popup
    $(".markerRoute").prop( "checked", true );
}

// Load map
loadMap = function() {
    
    var center = currentSettings.getMapCenter();
	map = new GMaps({
		el: "#map",
        lat: center[0],
        lng: center[1],
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
            loadStopMarker(i);
        } 
    } // End First Loops
}


loadStopMarker = function(index) {
    
    var mapRouteButton = '';
    for(var j = 0; j < (busStops[index])["route_id_arr"].length; j++)
    {
        var mapRouteName = "Route " + (busStops[index])["route_id_arr"][j].slice(3,5);
        var routeID = "\'" + (busStops[index])["route_id_arr"][j] + "\'";
        mapRouteButton = mapRouteButton + '<li><a class="ui-btn" onclick="amendRouteContent('+ index + ',' + routeID + ')" href="#RoutesPage" >' + mapRouteName + '</a></li>';
    }
    var markerObject = map.addMarker( {
        lat: busStops[index].stop_lat,
        lng: busStops[index].stop_lon,
        title: busStops[index].stop_name,
        infoWindow: {
            content: '<p>'+busStops[index].stop_name+'</p><p>Stop '+busStops[index].stop_code+
            '</p><ul>' + mapRouteButton + '</ul>'
        }
    } );
}


// load all map markers
loadAllMarkers = function() {
  
    // set all routes to be displayed
    for (var i = 0; i < displayedRoutes.length; i++) {
        displayedRoutes[i][1] = true;
    }
    for(var i = 0; i < busStops.length; i++) {
        loadStopMarker(i);
    }
    //console.log($(".markerRoute").exists());
    $(':checkbox').prop("checked", true).checkboxradio("refresh");
}

removeAllMarkers = function() { 

    // set all routes to not be displayed
    for (var i = 0; i < displayedRoutes.length; i++) {
        displayedRoutes[i][1] = false;
    }
    map.removeMarkers(); 
    //console.log($(".markerRoute").exists());
    $(':checkbox').prop("checked", false).checkboxradio("refresh");
}
