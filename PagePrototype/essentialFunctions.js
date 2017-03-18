// Create object to keep track of current status
var currentStatus = new Object();
currentStatus.noStopInfo = true;
currentStatus.noBusInfo = true;
currentStatus.route = "";
currentStatus.stop = "";

main = function(){
	createAndDisplayGUI();
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





