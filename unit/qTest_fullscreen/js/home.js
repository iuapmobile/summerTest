//here is your code...
summerready = function () {
    $summer.byId("main").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>"; 


	var y = $summer.offset($summer.byId('header')).h;
	var width = $summer.offset(document.getElementsByTagName("body")[0]).w;

	var height = $summer.offset($summer.byId('main')).h
	$summer.fixStatusBar($summer.byId('header'));
	var height2 = $summer.offset($summer.byId('main')).h


};