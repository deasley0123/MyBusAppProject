var noon = "";
var bushour = "";
var busminutes = "";
main = function(){
	var bustime = ["am:12:00", "pm:1:00", "pm:2:38", "pm:2:40", "pm:5:00"];
	console.log(searchtime(bustime));
}

searchtime = function(param){
	var RealSecond = new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds();
loop1:
	for(var i=0; i<param.length; i++)
	{
		var timestate = 0;
		noon = "";
		bushour = "";
		busminutes = "";
loop2:
		for(var j=0; j<param[i].length; j++)
		{
			if(param[i][j] != ":")
			{
				if(timestate == 0)
				{
					noon = noon +param[i][j];
				}
				else if(timestate == 1)
				{
					bushour = bushour + param[i][j];
				}
				else
				{
					busminutes = busminutes + param[i][j];
				}
			}
			else
			{
				timestate++;
			}
		}
		if(noon == "am")
		{
			var BusSecond = parseInt(bushour)*3600 + parseInt(busminutes)*60;
		}
		else
		{
			var BusSecond = (parseInt(bushour)+12)*3600 + parseInt(busminutes)*60;
			console.log("BusSecond: "+BusSecond);
		}
		var timedifference = RealSecond-BusSecond;
		console.log("timedifference: "+timedifference);
		if(timedifference <= 0 && RealSecond-BusSecond>=-300)
		{
			return("Bus is coming in "+parseInt(-timedifference/60, 10)+" minutes, run!!!!!"+" If missed, the next one comes at "+param[i+1];);
			return word;
			break loop1;
		}
		else if(timedifference >= 0 && RealSecond-BusSecond<=300)
		{
			console.log("test2");
			return ("You are late to the bus of "+param[i]+"! You might still be able to catch it! The next bus will come at "+param[i+1]);
			break loop1;
		}
		else if(timedifference < -300 && timedifference >= -1500)
		{
			console.log("test3");
			return ("The next bus will come at "+ param[i]);
			break loop1;
		}
	}
	console.log(RealSecond);
}