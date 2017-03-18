// Create object to keep track of current status
var currentStatus = new Object();
currentStatus.noStopInfo = true;
currentStatus.noBusInfo = true;
currentStatus.route = "";
currentStatus.stop = "";

// Makes an external panel to make generating panels less code intensive.
/*
	Add this whenever you want to html:
	
	<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Open Panel</a>	
*/
var panel = '<div data-role="panel" id="myPanel" data-position="left" data-display="reveal" data-theme="a"><h2>Menu</h2><p>Close the panel by pressing the Esc key, by swiping to the left or clicking outside of the panel.</p><div id="nextPage" data-role="controlgroup" data-type="vertical"><a href="#somePage" data-transition="slide" class="ui-btn">Button<a></div></div>';

/*
	//jQuery
	.one() is used to attach a handler/trigger to an event for the elements. The handler/trigger is executed AT MOST ONCE per element per event type
	
	'pagebeforecreate' is triggered on the page being initialized, before most plugin auto-initialization occurs. Essentially, the "external-ness" of the panel.
*/
$(document).one('pagebeforecreate', function () {
	$.mobile.pageContainer.prepend(panel);
	
	// Enhances all children of all elements in the set of matched 
	// elements.
	$("#myPanel").panel().enhanceWithin(); 
});

/*
	FUNCTIONS
*/

main = function(){
	
	

	//createAndDisplayGUI();
}

createAndDisplayGUI = function(){

	// get routes from database
	var routeNames = createNamesOfRoutes(); // temp func
	
	// create buttons for each route
	for(var i = 0; i < routeNames.length; i++) {
		generateRouteButtons(routeNames[i]);
	}
	
	// create "go back" button and add it to the second page
	$('#pageTwoButtons').append('<a href="#" class="ui-btn" data-rel="back">Go Back</a>');
}



