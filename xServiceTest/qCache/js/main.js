function test1(){
	$cache.write('qq','{name:"屈海滨"}')
}
function test2(){
	$cache.write('qq',{age:32}) //ios设置缓存为json时直接关闭
}

function test3(){
	var qq=$cache.read('qq'); //ios读取不到缓存
	alert(typeof qq)
	alert(qq)
}

function test4(){
	var qq=$cache.read('qq'); //ios读取不到缓存
	alert(typeof qq)          //android 读取缓存值和设置缓存值得类型不一致
	alert(JSON.parse(qq).age)
}

function test5(){
	summer.openWin({
		id:"new_page1",
		url: 'html/new_page1.html'
	})
}

function closeWin(){
	summer.closeWin() //android 不是关闭当前win而是关闭应用
}

