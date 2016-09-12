//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
};
function openTel(){
	 $tel.call("13810513731")
}

function openTel1(){
	$tel.sendMsg({
	   "tel" : "13810513731",//电话号码
	   "body" : "hello"//短信内容
	})
}

function openTel2(){
	$tel.sendMail({
	   "receive" : "523422607@qq.com",//收件人
	   "title" : "hello",//邮件主题
	   "content" : "欢迎使用UAP Mobile"//邮件内容
	})
}
