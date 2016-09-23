function test1(){
	alert($device.getTimeZoneID()); //android支持  返回数据类型为string  ios返回值为undefined
}

function test2(){
	alert($device.getTimeZoneDisplayName()); //android支持  返回数据类型为string  ios返回值为undefined
}

function getLocation(){
	$device.getLocation({   
	     "callback" :  function(args){    	
	     	var qq = JSON.parse(args.result);//ios: 返回结果args类行为json  android 没有执行回调
	     	alert(qq.longitude); //返回经度
	     	alert(qq.latitude); //返回纬度
	     },  //回调执行的JS方法				
	     "single" : "true", //是否只获取1次
	     "isgetaddress" : "true", //是否需要获取地址
	     "network" : "true" //是否使用wifi定位
	 })	
}

function test3(){
	$device.openWebView({
	   "url" : "http://www.baidu.com" //android支持    ios不执行
	 });
}

function test4(){
	alert($device.getInternalMemoryInfo()); //android  返回json类型为string key值为MemToal、MenFree
	alert($device.getInternalMemoryInfo().total);//ios      返回object类型，key值为total、free
}

function test5(){
	alert($device.getExternalStorageInfo());//仅android支持，返回json类型为string key值为TotalSize、freeSize
}

function test6(){
	alert($device.getMemoryInfo());//android支持，返回json类型为string key值为MemToal、MenFree等多个字段
								   //ios 返回值为undefined
}

function test7(){
	alert($device.getDeviceInfo()) //android支持，返回json类型为string key值为deviceid、os、screen、version等多个字段
	alert($device.getDeviceInfo().os) //ios 返回类型为object key值为deviceid、os、screen等字段
}

function test8(){
	alert($device.getScreenHeight()); //返回number类型
}

function test9(){
	alert($device.getScreenWidth());//返回number类型
}

function test10(){
	alert($device.getScreenDensity()); //android支持，返回number类型      ios 返回值为undefined
}

function test11(){
	$device.notify({       //android有震动提示 设置的信息没有提示    ios 没有执行
	  "sendTime" : "2015-02-03 13:54:30",//提示时间
	  "sendBody" : "您设置了消息提醒事件",//提示文字内容
	  "icon" : "../img/mt_food.png"//图标
	 })
}

function test12(){
	$device.capturePhoto({  //android的回调函数没有执行       ios 返回类型为object 键值为imgPath
        "callback" : function (args){
        	alert(args.imgPath)
		 }
	 });
}

function test13(){
	$device.screenShot({   //android应用直接关闭  ios没有执行
       "callback" : function (args){
        	alert(typeof args);
        	$alert(args)
		 } 
   })
}

function test14(){
	$device.saveContact({  //   android 和 ios支持，
		"tel" : "139****",//手机号码
		"employeename" : "张三",//联系人名称
		"jobname" : "职员",//职位
		"orgname" : "开发部",//部门名称
		"address" : "北京市海淀区***",//单位地址
		"email" : "zhangsan@yonyou.com",//邮箱
		"officetel" : "6243****"//办公电话
	})
}

function test15(){
	$device.openAddressBook();  //android 和 ios支持，
}

function test16(){
	 var value=$device.getContacts();//(android调取成功时,返回类型为array类型的string)  ios没有执行  android调取异常
	 alert(JSON.parse(value))
	 alert(JSON.parse(value)[0])
     alert(JSON.parse(value)[0].id)
}

function test17(){
	  alert($device.currentOrientation()) //android支持,返回类型为string   ios返回值为undefined
}

function test18(){          //android调取异常  ios 返回类型为string
	var qq=$device.generateQRCode({
		 size : 30,//二维码正方形的宽高
		 content : "text"//生成二维码所需的源文字
	 });
	 	 
	 alert(qq)  
}

function test19_1(){   //Android独有   获取相册路径  返回类型为string   
	 alert($device.getAlbumPath())
	 alert(typeof $device.getAlbumPath())
}

function test19_2(){
	$device.getAlbumPath({   //Android独有   直接关闭         
          "allFolders" : true,//是否获取相册中所有文件夹
          "callback" : function(args){
          		alert(typeof args)
          		$alert(args)
          }
   })
  
}

function test19_3(){
	 $device.getAlbumPath({   //Android独有  直接关闭 
          "allFolders" : false,//是否获取相册中所有文件夹
          "callback" : function(args){
          		alert(typeof args)
          		$alert(args)
          }
   })
}

function test20(){    //Android   相机服务存放照片的存储路径  返回类型为string  ios返回值为undefined
	  alert($device.getAppAlbumPath())
}