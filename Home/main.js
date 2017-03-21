/****************************************************************
*																*
* Filename: main.js												*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Controls page generation, page history, config, etc.	*
*																*
****************************************************************/

// main thread
onPageLoad = function() {
	
	// load "loading" page
	$.mobile.initializePage();
	
	//Placeholder to ensure functionality. This will probably go in a different js file.
	var home = new MakePage("homePage");
	home.loadPage();
	
	home.addContent("header","<h1>Header Text</h1>");
	home.addContent("header",'<div data-role="navbar"></div>');
	home.addContent("body","<div id='nextPage' data-role='controlgroup' data-type='vertical'><a href='#secondPage' data-transition='slide' class='ui-btn'>Button</a></div>");
	home.addContent("footer","<h1>Footer</h1>");
	//END PLACEHOLDER
}

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
$panel.append('<h2>Menu</h2>');
$panel.append('<p>Close the panel by pressing the Esc key, by swiping to the left or clicking outside of the panel.</p>');
$panel.append('<div id="nextPage" data-role="controlgroup" data-type="vertical">');

//	buttons:
$panel.append('<a href="#somePage" data-transition="slide" class="ui-btn">Home<a></div>');
$panel.append('<a href="#somePage" data-transition="slide" class="ui-btn">Routes<a></div>');
$panel.append('<a href="#somePage" data-transition="slide" class="ui-btn">Map<a></div>');
$panel.append('<a href="#somePage" data-transition="slide" class="ui-btn">Settings<a></div>');

$(document).one('pagebeforecreate', function () {
$.mobile.pageContainer.prepend($panel);
	// Enhances all children of all elements in the set of matched elements.
	$("#myPanel").panel().enhanceWithin(); 
});
