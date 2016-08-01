//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};


function opencamera1(){
debugger;
	$camera.open({
        "bindfield" : "image",
        "compressionRatio" : "0.8",
        "callback" : opencamera1_callback
    });
    
   
}
function opencamera1_callback(sender, args){
    
	alert(124);
	alert(sender)
	alert($summer.jsonToStr(sender))
	
	
	alert(args)
	alert($summer.jsonToStr(args))
}
////////////////////////////////////////////////////////////////
function opencamera2(){
	debugger;
	$camera.open({
        "bindfield" : "image",
        "compressionRatio" : "0.8",
        "callback" : opencamera2_callback
    });
    
   
	function opencamera2_callback(sender, args){
	    
		alert(124);
		alert(sender)
		alert($summer.jsonToStr(sender))
		
		
		alert(args)
		alert($summer.jsonToStr(args))
	}
}

////////////////////////////////////////////////////////////////
function opencamera3(){
	debugger;
	$camera.open({
        "bindfield" : "image",
        "compressionRatio" : "0.8",
        "callback" : opencamera3_callback_notExist
    });
    
   
	function opencamera3_callback(sender, args){
	    
		alert(124);
		alert(sender)
		alert($summer.jsonToStr(sender))
		
		
		alert(args)
		alert($summer.jsonToStr(args))
	}
}

////////////////////////////////////////////////////////////////
function opencamera4(){
	debugger;
	$camera.open({
        "bindfield" : "image",
        "compressionRatio" : "0.8",
        "callback" : "opencamera4_callback()"
    });
}
function opencamera4_callback(sender, args){
	    
		alert(124);
		alert(sender)
		alert($summer.jsonToStr(sender))
		
		
		alert(args)
		alert($summer.jsonToStr(args))
}

////////////////////////////////////////////////////////////////
function opencamera5(){
	debugger;
	$camera.open({
        "bindfield" : "image",
        "compressionRatio" : "0.8",
        "callback" : "opencamera5_callback()"
    });
    
   
	function opencamera5_callback(sender, args){
	    
		alert(124);
		alert(sender)
		alert($summer.jsonToStr(sender))
		
		
		alert(args)
		alert($summer.jsonToStr(args))
	}
}


////////////////////////////////////////////////////////////////
function opencamera6(){
	debugger;
	$camera.open({
        "bindfield" : "image",
        "compressionRatio" : "0.8",
        "callback" : "opencamera6_callback_notExist()"
    });
    
   
	
}
function opencamera6_callback(sender, args){
	    
		alert(124);
		alert(sender)
		alert($summer.jsonToStr(sender))
		
		
		alert(args)
		alert($summer.jsonToStr(args))
}
