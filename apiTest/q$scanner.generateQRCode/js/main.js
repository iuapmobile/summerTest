//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};

function openTest(){
	 var twocodepath=$scanner.generateQRCode({
		 size : 30,//二维码正方形的宽高
		 content : "text"//生成二维码所需的源文字
	});
		
	  $("img").attr("src",twocodepath);

}

