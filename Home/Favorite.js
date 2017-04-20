/****************************************************************
*																*
* Filename: Favorites.js										*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Defines a Favorites Constructor.						*
*																*
****************************************************************/


//
//	basic page constructor
//
function Favorite(){

    var $collapsibleSet = $('<div class="ui-collapsible-set"></div>');
	var $collapsible = $('<div data-role="collapsible"></div>');
	$collapsible.append("<h4>Favorites</h4>");
	var $list = $('<ul id="favList" data-role="listview"></ul>');

    var favArray = currentSettings.getFavorites(); // row 0 - element, row 1 - pageID
    var i, favElement, favID, pageID;

    for(i = 0; i < favArray.length; i++) {
        for(var j = 0; j < busStops.length; j++){
            if(favArray[i][3] == busStops[j].stop_code){
                var stopNum = j;
                break;
            }
        }
        var routeID = "rt_" + favArray[i][2];
        favElement = favArray[i][0];
        favID = favElement.replace(/\s+/g, '');
        pageID = favArray[i][1];
        $favButton = $("<li><a id='" + favID + "' class='ui-btn' href='#" + pageID + "' data-transition='slide'>"+favElement+"</a></li>");
        var goToRoutesPage = function(stopNum, routeID) {
            return function() {
                amendRouteContent(stopNum, routeID);
            };
        };
        $favButton.click( goToRoutesPage(stopNum, routeID) );
        $list.append($favButton);
    }
    if(favArray.length == 0) {
        $list.append('<h4 style="text-align: center;" id="noFavText">No Favorites Added</h4>');
    }

	$collapsible.append($list);
	$collapsibleSet.append($collapsible);

	$.fn.exists = function () {
    	return this.length !== 0;
	}
	//console.log($("#panelList").exists());
	$("#panelList").append($collapsibleSet);
}

// add an element to Favorites list if it doesn't exist yet.
// return true if successful
// bus route and busStop are the number associated with them (not their index in their respective array)
Favorite.prototype.addElement = function(favElement, pageID, busRoute, busStop){

    console.log(favElement + " " + pageID + " " + busRoute + " " + busStop);

    var i;
    var isAlreadyFavorite = 0;

    // get current fav array
    var favArray = currentSettings.getFavorites();

    //check if favorite is already added
    for( i = 0; i < favArray.length; i++) {
        if( favElement == favArray[i][0] ) {
            isAlreadyFavorite = 1;
            break;
        }
    }
    // check if valid busRoute/busStop
    if(   (busRoute == 0) || (busStop == 0)   ) {
        isAlreadyFavorite = 1;
    }
    
    // add to favorite and return true
    if(!isAlreadyFavorite) {
        if( favArray.length == 0 ) {
            $("#noFavText").remove();
        }
        currentSettings.addFavorite([favElement, pageID, busRoute, busStop]);
        var favID = favElement.replace(/\s+/g, '');
        console.log(favID);
        $favButton = $("<li><a id='" + favID + "' class='ui-btn' href='#" + pageID + "' data-transition='slide'>"+favElement+"</a></li>");
        for(var i = 0; i < busStops.length; i++){
            if(busStop == busStops[i].stop_code){
                var stopNum = i;
                break;
            }
        }
        var routeID = "rt_" + busRoute;
        $favButton.click( function() {
            amendRouteContent(stopNum, routeID);
        });
        $("#favList").append($favButton);
    }
    // return false with no changes if already a favorite
    return !isAlreadyFavorite;
}

// delete an element from Favorites list, if it exists
Favorite.prototype.delElement = function(favElement){

    // get current fav array
    var favArray = currentSettings.getFavorites();
    var isFavorite = 0;

    //check if favorite exists
    for( i = 0; i < favArray.length; i++) {
        if( favElement == favArray[i][0] ) {
            isFavorite = 1;
            break;
        }
    }

    // return true and remove if favorite exists
    if(isFavorite) {
        currentSettings.delFavorite(favElement);
        var favID = favElement.replace(/\s+/g, '');
        $("#" + favID).remove();
        if(favArray.length == 0) {
            $("#favList").append("<h4 id='noFavText'>No Favorites Added</h4>");
        }
    }
    // return false if favorite doesn't exist
    return isFavorite;
}
