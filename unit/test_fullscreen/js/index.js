summerready = function() {debugger;

	// here is your code...

	var y = $summer.offset($summer.byId('header')).h;
	var width = $summer.offset(document.getElementsByTagName("body")[0]).w;

	var height = $summer.offset($summer.byId('main')).h
	$summer.fixStatusBar($summer.byId('header'));
	var height2 = $summer.offset($summer.byId('main')).h

	//alert("height="+height+"        height2="+height2);
	summer.openFrame({
		name : 'main',
		url : 'html/main.html',
		bounces : true,
		rect : {
			x : 0,
			y : y,
			w : width,
			h : height2
		}
	});
}
function openwin1() {
	if (confirm("将打开一个全屏显示的window，请确定？")) {
		summer.openWin({
			"id" : "home",
			"url" : "html/home.html",
			"fullScreen" : true,
			"statusBarAppearance" : true,
			"statusBarStyle" : "light", // dark
			"screenOrientation" : "landscape" // portrait(竖屏)
		});
	}else{
		summer.openWin({
			"id" : "home",
			"url" : "html/home.html",
			"fullScreen" : false,
			"statusBarAppearance" : true,
			"statusBarStyle" : "light", // dark
			"screenOrientation" : "portrait" // landscape(横屏)
		});
	
	}
}