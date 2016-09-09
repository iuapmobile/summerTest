//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h3 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h3><h3 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h3>";
};

function upgrade(type){
	if(type=="1"){
		//1代表app整体升级
		var jsonVersionInfoOfServer = null;//用于保存服务端的版本信息
		var jsonVersionInfoOfClient = null;//用于保存手机端上的版本信息
		
		//第一步、获取最新的app的版本号
		//服务器端检查版本信息的服务地址
		var url = "http://123.103.9.206:7100/UpdateApp/version/getAppVersion";

		
		$.ajax({
			type : 'post',
			url : url,
			data : {deviceType:$summer.os},
			cache : false,
			dataType : 'json',
			success : function(ret) {
				jsonVersionInfoOfServer = ret;

				//第2步、获取当前app的版本号
				var versionInfo = summer.getAppVersion();
				if(typeof versionInfo == "string"){
					//安卓走这里
					alert("最新的版本信息为"+ versionInfo);
					jsonVersionInfoOfClient = JSON.parse(versionInfo);
				}else if(typeof versionInfo == "object"){
					alert("当前版本信息转换类型后为"+ JSON.stringify(versionInfo));
					jsonVersionInfoOfClient = versionInfo;
				}
				
				
				//第3步、比较两个版本号决定是否下载
				alert("jsonVersionInfoOfServer.versionCode类型是"+ typeof jsonVersionInfoOfServer.versionCode)
				alert("jsonVersionInfoOfClient.versionCode类型是"+ typeof jsonVersionInfoOfClient.versionCode)
				if(parseInt(jsonVersionInfoOfServer.versionCode) > parseInt(jsonVersionInfoOfClient.versionCode)){
					alert("最新版本的app下载地址是" + jsonVersionInfoOfServer.url);
					if(!confirm("立即更新？")){
						return;
					}
					summer.upgradeApp({
						"url":jsonVersionInfoOfServer.url,
						"version":{
							versionCode:jsonVersionInfoOfServer.versionCode,
							versionName:jsonVersionInfoOfServer.versionName
						}		
					}, function(){
						alert("app升级完毕");
					},function(){
						alert("app升级error");			
					})
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("jquey err");
	
		   	}
		});
	
	
	
	
	
	
	
	
	
	
	
	}else if(type=="2"){
		//2代表应用内升级
		var jsonVersionInfoOfServer = null;
		var jsonVersionInfoOfClient = null;
		
		//第一步、获取最新的app的版本号
		//服务器端检查版本信息的服务地址
		var url = "http://123.103.9.206:7100/UpdateApp/version/getVersion";
		$.ajax({
			type : 'post',
			url : url,
			data : {deviceType:$summer.os},
			cache : false,
			dataType : 'json',
			success : function(ret) {
				jsonVersionInfoOfServer = ret;
			
				//第二步、获取当前APP的版本信息
				var versionInfo = summer.getVersion();
				if(typeof versionInfo == "string"){
					//安卓走这里
					alert("当前版本信息为"+ versionInfo);
					jsonVersionInfoOfClient = JSON.parse(versionInfo);
				}else if(typeof versionInfo == "object"){
					alert("当前版本信息转换类型后为"+ JSON.stringify(versionInfo));
					jsonVersionInfoOfClient = versionInfo;
				}
						
				
				//第三步、比较两个版本号，决定是否升级
				alert("jsonVersionInfoOfServer.versionCode类型是"+ typeof jsonVersionInfoOfServer.versionCode)
				alert("jsonVersionInfoOfClient.versionCode类型是"+ typeof jsonVersionInfoOfClient.versionCode)
				if(parseInt(jsonVersionInfoOfServer.versionCode) > parseInt(jsonVersionInfoOfClient.versionCode)){
					alert("最新的升级包下载地址是" + jsonVersionInfoOfServer.url);
					if(!confirm("立即更新？")){
						return;
					}
					summer.upgrade({
						"url":jsonVersionInfoOfServer.url,
						"version":{
							versionCode:jsonVersionInfoOfServer.versionCode,
							versionName:jsonVersionInfoOfServer.versionName
						}		
					}, function(){
						alert("升级完毕，请重新进入页面");
					},function(){
						alert("升级过程失败");			
					});
				}
			},
			error:function(response){
				alert("请求服务器失败");
				$alert(response);
			}
		});
	}//end 应用内升级

}
