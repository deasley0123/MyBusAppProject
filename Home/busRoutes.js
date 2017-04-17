busRoutes = [
{"route_id" : "rt_1", "route_num" : "1", "route_name" : "East Lawrence / Downtown", "route_color" : "990000"},
{"route_id" : "rt_3", "route_num" : "3", "route_name" : "Lakeview Road / Downtown", "route_color" : "FF6600"},
{"route_id" : "rt_4", "route_num" : "4", "route_name" : "North Lawrence / 9th & Iowa", "route_color" : "0066FF"},
{"route_id" : "rt_5", "route_num" : "5", "route_name" : "South Iowa / 23rd / K-10", "route_color" : "9966"},
{"route_id" : "rt_6", "route_num" : "6", "route_name" : "6th & Wakarusa / Downtown - via 6th", "route_color" : "333366"},
{"route_id" : "rt_7", "route_num" : "7", "route_name" : "South Iowa / Downtown", "route_color" : "99FF33"},
{"route_id" : "rt_9", "route_num" : "9", "route_name" : "South Iowa / 6th & Wakarusa", "route_color" : "999966"},
{"route_id" : "rt_10", "route_num" : "10", "route_name" : "6th & Wakarusa / Downtown - via Bob Billings / KU", "route_color" : "663300"},
{"route_id" : "rt_11", "route_num" : "11", "route_name" : "South Iowa / KU / Downtown", "route_color" : "00CCFF"},
{"route_id" : "rt_15", "route_num" : "15", "route_name" : "Downtown / Peaslee / East Hills"},
{"route_id" : "rt_27", "route_num" : "27", "route_name" : "HINU / 23rd & Louisiana / KU", "route_color" : "CCCCFF"},
{"route_id" : "rt_29", "route_num" : "29", "route_name" : "27th & Wakarusa / KU", "route_color" : "FF99FF"},
{"route_id" : "rt_30", "route_num" : "30", "route_name" : "Bob Billings & Kasold / KU", "route_color" : "FF00FF"},
{"route_id" : "rt_36", "route_num" : "36", "route_name" : "6th via Emery / KU / North Michigan", "route_color" : "6600"},
{"route_id" : "rt_38", "route_num" : "38", "route_name" : "25th & Melrose / KU", "route_color" : "660066"},
{"route_id" : "rt_41", "route_num" : "41", "route_name" : "Yellow Campus Circulator", "route_color" : "66"},
{"route_id" : "rt_42", "route_num" : "42", "route_name" : "Blue Campus Circulator", "route_color" : "66"},
{"route_id" : "rt_43", "route_num" : "43", "route_name" : "Red Campus Circulator", "route_color" : "CC0000"}
];

// pre: the string route_id
// post: return the line index of the busRoutes array
getLineNumFromID = function(routeID){
  //iterate accross
  for(var i = 0; i < busRoutes.length; i++){
    if(routeID == busRoutes[i].route_id){
      return i;
    }
  }

  return "Route Not Found";
}
