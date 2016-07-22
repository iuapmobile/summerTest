

summerready = function(){debugger;

    // here is your code...	
    
    /*
    $service.call("UMService.login", 
			"{'callback':'loginSuccess()','error':'this.button1_onclick()','actionid':'loginNC','isDataCollect':'true', " + "'method':'UMService.login','type':'nc','user':'" + 'ncc6' + "','contextmapping':'none', " + "'pass':'" + '123456a' + "','funcode':'A03006'}", 
			true);
*/

     
   
    var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;
    
    var height = $summer.offset($summer.byId('main')).h
	$summer.fixIos7Bar($summer.byId('header'));
	var height2 = $summer.offset($summer.byId('main')).h
	
	
	//alert("height="+height+"        height2="+height2);
    summer.openFrame({
        name: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height2
        }
    });
}