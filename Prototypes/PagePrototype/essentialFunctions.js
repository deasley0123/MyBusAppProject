// Makes an external panel to make generating panels less code intensive.
/*
	Add this whenever you want to html:
	
	<a href="#myPanel" class="ui-btn ui-btn-inline ui-corner-all ui-shadow ui-btn-icon-left ui-icon-bars">Open Panel</a>	
	
	*Note on the dollar sign ($): $panel - the dollar sign is is just a convention to indicate a variable is jquery wrapped
								  $(this) - the dollar sign is a function that returns a jquery object
*/

var $panel = $('<div data-role="panel" id="myPanel" data-position="left" data-display="reveal" data-theme="a"></div>');

/*
	This is how to dynamically add elements (buttons, text, etc.) to a panel.
	elementVar.append(this);
*/

$panel.append('<h2>Menu</h2>');
$panel.append('<p>Close the panel by pressing the Esc key, by swiping to the left or clicking outside of the panel.</p>');
$panel.append('<div id="nextPage" data-role="controlgroup" data-type="vertical"><a href="#somePage" data-transition="slide" class="ui-btn">Button<a></div>');

/*
	//jQuery
	.one() is used to attach a handler/trigger to an event for the elements. The handler/trigger is executed AT MOST ONCE per element per event type
	
	'pagebeforecreate' is triggered on the page being initialized, before most plugin auto-initialization occurs. Essentially, the "external-ness" of the panel.
*/

$(document).one('pagebeforecreate', function () {
	$.mobile.pageContainer.prepend($panel);
	
	// Enhances all children of all elements in the set of matched 
	// elements.
	$("#myPanel").panel().enhanceWithin(); 
});

/*
	FUNCTIONS
*/

main = function(){
	

}




