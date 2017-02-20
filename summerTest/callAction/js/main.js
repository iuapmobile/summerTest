//here is your code...
summerready = function() {
	$summer.byId("content").innerHTML += "<h3 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h3><h3 style='text-align: center'>The frame update at " + (new Date()).toLocaleString() + "</h3>";
};
function writeConfig(){
	summer.writeConfig({
		"host" : "10.1.78.70",
		"port" : "9091"
	})
}
function btn() {	
	summer.callAction({
		"viewid" : "com.yonyou.test.TestController", //后台带包名的Controller名
		"action" : "test", //方法名
		"callback" : "cbcallma()", //请求回来后执行的ActionID
		"error" : "errorcallma()" //失败回调的ActionId
	});
}

function cbcallma(args){

	var result =JSON.stringify(args);
	$summer.alert(result);
}

function errorcallma(args) {
	$summer.alert(args.err_msg);
	alert(args.err_msg);
	//在打印字符串时等价于上面的方法
}
