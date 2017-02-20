

function upgrade(url){

		//2代表应用内升级
		var jsonVersionInfoOfServer = null;
		var jsonVersionInfoOfClient = null;
		
		//第一步、获取最新的app的版本号
		//服务器端检查版本信息的服务地址
		var url = url;
		$.ajax({
			type : 'post',
			url : url,
			data : {deviceType:$summer.os, versionCode:summer.getVersion().versionCode},
			cache : false,
			dataType : 'json',
			success : function(ret) {
				jsonVersionInfoOfServer=ret;
				alert(JSON.stringify(jsonVersionInfoOfServer))		
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
					alert("最新的升级包下载地址是" + JSON.stringify(jsonVersionInfoOfServer.url));
					if(!confirm("立即更新？")){
						return;
					}
					summer.upgrade({
						"url":jsonVersionInfoOfServer.url,
						"version":{
							versionCode:jsonVersionInfoOfServer.versionCode,
							versionName:jsonVersionInfoOfServer.versionName
						},
						"isIncremental":jsonVersionInfoOfServer.isIncremental
					}, function(args){
						$("#bar").css("width",args.percent+'%');
						 if(args.isfinish=="1"){
						 	$("#bar").css("width","100%");
							summer.openWin({
	                            "id" : 'index',
	                            "url" : 'index.html',
	                            "isKeep":false
	                        });
                        }
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


