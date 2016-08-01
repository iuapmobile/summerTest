

summerready = function(){

test();

return;
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

function test(){
    var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

	var plug = 'summer-plugin-frame.XFrame';
	var methodName = "openFrame";
	var json = {
        name: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        }
    }
    alert(typeof summer["callCordova"]);
	summer["callCordova"](plug, methodName, json, null , null);
}