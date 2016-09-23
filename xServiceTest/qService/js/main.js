//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h1 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h1><h2 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h2>";
 
};
function getService(){
	$service.get({
       "url" : "http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=", //url地址
       "callback" : function (sender,args){     
       		
       		alert(eval(arges.result)[0].text);//通过回调函数的参数获得数据sender和args，返回值为json结构的string类型  
             
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
       "url" : "http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=",//url地址
       "callback" : function (sender,ares){
            alert(eval(arges.result)[1].text);//通过回调函数的参数获得数据sender和args，返回值为json结构的string类型 
    	} /*,
    	"data" : {a:1,b:2},
    	 "header":{
            "Content-Type":"application/x-www-form-urlencoded",
             "User-Agent":"imgfornote"
       `},
        "timeout" : "5"*/
   })
	
}