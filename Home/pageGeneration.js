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
	else if("MapPage" == type) {
		generateMapContent(page);
	}
	else if("SettingsPage" == type) {
		generateSettingsContent(page);
	}
	page.loadPage();
}

// pre: page is a MakePage object
generateHomeContent = function(page) {

	page.loadPage();

	page.addContent("header","<h1>MyBus Home Page</h1>");
	page.addContent("header",'<div data-role="navbar"></div>');
	page.addContent("body",'<p class="welcome">Welcome to MyBus</p>');
	page.addContent("body",'<p class="disclaimer">*All times are approximate. Please arrive 5 minutes early.</p>');
	page.addContent("footer","<h1>An app developed by David Easley, Ryan Rodriguez, Josh Wu and Chen Long</h1>");

}


generateMapContent = function(page) {

	page.loadPage();

	page.addContent("header","<h1>MyBus City Map</h1>");
	page.addContent("header",'<div data-role="navbar"></div>');
	page.addContent("body", '<div id="map"></div>');

	var map = new GMaps({
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

	// refreshes map on page transition
	$(document).on( "pageshow", function() {
		map.refresh();
	});



}


// pre: page is a MakePage object
generateSettingsContent = function(page) {

	page.loadPage();

	page.addContent("header","<h1>Settings</h1>");
	
	// manage which page loads first on startup
	$startupButton = $('<a href="#popupStartup"" class="ui-btn" data-rel="popup">Start Up</a>');
	$startupPopup = $('<div data-role="popup" id="popupStartup"><p>This is a completely basic popup, no options set.</p></div>');
	
	page.addContent("body", $startupPopup);
	page.addContent("body", $startupButton);

	// manage favorites
	$favoritesButton = $('<a href="#popupFavorites"" class="ui-btn" data-rel="popup">Favorites</a>');
	$favoritesPopup = $('<div data-role="popup" id="popupFavorites"><p>This is a completely basic popup, no options set.</p></div>');
	
	page.addContent("body", $favoritesPopup);
	page.addContent("body", $favoritesButton);
	
	// manage where the map centers at startup
	$mapStartButton = $('<a href="#popupMapStart"" class="ui-btn" data-rel="popup">Starting Map Location</a>');
	$mapStartPopup = $('<div data-role="popup" id="popupMapStart"><p>This is a completely basic popup, no options set.</p></div>');
	
	page.addContent("body", $mapStartPopup);
	page.addContent("body", $mapStartButton);
	
	// manage font size
	$fontSizeButton = $('<a href="#popupFontSize"" class="ui-btn" data-rel="popup">Font Size</a>');
	$fontSizePopup = $('<div data-role="popup" id="popupFontSize"><p>This is a completely basic popup, no options set.</p></div>');
	
	page.addContent("body", $fontSizePopup);
	page.addContent("body", $fontSizeButton);


	page.addContent("footer","<h1>An app developed by David Easley, Ryan Rodriguez, Josh Wu and Chen Long</h1>");

}
