function test1(){
	$cache.write('qq','{name:"屈海滨"}')
}
function test2(){
	$cache.write('qq',{age:32}) 
}

function test3(){
	var qq=$cache.read('qq'); 
	alert(typeof qq)
	alert(qq)
}

function test4(){
	var qq=$cache.read('qq'); 
	alert(typeof qq)          
	alert(JSON.parse(qq).age)
}

function test5(){
	summer.openWin({
		id:"new_page1",
		url: 'html/new_page1.html'
	})
}

function closeWin(){
	summer.closeWin() 
}

