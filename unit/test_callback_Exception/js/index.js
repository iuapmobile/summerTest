

summerready = function(){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

    summer.openFrame({
        name: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        }
    });
    
    
}


function openCamera(){
debugger;
	$camera.open({
        "bindfield" : "image",
        "compressionRatio" : "0.8",
        "callback" : meet
    });
    
    function meet(sender, args){
    
    	alert(124);
    	alert(sender)
    	alert($summer.jsonToStr(sender))
    	
    	
    	alert(args)
    	alert($summer.jsonToStr(args))
    }   
}



