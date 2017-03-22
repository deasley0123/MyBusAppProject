/****************************************************************
*																*
* Filename: main.js												*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Controls page generation, page history, config, etc.	*
*																*
****************************************************************/

//
// state variables
//

var pageHistory = []; // page stack - maybe encapsulate this in an object


//
// main thread
//

onPageLoad = function() {
	
	// load "loading" page
	$.mobile.initializePage();
	
	var menuPageIDs = ["homePage", "routesPage", "mapPage", "settingsPage"]; // array of menu page IDs -- In the future this list can be retrieved from config.txt
	var menuPages = [];														 // array of the menu pages
	
	// generate all menu pages
	for(i = menuPageIDs.length -1; i >= 0; i--){
		menuPages[i] = new MakePage(menuPageIDs[i]);
		generateContent(menuPages[i], menuPageIDs[i]);
	}
	
	
	// add to queue
	
	


}

//
// Set up initialization of the main thread
//

// prevent auto loading the first page
onMobileInit = function() {
    console.log("mobile init");
    $.mobile.autoInitialize = false;
}

// load a dynamically created page 
$(document).on("mobileinit", onMobileInit);
$(document).ready(onPageLoad);


//
//	external panel template
//
var $panel = $('<div data-role="panel" id="myPanel" data-position="left" data-display="reveal" data-theme="a"></div>');
$panel.append('<h2>Menu</h2>');
$panel.append('<p>Close the panel by pressing the ESC key, by swiping to the left or clicking outside of the panel.</p>');
$panel.append('<div id="nextPage" data-role="controlgroup" data-type="vertical">');

//	buttons:
$panel.append('<a href="#homePage" data-transition="slide" class="ui-btn">Home<a></div>');
$panel.append('<a href="#routesPage" data-transition="slide" class="ui-btn">Routes<a></div>');
$panel.append('<a href="#mapPage" data-transition="slide" class="ui-btn">Map<a></div>');
$panel.append('<a href="#settingsPage" data-transition="slide" class="ui-btn">Settings<a></div>');

$(document).one('pagebeforecreate', function () {
	$.mobile.pageContainer.prepend($panel);
	// Enhances all children of all elements in the set of matched elements.
	$panel.panel().enhanceWithin(); 
});
