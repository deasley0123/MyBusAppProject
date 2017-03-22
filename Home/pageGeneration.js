/****************************************************************
*																*
* Filename: pageGeneration.js									*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Implements creation/modification of pages			*
*																*
****************************************************************/

// pre: page is a MakePage object
//		type is a string ()
generateContent = function(page, type) {

	if(type == "homePage") {
		generateHomeContent(page);
	}
	else if(type == "whatever")
	{
	
	}
	page.loadPage();
}

// pre: page is a MakePage object
generateHomeContent = function(page) {

	page.loadPage();
	
	page.addContent("header","<h1>MyBus Home Page</h1>");
	page.addContent("header",'<div data-role="navbar"></div>');
	page.addContent("body",'<p class="welcome">Welcome to MyBus</p>');
	page.addContent("body",'<p class="disclaimer">*All times are approximate. Please arrive 5 minutes early.</p>');
	page.addContent("footer","<h1>An app developed by David Easley, Ryan Rodriguez, Josh Wu and Chen Long</h1>");
}

/****Tried some adding buttons to the panel on the fly, but it didn't work
// pre: pageID refers to a generated page
//		text is a string
//post: generate button in panel that navigates to given page
//		text is displayed on button
addPageToPanel = function(pageID, text) {

	//$panel.append('<a href="#' + pageID + '" data-transition="slide" class="ui-btn">' + text + '<a></div>');
	//$( "#nextPage" ).listview("refresh")
}
*/