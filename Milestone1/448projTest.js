/*function addElement () { 
  // create a new div element 
  // and give it some content 
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode("Hi there and greetings!"); 
  newDiv.appendChild(newContent); //add the text node to the newly created div. 

  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("div1"); 
  document.body.insertBefore(newDiv, currentDiv); 
}*/




main = function() {
	createAndDisplayGUI();

}

createAndDisplayGUI = function() {

	var name = "";
	for( var i = 0; i < 10; i++) {
		name = "Route " + i;
		addElement(name);
	
	}


}


addElement = function(name) {

	// create a new div element 
	// and give it some content 
	var button = document.createElement("button"); 
	var newTextContent = document.createTextNode(name); 
	button.appendChild(newTextContent); //add the text node to the newly created div. 
	
	// add onclick function
	button.type  = 'button';
	button.addEventListener('click', function() {
		//alert("it works");
		createListOfStops(name + " Menu");
		
	}, false);
	
	var currentDiv = document.getElementById("buttons"); 
	// create paragraph
	var paragraph = document.createElement("p");
	currentDiv.appendChild(paragraph);
	// add the newly created element and its content into the DOM 
	
	currentDiv.appendChild(button);

}

createListOfStops = function(name)
{
	//alert("it double works");
	var dropdown = document.createElement("select"); 
	
	// add menu items
	var nameOfStop = "Stop ";
	for( var i = 0; i < 10; i++) {
		dropdown.options[dropdown.length] = new Option(nameOfStop + i, "value");
	}
	
	// add the newly created element and its content into the DOM 
	var currentDiv = document.getElementById("dropdown"); 
	currentDiv.appendChild(dropdown);
}