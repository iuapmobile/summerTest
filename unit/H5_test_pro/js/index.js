summerready = function() {
	

	// summer.openFrame({
	// id: 'main',
	// url: 'html/main.html',
	// bounces: true,
	// rect: {
	// x: 0,
	// y: headerPos.h,
	// w: width,
	// h: height
	// }
	// });

}

function callMa(){
	// here is your code...
	console.log("Hello Summer");
	var headerPos = $summer.offset($summer.byId('header'));
	var width = $summer.offset(document.getElementsByTagName("body")[0]).w;
	var height = $summer.offset($summer.byId('main')).h;

	$service.writeConfig({
		"host" : "10.1.79.44", //向configure中写入host键值
		"port" : "9999"//向configure中写入port键值
	})
	$service.callAction({
		"viewid" : "a.b.data4httpService", //后台带包名的Controller名
		"action" : "saveData", //方法名,
		"callback" : "cbcallma()", //请求回来后执行的ActionID
		"error" : "errorcallma()"//失败回调的ActionId
	});
	
	function cbcallma(){
		alert("ok");
	}
	
	function errorcallma(sender, args){
		alert(args);
	}
}

