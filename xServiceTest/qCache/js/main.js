function test1(){
	$cache.write('qq1','{name:"屈海滨"}')
}
function test2(){
	$cache.write('qq2',{age:32}) 
}

function test3(){
	var qq1=$cache.read('qq1'); 
	alert(qq1)
}

function test4(){
	var qq2=$cache.read('qq2'); 
	alert(typeof qq2);
	alert(qq2);
}





