

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
	// Enhances all children of all elements in the set of matched 
	// elements.
	$("#myPanel").panel().enhanceWithin(); 
});

//
//	basic page constructor
//
function MakePage(pageID = "pageTemplate") {
	//
	// page
	//
	this.$page = $('<div data-role="page"></div>'); 
	
	// Below seems like a new addition, pageName variable not used? 
	// Answer: this might be useful in the future, not sure yet
	// Reply: Okay, cool!
	this.pageName = function() { return pageID; }; // forcing private functionality
	this.$page.attr('id',pageID);

	//
	// template/initialized
	// page sections 
	//
	
	//header
	this.headerID = function() { return pageID + "Header"; };
	var $header = $('<div data-role="header" id="' + this.headerID() + '"></div>');
	$header.append('<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Menu</a>');

	//body
	this.bodyID = function() { return pageID + "Body"; };
	var $body = $('<div data-role="main" class="ui-content" id="' + this.bodyID() + '"></div>');

	//footer
	this.footerID = function() { return pageID + "Footer"; };
	var $footer = $('<div data-role="footer" id="' + this.footerID() + '"></div>');

	//
	//put it all together
	//
	this.$page.append($header);
	this.$page.append($body);
	this.$page.append($footer);	

	// loads the page
	this.loadPage = function () {	
	
		$.mobile.pageContainer.prepend(this.$page); // this adds it to DOM
		$.mobile.pageContainer.pagecontainer("change", "#" + this.pageName(), { transition:"slide" }); // this switches to page 
	}
}

//
//	page appender
//
MakePage.prototype.addContent = function(section, htmlString){
	
	//
	// page sections
	//
	
	//header
	if(section == "header")
	{
		var header = "#" + this.headerID();
		$(header).append(htmlString);
	}
	
	//body
	if(section == "body")
	{
		var body = "#" + this.bodyID();
		$(body).append(htmlString);
	}
	
	//footer
	if(section == "footer")
	{
		var footer = "#" + this.footerID();
		$(footer).append(htmlString);
	}
	
}

// we can probably divide this into separate functions for each page
// We could create a setupPage? function or something.
// i guess i'm trying to think about how the naviagation is going to work. I'm imagining another layer of abstraction between this set of functions 
// what is essentially the "main" thread for our program. Things in here would be refrenced from a series of calls, but the .js file that is associated with 
// our project.html file (or whatever we call it) would be a different one that just manages the state logic, page history, etc.
// Pages could still be physically created by this .js file (with the .ready(onPageLoad) function call), but we should populate the content that goes into that onPageLoad externally
// Thoughts?
// took me a while to digest, but i see what you're saying
// Sorry, it would be a bit easier to explain with a whiteboard or something
// online whiteboard: https://realtimeboard.com/welcome/bkNufEzdHGmrpLYwgiUbU1pPAmNdUfmgmrWx0lsTe1f6KgoRZCtLaFye4t6WAP0n
// Chen: I need some help on understanding the code, so many things going on here. Not sure which one to edit

//here is my whiteboard https://realtimeboard.com/app/board/o9J_k05y2O0=/
//invite me: rjoe.rod@gmail.com, cl930828@gmail.com, joshuawu15@gmail.com



onPageLoad = function() {
	
	
}

// prevent auto loading the first page
onMobileInit = function() {
    console.log("mobile init");
    $.mobile.autoInitialize = false;
}

// load a dynamically created page 
$(document).on("mobileinit", onMobileInit);
$(document).ready(onPageLoad);
