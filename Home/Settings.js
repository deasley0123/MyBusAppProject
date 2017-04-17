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
	
    // initialize to saved settings if available
	if (storageAvailable('localStorage')) {
		startPage = parseInt(localStorage.getItem('startPage'), 10);
		fontSize = localStorage.getItem('fontSize');
        if(localStorage.getItem('favorites') != null) {
            favorites = JSON.parse( localStorage.getItem('favorites') );
        }
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