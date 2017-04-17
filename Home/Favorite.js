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
	
    $collapsibleSet = $('<div class="ui-collapsible-set"></div>');
	$collapsible = $('<div data-role="collapsible"></div>');
	$collapsible.append("<h4>Favorites</h4>");
	$list = $('<ul id="favList" data-role="listview"></ul>');
    
    var favArray = currentSettings.getFavorites(); // row 0 - element, row 1 - pageID
    var i, favElement, favID, pageID;
    
    for(i = 0; i < favArray.length; i++) {
        favElement = favArray[i][0];
        favID = "fav" + favArray[i][0];
        pageID = favArray[i][1];
        $list.append("<li><a id='" + favID + "' class='ui-btn' href='#" + pageID + "' data-transition='slide'>"+favElement+"</a></li>");
    }
    if(favArray.length == 0) {
        $list.append("<p id='noFavText'>No Favorites Added</p>");
    }
        
	$collapsible.append($list);
	$collapsibleSet.append($collapsible);
	$panel.append($collapsibleSet);
}

// add an element to Favorites list if it doesn't exist yet.
// return true if successful
Favorite.prototype.addElement = function(favElement, pageID){
    
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
    // add to favorite and return true
    if(!isAlreadyFavorite) {
        if( favArray.length == 0 ) {
            $("#noFavText").remove();
        }
        currentSettings.addFavorite([favElement, pageID]);
        var favID = "fav" + favElement;
        $("#favList").append("<li><a id='" + favID + "' class='ui-btn' href='#" + pageID + "' data-transition='slide'>"+favElement+"</a></li>");
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
        var favID = "#fav" + favElement;
        $(favID).remove();
        if(favArray.length == 0) {
            $("#favList").append("<p id='noFavText'>No Favorites Added</p>");
        }
    }
    // return false if favorite doesn't exist
    return isFavorite;
}
