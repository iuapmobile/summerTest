//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
	
	//pulldown to refresh
    summer.setRefreshHeaderInfo({
        visible: true,
        // bgColor: '#F5F5F5',//不写bgColor意味着透明
        textColor: '#4d4d4d',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        textDo:"正在加载",
        showTime: true
    }, function (ret, err) {
        setTimeout(function(){
            summer.refreshHeaderLoadDone();
        },2000);
   });
    
    //pullup to refresh
    summer.setRefreshFooterInfo({
        visible: true,
        // bgColor: '#F5F5F5',//不写bgColor意味着透明
        textColor: '#4d4d4d',
        textDown: '加载更多...',
        textUp: '松开加载更多...',
        textDo:"正在加载",
        showTime: false
    }, function (ret, err) {
        setTimeout(function(){
           summer.refreshFooterLoadDone();
        },3000);
    });
	
	
};


function open0() {
	$camera.open({
		callback : function xxxx(sender, args) {
			alert( "typeof sender == " + typeof sender);
			alert( "typeof args == " + typeof args);
			alert(JSON.stringify(sender));
			alert(JSON.stringify(args));
			alert(sender.imgPath);
			alert(args.imgPath);
			$summer.byId("img0").src = args.imgPath;
		}
	});

}


function open1() {
	$camera.open({
		callback : "xxxx()"
	})
}

function xxxx(sender, args) {
	alert( "typeof sender == " + typeof sender);
	alert( "typeof args == " + typeof args);
	alert(JSON.stringify(sender));
	alert(JSON.stringify(args));
	alert(sender.imgPath);
	alert(args.imgPath);
	$summer.byId("img1").src = args.imgPath;
}

function open2() {
	function xxxx2(sender, args) {
		alert( "typeof sender == " + typeof sender);
		alert( "typeof args == " + typeof args);
		alert(JSON.stringify(sender));
		alert(JSON.stringify(args));
		alert(sender.imgPath);
		alert(args.imgPath);
		$summer.byId("img2").src = args.imgPath;
	}

	$camera.open({
		callback : xxxx2
	})
}




