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

var pageHistory = new Stack(); // page history - current page at top


//
// main thread
//

// moved to outside function for use with panel
var menuPageIDs = ["HomePage", "RoutesPage", "MapPage", "SettingsPage"]; // array of menu page IDs -- In the future this list can be retrieved from config.txt

onPageLoad = function() {
	
	// load "loading" page
	$.mobile.initializePage();
	
	var menuPages = [];				 // array of the menu pages
	
	// generate all menu pages
	for(i = menuPageIDs.length -1; i >= 0; i--){
		menuPages[i] = new MakePage(menuPageIDs[i]);
		generateContent(menuPages[i], menuPageIDs[i]);
	}
	
	
	// add to queue
	pageHistory.push(menuPageIDs[0]);
	


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

//
//	panel buttons
//

// Each button should add to history
updateHistory = function(pageName) {
	return function() {
		pageHistory.push(pageName);
	};
}

// set up each button from config
for(i = 0; i < menuPageIDs.length; i++){
	var $button = $('<a href="#' + menuPageIDs[i] + '" data-transition="slide" class="ui-btn">' + menuPageIDs[i].slice(0, -4) + '<a></div>');
	$button.click( updateHistory(menuPageIDs[i]) );
	$panel.append($button);
}

$(document).one('pagebeforecreate', function () {
	$.mobile.pageContainer.prepend($panel);
	// Enhances all children of all elements in the set of matched elements.
	$panel.panel().enhanceWithin(); 
});
