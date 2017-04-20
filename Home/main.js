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

// global map variable
var map;

//	Global Map Marker Variable
var markers = [];

// variable for displaying routes
var displayedRoutes = [];
for(var i = 0; i < busRoutes.length; i++) {
    displayedRoutes.push([busRoutes[i].route_id,true]);
}

//global favorites variable
var favorites;

// global variable to track current bus route/stop
var bus = {};
bus.route = 0;
bus.stop = 0;

// moved to outside function for use with panel
var menuPageIDs = ["HomePage", "RoutesPage", "MapPage", "SettingsPage"]; // array of menu page IDs -- In the future this list can be retrieved from config.txt
var menuPages = []; // array of the menu pages

onPageLoad = function() {

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
$panel.append('<h2 style="text-align: center;">Menu</h2>');
$buttonPanelList = $('<ul id="panelList" data-role="listview" data-inset="true" style="min-width:210px;"data-theme="a"></ul>');

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
			var $backButton = $('<a href="#' + pageHistory.peek() + '" id="BackButton' + newLength + '" data-icon="back" class="ui-btn-right ui-link ui-btn ui-icon-back ui-btn-icon-left ui-shadow ui-corner-all" data-role="button" role="button">Back</a>');
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
	var $button = $('<li><a href="#' + menuPageIDs[i] + '" data-transition="slide" class="ui-btn">' + menuPageIDs[i].slice(0, -4) + '</a></li>');
	$button.click( updateHistory(menuPageIDs[i]) );
	$buttonPanelList.append($button);
}
$panel.append($buttonPanelList)

// controls which page displays first
var numPageShows = 0;
var startPageID = menuPageIDs[currentSettings.getStartPage()];
$(document).on("pagebeforeshow ",function(event){
	numPageShows++;
	if(numPageShows == 2) {
		$(':mobile-pagecontainer').pagecontainer("change", "#"+startPageID, { }); //switches to page
	}
});

$(document).one('pagebeforecreate', function () {

	$.mobile.pageContainer.prepend($panel);
	favorites = new Favorite();
	// Enhances all children of all elements in the set of matched elements.
	$panel.panel().enhanceWithin();
});


// animates collapsibles
// http://stackoverflow.com/questions/23566967/jquerymobile-1-4-2-animate-collapsible
$(document).on("pagecreate", function(){
    $(".ui-collapsible-heading-toggle").on("click", function (e) {
        var current = $(this).closest(".ui-collapsible");
        if (current.hasClass("ui-collapsible-collapsed")) {
            //collapse all others and then expand this one
            $(".ui-collapsible").not(".ui-collapsible-collapsed").find(".ui-collapsible-heading-toggle").click();
            $(".ui-collapsible-content", current).slideDown(300);
		}
		else {
			$(".ui-collapsible-content", current).slideUp(300);
		}
	});
});

//adjustheight
//http://stackoverflow.com/questions/19591991/dynamically-assign-height-to-jquery-mobile-page-based-on-device
function ScaleContentToDevice() {
    scroll(0, 0);
    var headerHeight = $(".ui-header:visible").outerHeight();
    var footerHeight = $(".ui-footer:visible").outerHeight();
    var viewportHeight = $(window).height();

    var content = $(".ui-content:visible");
    var contentMargins =  content.outerHeight() - content.height();

    var contentheight = viewportHeight - headerHeight - footerHeight - contentMargins;

    content.height(contentheight);
};

$(document).on("pageshow", function(){
    ScaleContentToDevice();
});
