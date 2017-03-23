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
	else if("MapPage" == type)
	{
		generateMapContent(page);
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
	page.addContent("header",'<script type="text/javascript">' + 
    'var map;' +
    '$(document).ready(function(){' +
      'map = new GMaps({' +
        'el: "#map",' +
        'lat: 38.955028,' + 
        'lng: -95.262750,' +
        'zoomControl : true,' +
        'zoomControlOpt: {' +
            'style : "SMALL",' +
            'position: "TOP_LEFT"' +
        '},' +
        'panControl : false,' +
        'streetViewControl : false,' +
        'mapTypeControl: false,' +
        'overviewMapControl: false' +
      '});' +
    '});' +
  '</script>');
  page.addContent("body", '<div class="row"> <div class="span11"> <div id="map"> </div></div></div>')

	
	
}
