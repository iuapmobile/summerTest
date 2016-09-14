//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
	    
};
function test(){
	$cache.write('qq',123)
}

function test1(){
	var qq=$cache.read('qq');
	alert("缓存值为"+qq);
}