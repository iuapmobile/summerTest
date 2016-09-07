//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
	summer.showProgress({
         title: '加载中...'
     });
     
     setTimeout("summer.hideProgress()",3000)
};