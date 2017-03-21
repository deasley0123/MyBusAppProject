function StubPage(pageID) {
	//
	// page
	//
	this.$page = $('<div data-role="page" id="pageTemplate"></div>');
	this.$page.attr('id',pageID);
	
	/**
	//
	// page sections
	//
	
	//header
	var $header = $('<div data-role="header"></div>');
	$header.append('<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Menu</a>');
	$header.append('<h1>Header Text</h1>');
	$header.append('<a href="#project.html" data-icon="back" class="ui-btn-right">Back</a>');
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
	**/
	// loads the page
	this.loadPage = function () {	
	
		$.mobile.pageContainer.prepend(this.$page);
		$.mobile.pageContainer.pagecontainer("change", "#pageTemplate", { transition:"slide" });
	
	}

}

StubPage.prototype.addContent = function(section,codeString,backButton){
	
	//
	// page sections
	//
	
	//header
	if(section == "header")
	{
		var $header = $('<div data-role="header"></div>');
		$header.append('<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Menu</a>');
		$header.append(codeString);
		if(backButton == true)
		{
			$header.append('<a href="#project.html" data-icon="back" class="ui-btn-right">Back</a>');
		}
		$header.append('<div data-role="navbar"></div>');	
		this.$page.append($header);
	}
	
	//body
	if(section == "body")
	{
		var $body = $('<div data-role="main" class="ui-content"></div>');
		$body.append(codeString);
		this.$page.append($body);
	}
	
	//footer
	if(section == "footer")
	{
		var $footer = $('<div data-role="footer"></div>');
		$footer.append(codeString);
		this.$page.append($footer);	
	}
	
}

// wont auto load the first page
onMobileInit = function() {
    console.log("mobile init");
    $.mobile.autoInitialize = false;
}

onPageLoad = function(){
	
/*
	PAGE 1
*/
	// create an object that holds a page object
	// StubPage(pageID). pageID = choose an id for page.
	var home = new StubPage("mainPage");
	/*
		.addContent(section,codeString,backButton).
		section = header, body, or footer.
		codeString = whatever html you want to inject.
		backButton = true - apply back button. false - no.
		
		backButton repeat seems repetitive, consider edit.
	*/
	home.addContent("header","<h1>Header Text</h1>",true);
	home.addContent("body","<div id='nextPage' data-role='controlgroup' data-type='vertical'><a href='#secondPage' data-transition='slide' class='ui-btn'>Button</a></div>",true);
	home.addContent("footer","<h1>Footer</h1>",true);
	
/*
	PAGE 2
*/
	// FIX THIS: Code doesn't make second page, just appends to previous.
	var secondPage = new StubPage("secondPage");
	home.addContent("header","<h1>Header Text</h1>",true);
	home.addContent("body","<p>Page under construction</p>",true);
	home.addContent("footer","<h1>Footer</h1>",true);
	
	// load "loading" page
	$.mobile.initializePage();
	
	// load "home" page
	// Neat trick: comment out the line below to see the loading page
	home.loadPage();
	
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
