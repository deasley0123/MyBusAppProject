/****************************************************************
*																*
* Filename: MakePage.js											*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Defines a MakePage Constructor.						*
*																*
****************************************************************/


//
//	basic page constructor
//
function MakePage(pageID = "pageTemplate") {
	//
	// page
	//
	this.$page = $('<div data-role="page"></div>');
	this.pageName = function() { return pageID; }; // forcing private functionality
	this.$page.attr('id',pageID);

	//
	// template/initialized
	// page sections
	//

	// header
	this.headerID = function() { return pageID + "Header"; };
	var $header = $('<div data-role="header" id="' + this.headerID() + '"></div>');
	$header.append('<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Menu</a>');

	// body
	this.bodyID = function() { return pageID + "Body"; };
	var $body = $('<div data-role="main" style="height:500px" class="ui-content" id="' + this.bodyID() + '"></div>');

	// footer
	this.footerID = function() { return pageID + "Footer"; };
	var $footer = $('<div data-role="footer" id="' + this.footerID() + '"></div>');

	//
	// put it all together
	//
	this.$page.append($header);
	this.$page.append($body);
	this.$page.append($footer);

}

//
//	pre: section = "header", "body" or "footer"
//	post: appends content to the given section
//
MakePage.prototype.addContent = function(section, htmlString){

	//
	// page sections
	//

	// header
	if(section == "header")
	{
		var header = "#" + this.headerID();
		$(header).append(htmlString);
	}

	// body
	if(section == "body")
	{
		var body = "#" + this.bodyID();
		$(body).append(htmlString);
	}

	// footer
	if(section == "footer")
	{
		var footer = "#" + this.footerID();
		$(footer).append(htmlString);
	}

}


MakePage.prototype.loadPage = function () {
	$.mobile.pageContainer.prepend(this.$page); // loads the page to DOM
}

MakePage.prototype.switchToPage = function() {
	$(':mobile-pagecontainer').pagecontainer("change", "#" + this.pageName(), { transition:"slide" }); //switches to page
}
