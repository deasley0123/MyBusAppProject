/****************************************************************
*																*
* Filename: settings.js											*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Implements control of settings						*
*																*
****************************************************************/

//
// Settings constructor
//
function Settings() {
	
    // initialize to default
	var startPage = 0;
	var fontSize = 100;
    var favorites = []; // first col is favElement, second col is pageID
    var mapLat = 38.955028;
    var mapLng = -95.262750;
	
    // saving defaults if none previously set
    if( localStorage.getItem('favorites') == null ) {
        if( parseInt(localStorage.getItem('startPage'), 10) == null ) {
            localStorage.setItem('startPage', startPage);
        }
        if( fontSize = localStorage.getItem('fontSize') == null ) { 
            localStorage.setItem('fontSize', fontSize);
        }
        localStorage.setItem( 'favorites', JSON.stringify(favorites) );
        if( localStorage.getItem('mapLat') == null ) {
            localStorage.setItem('mapLat', mapLat);
            localStorage.setItem('mapLng', mapLng);  
        }
    }        
    // otherwise initialize to saved settings if possible
	if ( storageAvailable('localStorage') ) {
		startPage = parseInt(localStorage.getItem('startPage'), 10);
		fontSize = localStorage.getItem('fontSize');
        favorites = JSON.parse( localStorage.getItem('favorites') );
        mapLat = parseFloat(localStorage.getItem('mapLat'), 10);
        mapLng = parseFloat(localStorage.getItem('mapLng'), 10);
	}
	
	this.setStartPage = function(page) {
		// check if localStorage can be used
		if (storageAvailable('localStorage')) {
			localStorage.setItem('startPage', page);
		}
		startPage = page;
	};
	
	this.setFontSize = function(size) {
		// check if localStorage can be used
		if (storageAvailable('localStorage')) {
			localStorage.setItem('fontSize', size);
			$(".txtwrapper").css('font-size', size+'%');
		}
		fontSize = size;
	};
    
    this.addFavorite = function(favElementArr) {
        console.log(JSON.stringify(favElementArr));
        favorites.push(favElementArr);
        if (storageAvailable('localStorage')) {
			localStorage.setItem( 'favorites', JSON.stringify(favorites) );
		}
    }
    
    this.delFavorite = function(fav) {
        // remove row
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i][0] == fav) {
                favorites.splice(i, 1);
            }
        }
        if (storageAvailable('localStorage')) {
			localStorage.setItem( 'favorites', JSON.stringify(favorites) );
		}
    }
    
    this.getMapCenter = function() {
        return [mapLat, mapLng];
    }
    
    this.setMapCenter = function(lat, lng) {
        mapLat = lat;
        mapLng = lng;
        if (storageAvailable('localStorage')) {
            localStorage.setItem('mapLat', mapLat);
            localStorage.setItem('mapLng', mapLng);
		}
        
    }
    
    this.getFavorites = function() {
        return favorites;
    }
	
	this.getStartPage = function() {
		return startPage;
	};
	
	this.updateFontSize = function() {
		$(".txtwrapper").css('font-size', fontSize+'%');
	};
}

currentSettings = new Settings();

// check if localStorage is supported
function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}