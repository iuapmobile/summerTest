//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};
function test1(){
	alert($net.available())  //返回值为boolean类型         true||false  ios返回值不正确
}

function test2(){ 
	alert(JSON.parse($net. getNetworkInfo()).Type)  //android返回值为json类型的 string key值为Type
	alert($net. getNetworkInfo().Type)  //ios返回值为json类型   key值为Type
	
}