//here is your code...
summerready = function () {

};
function getService(){
	$service.get({
       "url" : "http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=", //url地址
       "callback" : function (sender,args){     
       		
       		$alert(args);//通过回调函数的参数获得数据sender和args，返回值为json结构的string类型
             
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
       "callback" : function (sender,args){
            $alert(args);//通过回调函数的参数获得数据sender和args，返回值为json结构的string类型
    	} /*,
    	"data" : {a:1,b:2},
    	 "header":{
            "Content-Type":"application/x-www-form-urlencoded",
             "User-Agent":"imgfornote"
       `},
        "timeout" : "5"*/
   })
	
}
function callActionService(){
    $service.callAction({
        "viewid" : "xxx.xxx.xx",//后台带包名的Controller名
        "action" : "methodName",//方法名,
        "params" : {a:1,b:2},//自定义参数
        "autoDataBinding" : true,//请求完毕后，是否进行数据绑定，如果没有该属性，则默认不绑定。
        "contextmapping" : "fieldPath",//将返回结果映射到指定的Context字段上，如果没有该属性，则默认为替换整个Context
        "callback" : function (args) {
            $summer.alert(args);
        },//请求回来后执行的js方法
        "error" : "myerror()"//失败回调的js方法
    })
}