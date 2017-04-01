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


	var menuPages = [];				 // array of the menu pages

	// load "loading" page
	$.mobile.initializePage();
		
	// generate all menu pages
	for(var i = menuPageIDs.length -1; i >= 0; i--){
		menuPages[i] = new MakePage(menuPageIDs[i]);
		menuPages[i].loadPage();
		generateContent(menuPages[i], menuPageIDs[i]);
		menuPages[i].loadPage();
	}
	
	// add to queue
	pageHistory.push(menuPageIDs[currentSettings.getStartPage()]);

	// check settings
	currentSettings.updateFontSize();
	


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
//$panel.append('<div id="nextPage" data-role="controlgroup" data-type="vertical">');

//
//	panel buttons
//

// updates history/controls back buttons
// each back button is named "BackButton1", "BackButton2", etc.
updateHistory = function(pageName) {
	return function() {
		// do nothing if not directing to a new page
		if( pageHistory.peek() != pageName ) {

			// hide previous back button if it exists
			// in others words, only if a third page has been navigated to
			if(pageHistory.length() > 2) {
				$( "#BackButton" + pageHistory.length() ).hide();
			}

			// index of new back button (starts at 2)
			var newLength = pageHistory.length()+1; // avoiding type coercion

			// create new back button
			$backButton = $('<a href="#' + pageHistory.peek() + '" id="BackButton' + newLength + '" data-icon="back" class="ui-btn-right ui-link ui-btn ui-icon-back ui-btn-icon-left ui-shadow ui-corner-all" data-role="button" role="button">Back</a>');
			$backButton.click( function() {

				// remove current page
				pageHistory.pop();
				$( "#BackButton" + newLength ).remove();

				// show previous page's back button
				if(pageHistory.length() > 1) {
					$( "#BackButton"  + pageHistory.length() ).show();
				}
			});
			$("#" + pageName + "Header").append($backButton);
			pageHistory.push(pageName);
		}
	};
}

// set up each button from config
for(var i = 0; i < menuPageIDs.length; i++){
	var $button = $('<a href="#' + menuPageIDs[i] + '" data-transition="slide" class="ui-btn">' + menuPageIDs[i].slice(0, -4) + '</a>');
	$button.click( updateHistory(menuPageIDs[i]) );
	$panel.append($button);
}

// controls which page displays first
var numPageShows = 0;
var startPageID = menuPageIDs[currentSettings.getStartPage()];
$(document).on("pagebeforeshow ",function(event){
	numPageShows++;
	if(numPageShows == 2) {
		$(':mobile-pagecontainer').pagecontainer("change", "#"+startPageID, { }); //switches to page
	}
});

	//$panel.append($favorites);

$(document).one('pagebeforecreate', function () {
	$.mobile.pageContainer.prepend($panel);
	// Enhances all children of all elements in the set of matched elements.
	$panel.panel().enhanceWithin();
});


