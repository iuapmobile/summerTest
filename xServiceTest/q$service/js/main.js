//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
 
};
function getService(){
	$service.get({
       "url" : "http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=",
       "callback" : function (sender,arges){
       		alert(arges.result);//string
       		alert(eval(arges.result)[0].text);
             
    	} /*,
    	 "header":{
            "Content-Type":"application/x-www-form-urlencoded",
             "User-Agent":"imgfornote"
       `},
        "timeout" : "5"*/
   })
}

function postService(){
	$service.post({
       "url" : "http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=",
       "callback" : function (sender,arges){	
            alert(eval(arges.result)[1].text);
    	} /*,
    	"data" : {a:1,b:2},
    	 "header":{
            "Content-Type":"application/x-www-form-urlencoded",
             "User-Agent":"imgfornote"
       `},
        "timeout" : "5"*/
   })
	
}