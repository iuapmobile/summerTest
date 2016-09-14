//here is your code...

function getLocation(){
	$device.getLocation({
	     "bindfield" : "location", //位置信息回写的绑定字段
	     "callback" :  function(args){$alert(args)},  //回调执行的JS方法				
	     "single" : "true", //是否只获取1次
	     "isgetaddress" : "true", //是否需要获取地址
	     "network" : "true" //是否使用wifi定位
	 })	
}

