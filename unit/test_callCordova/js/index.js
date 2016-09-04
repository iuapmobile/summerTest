

summerready = function(){
	test();
}

function test(){
	
    var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

	var plug = 'summer-plugin-frame.XFrame';
	var methodName = "openFrame";
	var json = {
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        position: {
            left: 0,
            top: y,
            width: width,
            height: height
        }
        
    }
    //alert(typeof summer["callCordova"]);
	summer.callCordova(plug, methodName, json, null , null);
}

function openWin(){
	summer.openWin({
        "id" : "settings",
        "url" : "html/settings.html",
        "pageParam" : {
            "count" : 1
        }
    });
    
    summer.op
}