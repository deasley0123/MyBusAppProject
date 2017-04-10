/****************************************************************
*																*
* Filename: Favorites.js										*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Defines a Favorites Constructor.						*
*																*
****************************************************************/


//
//	basic page constructor
//
function Favorite(){
  this.Favarr = [];
  $collapsibleSet = $('<div class="ui-collapsible-set"></div>');
  $collapsible = $('<div data-role="collapsible"></div>');
  $collapsible.append("<h4>Favorites</h4>");
  $list = $('<ul id="favlist" data-role="listview"></ul>');
  $collapsible.append($list);
  $collapsibleSet.append($collapsible);
  $panel.append($collapsibleSet);
}

// add an element to Favorites list.
Favorite.prototype.addElement = function(element, pageID){
  this.Favarr.push(element);
  console.log("<li><a href='#" + pageID + "'>"+element+"</a></li>");
  $("#favlist").append("<li><a class='ui-btn' href='#" + pageID + "' data-transition='slide'>"+element+"</a></li>");
}

//Method that delect element in the array
Favorite.prototype.delElement = function(element){
  Favarr.splice(element, 1);
}
