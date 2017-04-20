/****************************************************************
*																*
* Filename: pageGeneration.js									*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Implements creation/modification of pages			*
*																*
****************************************************************/

// pre: page is a MakePage object
//		type is a string ()
generateContent = function(page, type) {

	if("HomePage" == type) {
		generateHomeContent(page);
	}
	else if("RoutesPage" == type) {
		generateRouteContent(page);
	}
	else if("MapPage" == type) {
		generateMapContent(page);
	}
	else if("SettingsPage" == type) {
		generateSettingsContent(page);
	}
}

// pre: page is a MakePage object
generateHomeContent = function(page) {

	page.addContent("header","<h1>MyBus Home Page</h1>");
	page.addContent("header",'<div data-role="navbar"></div>');
	page.addContent("body",'<p class="welcome">Welcome to MyBus</p>');
	page.addContent("body",'<p class="disclaimer" style="text-align:center">*All times are approximate. Please arrive 5 minutes early.</p>');
	page.addContent("footer","<p class='credits'>An app developed by David Easley, Ryan Rodriguez, Josh Wu and Chen Long</p>");

}

generateRouteContent = function(page) {

	// Header
	page.addContent("header","<h1>Route Info</h1>");
	page.addContent("header",'<div data-role="navbar"></div>');

	// Body Text
	var routeName = "No Route Selected";
	page.addContent("body",'<h4 class="routesContent">' + routeName + '</h4>')
	var stopName = "No Stop Selected";
	var stopNum = "";
	page.addContent("body",'<p class="routesContent">Stop' + stopNum + ': ' + stopName + '</p>');
	var arrivalTime = "N/A";
	page.addContent("body",'<p class="routesContent">Next Arrival at: ' + arrivalTime + '</p>');

	// Body Buttons
	var $fatCollapsibleSet = $('<div class="ui-collapsible-set"></div>');
	var $fatCollapsible = $('<div data-role="collapsible"></div>');

	// modify buttons
	$fatCollapsible.append("<H4>Show Future Arrival Times");
	var $fatList = $('<ul data-role="listview" data-inset="false" style="min-width:210px;" data-theme="a"></ul>');

	/*TEMP ARRAY*/	var times = ["12:20 pm","12:40 pm","1:00 pm","1:20 pm","1:40 pm","2:00 pm"];	/*TEMP ARRAY*/

	for(var i = 0; i < times.length; i++) {

		$fatList.append('<li>' + times[i] + '</li>');
	}

	$fatCollapsible.append($fatList);
	$fatCollapsibleSet.append($fatCollapsible);

    // Favorite Button
    var $favButton = $('<a href="#popupFavPage" class="ui-btn" data-rel="popup">Favorite Route/Stop</a>');
    $favButton.click( function() {
        var favName = "Route " + bus.route + " Stop " + bus.stop;
        var success = favorites.addElement(favName, "RoutesPage", bus.route, bus.stop);
        if(success) {
            alert("Added to Favorites");
        }
        else {
            alert("Already Favorited");
        }
    });

	// append buttons
	page.addContent("body", $fatCollapsible);
   // page.addContent("body", $favPopup);
    page.addContent("body", $favButton);

	// Footer
	page.addContent("footer","<p class='credits'>An app developed by David Easley, Ryan Rodriguez, Josh Wu and Chen Long</p>");



}

//dynamically amend routes page with current bus stop information, go to routes page
// pre: stopArrayNum is the number in the busStops array of the selected stop
// routeID is the route_id of the selected route
amendRouteContent =  function(stopArrayNum, routeID){

	//clear current contents
	$(".routesContent").remove();
	var num = 0;
	var routeName = "Route Not Found";
	var stopNum = busStops[stopArrayNum].stop_code;
	var stopName = busStops[stopArrayNum].stop_name;
	var arrivalTime = "Never";

	//retrieve route information
	//function in busRoutes.js
	num = getLineNumFromID(routeID)
	if("Route Not Found" != num){
		routeName = busRoutes[num].route_name;
		arrivalTime = "12:00pm (this is a stub)";
	}

	menuPages[1].addContentBefore("body",'<p class="routesContent">Next Arrival at: ' + arrivalTime + '</p>');
	menuPages[1].addContentBefore("body",'<p class="routesContent">Stop ' + stopNum + ': ' + stopName + '</p>');
	menuPages[1].addContentBefore("body",'<h4 class="routesContent">' + routeName + '</h4>');

    // update current bus Route and Stop
    bus.route = routeID.slice(3,5);
    bus.stop = stopNum;
    
    updateHistory(menuPageIDs[1])();
}

generateMapContent = function(page) {

	page.addContent("header","<h1>MyBus City Map</h1>");
    
    // Load map
    page.addContent("body", '<div id="map"></div>');
    loadMap();

	// Modify navbar to include additional options for markers
	var $navbarMap = $('<div data-role="navbar"></div>');
	$navbarMap.append('<ul><li><a href="#popupMapMarkers" class="ui-btn" data-rel="popup">Display Route Options</a></li></ul>'); 
	page.addContent("header", $navbarMap);

    // Create Popup
	var $mapMarkersPopup = $('<div data-role="popup" id="popupMapMarkers" data-theme="a"></div>');
    
    // Create list and append to popup
	$mapMarkersPopup.append(createList());
    
	//	Load popup  
    page.addContent("body", $mapMarkersPopup);
    loadPopup();
    
    // Load map markers
    loadDisplayedMarkers();
    
	// Footer
	page.addContent("footer","<p class='credits'>An app developed by David Easley, Ryan Rodriguez, Josh Wu and Chen Long</p>");

}


// pre: page is a MakePage object
generateSettingsContent = function(page) {

	page.addContent("header","<h1>Settings</h1>");
	var $buttonSettingsList = $('<ul data-role="listview" data-inset="true" style="min-width:210px;"data-theme="a"></ul>');

	generateSettingsContentStartup(page, $buttonSettingsList);
	generateSettingsContentFavorites(page, $buttonSettingsList);
	generateSettingsContentMapStart(page, $buttonSettingsList);
	generateSettingsContentFontSize(page, $buttonSettingsList);

	page.addContent("body", $buttonSettingsList);
	page.addContent("footer","<p class='credits'>An app developed by David Easley, Ryan Rodriguez, Josh Wu and Chen Long</p>");

}


