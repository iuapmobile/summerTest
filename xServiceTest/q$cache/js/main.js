/*多谢几种类型，复杂的json数据，验证read之后的类型,跨页面
    write和read前后数据类型保持一致      str-xxxxxxxxx     obj-xxxxxxxxxx
	$cache.write('person',{name:"张三",age:34})
	alert($cache.read('person').name)//显示张三
	alert(JSON.parse($cache.read('person')).name)//现在ok
	
	
	$cache.write('person',"{name:\"张三\",age:34}")
	alert($cache.read('person'))//显示字符串
	alert(JSON.parse($cache.read('person')).name)//
	
	summer.writeFile
	summer.readFile
	summer.openCamera*/
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

