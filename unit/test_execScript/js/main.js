//here is your code...
summerready = function () {
    $summer.byId("content").innerHTML += "<p>Hello friends, welcome to touch the summer frame!</p><p>The frame update at " +(new Date()).toLocaleString()+"</p>"; 
};


function test_execScript(){
	//alert("执行win上的test_win(222)")
	summer.execScript({
		script : 'test_win("+(new Date().valueOf()+");'
	}); 


}

