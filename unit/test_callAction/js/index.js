

summerready = function(){
    // here is your code...	
    var y = $summer.offset($summer.byId('header')).h;
    var width=$summer.offset(document.getElementsByTagName("body")[0]).w;		
    var height = $summer.offset($summer.byId('main')).h;

    summer.openFrame({
        name: 'main',
        url: 'html/main.html',
        bounces: true,
        rect: {
            x: 0,
            y: y,
            w: width,
            h: height
        }
    });
}

function testcallaction(){

	$service.callAction({
        viewid: "xxx.xxx.MyController",//部署在MA上的Controller的包名
        action: "methodName",//后台Controller的方法名,
        params: {a:1, b:2},//自定义参数，json格式
        autoDataBinding: false,//请求回来的数据会在Context中，是否进行数据绑定，默认不绑定
        contextmapping: "filedNameOrFieldPath",//将返回结果映射到指定的Context字段上，支持fieldName和xx.xxx.fieldName字段全路径，如未指定contextmapping则替换整个Context
        callback: "myCallBack()",//请求成功后回调js方法
        error: "myErrCallBack()"//请求失败回调的js方法
    })
}

function myCallBack(sender, args){
	alert("ok")
	alert(typeof sender)
	alert(typeof args)
	$alert(sender)
	$alert(args)
}

function myErrCallBack(sender, args){
	alert("error")
	alert(typeof sender)
	alert(typeof args)
	$alert(sender)
	$alert(args)
	
	alert("args.err_msg===>" + args.err_msg);
}