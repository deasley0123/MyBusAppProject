var noon = "";
var bushour = "";
var busminutes = "";
main = function(){
	var busTime = ["am:12:00", "pm:1:00", "pm:2:38", "pm:2:40", "pm:5:00"];
	console.log(searchtime(busTime));
}

// param: busTimes - an array containing each of the bus times
//					 formatted as "pm:x:y" where 1 < x,y < 12
searchtime = function(busTimes){

	// the current time in seconds
	var RealSecond = new Date().getHours()*3600+new Date().getMinutes()*60+new Date().getSeconds();
loop1:
	for(var i=0; i<busTimes.length; i++)
	{
		var timestate = 0;
		var BusSecond = 0;
		var timedifference = 0;
		noon = "";
		bushour = "";
		busminutes = "";
loop2:
		for(var j=0; j<busTimes[i].length; j++)
		{
			if(busTimes[i][j] != ":")
			{
				if(timestate == 0)
				{
					noon = noon +busTimes[i][j];
				}
				else if(timestate == 1)
				{
					bushour = bushour + busTimes[i][j];
				}
				else
				{
					busminutes = busminutes + busTimes[i][j];
				}
			}
			else
			{
				timestate++;
			}
		}
		
		if(noon == "am")
		{
			BusSecond = parseInt(bushour)*3600 + parseInt(busminutes)*60;
		}
		else
		{
			BusSecond = (parseInt(bushour)+12)*3600 + parseInt(busminutes)*60;
			console.log("BusSecond: "+BusSecond);
		}
		
		timedifference = RealSecond-BusSecond;
		console.log("timedifference: "+timedifference);
		if(timedifference <= 0 && RealSecond-BusSecond>=-300)
		{
			return("Bus is coming in "+parseInt(-timedifference/60, 10)+" minutes, run!!!!!"+" If missed, the next one comes at "+busTimes[i+1];);
			return word;
			break loop1;
		}
		else if(timedifference >= 0 && RealSecond-BusSecond<=300)
		{
			console.log("test2");
			return ("You are late to the bus of "+busTimes[i]+"! You might still be able to catch it! The next bus will come at "+busTimes[i+1]);
			break loop1;
		}
		else if(timedifference < -300 && timedifference >= -1500)
		{
			console.log("test3");
			return ("The next bus will come at "+ busTimes[i]);
			break loop1;
		}
	}
	console.log(RealSecond);
}