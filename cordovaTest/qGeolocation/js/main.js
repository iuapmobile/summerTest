//ios 与android的返回值的精确度不一样
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

function test(){
	summer.getLocation(
		function successFn(position) { //成功回调函数
			alert(typeof position) //返回值类型为object，键值为coords和timestamp为时间戳
		    alert(position.coords.latitude)  //经度值  
		    alert(position.coords.longitude) //纬度值
		    alert(position.coords.accuracy)  //精确度
		    
		},
		function onError(error) { //失败回调函数
		    alert('code: '    + error.code    + '\n' +
		          'message: ' + error.message + '\n');
		})		
}