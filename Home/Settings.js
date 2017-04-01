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
	
	var startPage = 0;
	var fontSize = 100;
	
	if (storageAvailable('localStorage')) {
		startPage = parseInt(localStorage.getItem('startPage'), 10);
		fontSize = localStorage.getItem('fontSize');
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