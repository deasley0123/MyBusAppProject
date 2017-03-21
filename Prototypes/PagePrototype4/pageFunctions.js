function StubPage(pageID = "pageTemplate") {
	//
	// page
	//
	this.$page = $('<div data-role="page"></div>');
	this.pageName = function() { return pageID; }; // forcing private funcitonality
	this.$page.attr('id',pageID);
	
	//
	// page sections
	//
	
	//header
	this.headerID = function() { return pageID + "Header"; };
	var $header = $('<div data-role="header" id="' + this.headerID() + '"></div>');

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
	
		$.mobile.pageContainer.prepend(this.$page);
		$.mobile.pageContainer.pagecontainer("change", "#" + this.pageName(), { transition:"slide" });
	}
}

StubPage.prototype.addContent = function(section, htmlString){
	
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

// wont auto load the first page
onMobileInit = function() {
    console.log("mobile init");
    $.mobile.autoInitialize = false;
}

onPageLoad = function(){
	
	
	// load "loading" page
	$.mobile.initializePage();
	
	
	/*
	PAGE 2
*/




	// Add content to second page
	var secondPage = new StubPage("secondPage");
	
		// need to load page before adding content
	
	secondPage.loadPage();
	
	secondPage.addContent("header",'<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Menu</a>');
	secondPage.addContent("header","<h1>Header Text</h1>");
	secondPage.addContent("header",'<div data-role="navbar"></div>');
	secondPage.addContent("body","<p>Page under construction</p>");
	secondPage.addContent("footer","<h1>Footer</h1>");
	

	
// Must create home page last, so it shows up on load in
	
/*
	PAGE 1
*/
	// create an object that holds a page object
	// StubPage(pageID). pageID = choose an id for page.
	var home = new StubPage("homePage");
	/*
		addContent(section,htmlString,backButton).
		section = header, body, or footer.
		htmlString = whatever html you want to inject.
		backButton = true - apply back button. false - no.
		
		backButton repeat seems repetitive, consider edit.
    
    ***Back button removed for now***
	*/
	
	home.loadPage();
	
	home.addContent("header",'<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Menu</a>');
	home.addContent("header","<h1>Header Text</h1>");
	home.addContent("header",'<div data-role="navbar"></div>');
	home.addContent("body","<div id='nextPage' data-role='controlgroup' data-type='vertical'><a href='#secondPage' data-transition='slide' class='ui-btn'>Button</a></div>");
	home.addContent("footer","<h1>Footer</h1>");
	

	
}

// load a dynamically created page (i.e. nothing in the html file, all js/jquery). Waits until jQuery Mobile has been loaded, then when ready, the onPageLoad function will run.
$(document).on("mobileinit", onMobileInit);
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
