/****************************************************************
*																*
* Filename: Fvorites.js											*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Defines a Favorites Constructor.						*
*																*
****************************************************************/


//
//	basic page constructor
//
function Favorite(){
  this.Favarr = [];
  $collapsible = $('<div data-role = "collapsible"></div>');
  $CollapsibleSet = $('<div class = "ui-collapsible-set"></div>');
  $collapsible.append("<h4>Favorites</h4>");
  $list = $('<ul id = "favlist" data-role = "listview"></ul>');
  $collapsible.append($list);
  $CollapsibleSet.append($collapsible);
  $panel.append($CollapsibleSet);
}

// add an element to Favorites list.
Favorite.prototype.addElement = function(element){
  this.Favarr.push(element);
  $("favlist").append("<li><a href='#'>"+element+"</a></li>");
  console.log("add"+this.Favarr);
}

//Method that delect element in the array
Favorite.prototype.delElement = function(element){
  Favarr.splice(element, 1);
}

Favorite.prototype.show = function(){
  for(var i = 0; i<this.Favarr.length; i++)
  {
    console.log(this.Favarr[i]);
    $list.append("<li><a href='#'>"+this.Favarr[i]+"</a></li>")
  }


}
