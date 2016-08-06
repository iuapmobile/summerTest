//here is your code...
summerready = function () {
    $summer.byId("content").innerHTML += "<p>Hello friends, welcome to touch the summer frame!</p><p>The frame update at " +(new Date()).toLocaleString()+"</p>"; 
};


function test_curWinIndex(){
	//alert("执行win上的test_win(222)")
	summer.execScript({
		script : "alert('mainFrame执行indexWin上的script');test_indexWin('main');"//test_indexWin()定义在index.html中
	}); 


}

function test_mainFrame(p){
	$summer.byId("username").value = p;
	
	summer.execScript({
		script : "test_indexWin('main');"//test_indexWin()定义在index.html中
	});
}

