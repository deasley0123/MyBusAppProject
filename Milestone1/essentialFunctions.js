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

/*
	Button Generation Section
*/

// creating buttons for each route
generateRouteButtons = function(name) {

	// creating a button with id and text set to "name"
	var $btn = $('<a href="#pageThree" data-transition="slide" id="' + name + '" class="ui-btn">' + name + '</a>');
	
	//console.log("Got Here A");
	
	// set button click to create stop buttons
	($btn).click( function() {
		
		// update current route
		currentStatus.route = name;
		
		//console.log("Got Here B");

		// get list of stops from database
		var stopNames = createNamesOfStops(); // temp func
		
		// remove previous stop buttons if any exist
		if(currentStatus.noStopInfo) {
			currentStatus.noStopInfo = false;
		}
		else {
			removeStops();
		}
		
		// generate new set of stop buttons
		for(var i = 0; i < stopNames.length; i++) {
			generateStopButtons(stopNames[i]);
		}
		
		// create a "go back" button
		$('#pageThreeButtons').append('<a href="#" class="ui-btn" data-rel="back">Go Back</a>');
	});
	
	// add newly created button to second page
	$('#pageTwoButtons').append($btn);	
}

// generate stop buttons
generateStopButtons = function(name) {
	
	// create a stop button with id and text set to "name"
	var $btn = $('<a href="#pageData" data-transition="slide" id="' + name + '" class="ui-btn">' + name + '</a>');
	
	//console.log("Got Here C");
	
	// set button click to create a bus info page
	($btn).click( function() {
		
		// update current stop
		currentStatus.stop = name;
		
		// remove previous bus info if any exists
		if(!currentStatus.noBusInfo) {
			currentStatus.noStopInfo = false;
		}
		else {
			removeBusInfo();
		}
		
		// create bus info page
		generateDataPage();
	});
	
	// add newly created button to third page
	$('#pageThreeButtons').append($btn);
	
}
// create bus info page
generateDataPage = function() {
	//console.log("SUCCESS!");
	
	// update body with current bus info
	$('#body_data').append('<p>Bus route: ' + currentStatus.route + '</p><p>Bus stops: ' + currentStatus.stop + '</p><p>Next bus arrival: ' + getTimes() + '</p>');
	
	// create "go back" button and add to data page
	$('#body_data').append('<a href="#" class="ui-btn" data-rel="back">Go Back</a>');
}

//TEMPORARY FUNCTION
createNamesOfStops = function() {
	
	stops = [];
	for( var i = 0; i < 15; i++) {
		stops[i] = "Stop " + i;
	}
	return stops;

}

//TEMPORARY FUNCTION
createNamesOfRoutes = function() {
	
	routes = [];
	for( var i = 0; i < 15; i++) {
		routes[i] = "Route " + i;
	}
	return routes;

}

//TEMPORARY FUNCTION
getTimes = function() {
	// temporary function
	var exampleTimes = [	"am:6:27",
							"am:6:57",
							"am:7:27",
							"am:7:57",
							"am:8:27",
							"am:8:57",
							"am:9:27",
							"am:9:57",
							"am:10:27",
							"am:10:57",
							"am:11:27",
							"am:11:57",
							"pm:12:27",
							"pm:12:57",
							"pm:1:27",
							"pm:1:57",
							"pm:2:27",
							"pm:2:57",
							"pm:3:27",
							"pm:3:57",
							"pm:4:27",
							"pm:4:57",
							"pm:5:27",
							"pm:5:57",
							"pm:6:27",
							"pm:6:57",
							"pm:7:27",
							"pm:7:57"	];
	return searchTime(exampleTimes);
	

		//return "12:30";

}

// remove all buttons from data page
removeStops = function () {
	
	$('#pageThreeButtons .ui-btn').remove();
}

// remove all paragraphs and buttons from data page
removeBusInfo = function() {
	
	//console.log("data page");
	
	$('#pageData p').remove();
	$('#pageData .ui-btn').remove();
}


searchTime = function(param){
	var RealSecond = new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds();
loop1:
	for(var i=0; i<param.length; i++)
	{
		var timestate = 0;
		noon = "";
		bushour = "";
		busminutes = "";
loop2:
		for(var j=0; j<param[i].length; j++)
		{
			if(param[i][j] != ":")
			{
				if(timestate == 0)
				{
					noon = noon +param[i][j];
					console.log("noon: "+noon);
				}
				else if(timestate == 1)
				{
					bushour = bushour + param[i][j];
					console.log("bushour: "+"  "+bushour);
				}
				else
				{
					busminutes = busminutes + param[i][j];
					console.log("busminutes: "+busminutes);
				}
			}
			else
			{
				timestate++;
			}
		}
		if(noon == "am")
		{
			var BusSecond = parseInt(bushour)*3600 + parseInt(busminutes)*60;
		}
		else
		{
			var BusSecond = (parseInt(bushour)+12)*3600 + parseInt(busminutes)*60;
			console.log("BusSecond: "+BusSecond);
		}
		var timedifference = RealSecond-BusSecond;
		console.log("timedifference: "+timedifference);
		if(timedifference <= 0 && RealSecond-BusSecond>=-300)
		{
			console.log("Bus is coming in "+BusSecond/60+", run!!!!!"+" If missed, the next one comes at "+param[i+1]);	
			break loop1;
		}
		else if(timedifference >= 0 && RealSecond-BusSecond<=300)
		{
			console.log("You are late to the bus of "+param[i]+"! You might still be able to catch it! The next bus will come at "+param[i+1]);
			break loop1;
		}
		else if(timedifference > 300 && timedifference <= 1500)
		{
			console.log("The next bus will come at "+ param[i + 1]);
			break loop1;
		}
	}
	console.log(RealSecond);
}
