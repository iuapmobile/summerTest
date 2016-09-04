

summerready = function(){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;
//$summer.fixIos7Bar($summer.byId('header'));

    summer.openFrame({
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        },
        alert:false
    });
    
    
    document.addEventListener('backbutton', onBackKeyDown, true);

       function onBackKeyDown() {
	        summer.openWin({
                "id" : "settings",
                "url" : "html/settings.html",
                "pageParam" : {
                    "count" : 1
                }
            });
    	}

}


//跨win执行，并关闭上一个win
function test_indexWin(param){
	//alert("test_win : " + param);
	var item0 = document.getElementById("item0");
	//alert("改之前："+ item0.innerHTML);
	item0.innerText = param;
	
	summer.closeWin({id:"settings"})//更改并关闭
	

}

function openSettings(){
	summer.openWin({
		id:"settings",
		url:"html/settings.html"
	});
}

function open4(){
	var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

	/*
 	summer.setFrameAttr({
        "id" : "user",
        "hidden" : false
     },null,null);
     */
    summer.openFrame({
        id: 'user',
        url: 'html/user.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        },
        alert:false
    });
}

function open1(){
	var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

    summer.openFrame({
        id: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        },
        alert:false
    });
    /*
    summer.setFrameAttr({
        "id" : "user",
        "hidden" : true
     },null,null);
     */
}
