//
// Where secondary changes to SettingsPage go
//

generateSettingsContentStartup = function(page, list) {
	//
	// manage which page loads first on startup
	//

	var $startupButton = $('<li><a href="#popupStartup" class="ui-btn" data-rel="popup">Start Page</a></li>');
	var $startupPopup = $('<div data-role="popup" id="popupStartup" data-theme="a"></div>');
	// adds a close button to the popup
	$startupPopup.append('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>');
	var $startupList = $('<ul data-role="listview" data-inset="true" style="min-width:210px;"data-theme="b"></ul>');
	$startupList.append('<li data-role="divider" data-theme="a">Pages</li>');
	for(var i = 0; i < menuPageIDs.length; i++) {
		var $button = $('<li><a class="ui-btn">' + menuPageIDs[i].slice(0, -4) + '</a></li>');

		var setPage = function(page) {
			return function() {
				// set starting page
				currentSettings.setStartPage(page);

				// close popup
				$startupPopup.popup( "close" );
			};
		}

		$button.click( setPage(i) );

		$startupList.append($button);
	}
	// append list to popup
	$startupPopup.append($startupList);

	// append popup to body
	page.addContent("body", $startupPopup);
	// append button to list on page
	list.append($startupButton);
}

generateSettingsContentFavorites = function(page, list) {
	//
	// manage favorites
	//
	var $favoritesButton = $('<li><a href="#popupFavorites" class="ui-btn" data-rel="popup">Favorites</a></li>');
	var $favoritesPopup = $('<div data-role="popup" id="popupFavorites"></div>');

	// adds a close button to the popup
	$favoritesPopup.append('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>');
	var $favoritesList = $('<ul id="favSettingsList" data-role="listview" data-inset="true" style="min-width:210px;"data-theme="b"></ul>');
	$favoritesList.append('<li data-role="divider" data-theme="a">Favorites</li>');

    var updateFavoritesList = function() {
        $(".favListBtn").remove();
        var favArray = currentSettings.getFavorites();
		for(var i = 0; i < favArray.length; i++) {

			var $button = $('<li class="favListBtn"><a class="ui-btn">Remove \"' + favArray[i][0] + '\"</a></li>');
            var favElement = favArray[i][0];
            
            // remove the favorite of the given index
			var removeFavorite = function(favIndex) {
                return function() {
                    var favArray = currentSettings.getFavorites();
                    var favElement = favArray[favIndex][0];
					// remove favorite
					favorites.delElement(favElement);

					// close popup
					$favoritesPopup.popup( "close" );

                    updateFavoritesList();
                };
			}

			$button.click( removeFavorite(i) );

			$("#favSettingsList").append($button);
		}
    }
	$(document).on('pageshow', updateFavoritesList);

	// append list to popup
	$favoritesPopup.append($favoritesList);

	// append popup to body
	page.addContent("body", $favoritesPopup);
	// append button to list on page
	list.append($favoritesButton);

	page.addContent("body", $favoritesPopup);
	list.append($favoritesButton);


}

generateSettingsContentMapStart = function(page, list) {
	//
	// manage where the map centers at startup
	//
	var $mapStartButton = $('<li><a href="#popupMapStart" class="ui-btn" data-rel="popup">Starting Map Location</a></li>');
	var $mapStartPopup = $('<div data-role="popup" id="popupMapStart"></div>');
    $mapStartPopup.append('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>');
    
	var $mapStartList = $('<ul data-role="listview" data-inset="true" style="min-width:210px;"data-theme="b"></ul>');
	$mapStartList.append('<li data-role="divider" data-theme="a">Starting Map Location</li>');
    
    // button for setting starting map location to current center of map
    var $setCenter = $('<li><a class="ui-btn">Set to Current Center of Map</a></li>');
    $setCenter.click( function() {
        var center = map.getCenter();
        map.setCenter(center.lat(), center.lng());
        currentSettings.setMapCenter(center.lat(), center.lng());
        $mapStartPopup.popup( "close" );
        alert("New Starting Map Location Set");
    } );
    $mapStartList.append($setCenter);
    
    // button for reseting map location to default center
    var $resetButton = $('<li><a class="ui-btn">Reset to Default</a></li>');
    $resetButton.click( function() {   
        currentSettings.setMapCenter(38.955028, -95.262750);
        $mapStartPopup.popup( "close" );
        alert("Reset Starting Map Location to Default");
    } );
    $mapStartList.append($resetButton);
    
    $mapStartPopup.append($mapStartList);
    
	page.addContent("body", $mapStartPopup);
	list.append($mapStartButton);
}

generateSettingsContentFontSize = function(page, list) {
	//
	// manage font size
	//
	var $fontSizeButton = $('<li><a href="#popupFontSize" class="ui-btn" data-rel="popup">Font Size</a></li>');
	var $fontSizePopup = $('<div data-role="popup" id="popupFontSize"></div>');

	// adds a close button
	$fontSizePopup.append('<a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a>');
	var $fontSizeList = $('<ul data-role="listview" data-inset="true" style="min-width:210px;"data-theme="b"></ul>');
	$fontSizeList.append('<li data-role="divider" data-theme="a">Font Size</li>');

	//sets font size in terms of percent
	var sizes = [["Small", 80], ["Medium", 100], ["Large", 120]];
	for(var j = 0; j < sizes.length; j++) {
		var $button = $('<li><a class="ui-btn">' + sizes[j][0] + '</a></li>');

		var sizeOfFont = sizes[j][1];
		var setFontSize = function (size) {
			return function() {
				// set font size
				currentSettings.setFontSize(size);

				// close popup
				$fontSizePopup.popup( "close" );
			}
		}
		$button.click( setFontSize(sizeOfFont) );

		$fontSizeList.append($button);
	}
	$fontSizePopup.append($fontSizeList);


	page.addContent("body", $fontSizePopup);
	list.append($fontSizeButton);
}