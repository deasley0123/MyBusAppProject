function StubPage() {

	//
	// page
	//
	this.$page = $('<div data-role="page" id="pageTemplate"></div>');
	
	//
	// page sections
	//
	
	//header
	var $header = $('<div data-role="header"></div>');
	$header.append('<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow">Open Panel</a>');
	$header.append('<h1>Header Text</h1>');
	$header.append('<a href="index.html" data-icon="gear" class="ui-btn-right">Options</a>');
	$header.append('<div data-role="navbar"></div>');	
	
	//body
	var $body = $('<div data-role="main" class="ui-content"></div>');
	$body.append('<p>I\'m text in the body</p>');
	$body.append('<div id="nextPage" data-role="controlgroup" data-type="vertical"><a href="#somePage" data-transition="slide" class="ui-btn">Button</a></div>');
	
	//footer
	var $footer = $('<div data-role="footer"></div>');
	$footer.append('<h1>Footer Text</h1>');
	
	//
	//put it all together
	//
	this.$page.append($header);
	this.$page.append($body);
	this.$page.append($footer);	
	
	// loads the page
	this.loadPage = function () {	
	
		$.mobile.pageContainer.prepend(this.$page);
		$.mobile.pageContainer.pagecontainer("change", "#pageTemplate", { transition:"slide" });
	
	}

}

// wont auto load the first page
onMobileInit = function() {
    console.log("mobile init");
    $.mobile.autoInitialize = false;
}

onPageLoad = function(){
	
	// create an object that holds a page object
	var home = new StubPage();
	
	// load "loading" page
	$.mobile.initializePage();
	
	// load "home" page
	// Neat trick: comment out the line below to see the loading page
	home.loadPage();
	
}

// load a dynamically created page (i.e. nothing in the html file, all js/jquery)
$(document).bind("mobileinit", onMobileInit);
$(document).ready(onPageLoad);

// panel stuff
// outside of any function since it is external and the same for all pages
var $panel = $('<div data-role="panel" id="myPanel" data-position="left" data-display="reveal" data-theme="a"></div>');
$panel.append('<h2>Menu</h2>');
$panel.append('<p>Close the panel by pressing the Esc key, by swiping to the left or clicking outside of the panel.</p>');
$panel.append('<div id="nextPage" data-role="controlgroup" data-type="vertical"><a href="#somePage" data-transition="slide" class="ui-btn">Button<a></div>');
$(document).one('pagebeforecreate', function () {
$.mobile.pageContainer.prepend($panel);
	
	// Enhances all children of all elements in the set of matched 
	// elements.
	$("#myPanel").panel().enhanceWithin(); 
});
