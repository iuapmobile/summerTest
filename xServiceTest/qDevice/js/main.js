//here is your code...
function test() {
	$summer.alert($device.getTimeZoneID());
}

function test1() {
	$summer.alert($device.getTimeZoneDisplayName());
}

function test2() {
	$summer.alert($device.getDeviceInfo());
}

function test3() {
	$summer.alert($device.captureTwodcode());
}

function test4() {
	$device.getLocation({
		"bindfield" : "location", //
		"single" : "true", //是否只获取1次
		"isgetaddress" : "true", //是否获取地址
		"network" : "true", //是否wify定位
		"callback" :function(){
		$summer.alert(location);
		
		}
	});
}

function test5() {
	$device.openscan();
}

function test6() {
	$device.capturePhoto({
		bindfield : "image",
		callback : function(args) {
			$alert(args)
		}
	});
}

function test7() {
	$summer.alert($device.getAlbumPath());
}

function test8() {
	$summer.alert($device.getAppAlbumPath());
}

function test9() {
	$summer.alert($device.generateQRCode({
		size : '200',
		content : '你好！',
	}));
}

function test10() {
	$device.sendMail({
		receive : 'wuxlr@yonyou.com',
		title : '您好',
		content : '您好吗？'
	});
}

function test11() {
	$device.saveContact({
		tel : "10080", //手机号码
		employeename : "中国移动", //联系人名称
		jobname : "", //职位
		orgname : "", //部门名称
		address : "", //单位地址
		email : "", //邮箱
		officetel : ""//办公电话
	});
}

function test12() {
	$summer.alert($device.getContacts());
}

function test13() {
	$summer.alert($device.openAddressBook());
}

function test14() {
	$summer.alert($device.getInternalMemoryInfo());
}

function test15() {
	$summer.alert($device.getExternalStorageInfo());
}

function test16() {
	$summer.alert($device.getMemoryInfo());
}

function test17() {
	$device.gotoMapView({
		posX : "", //位置信息x坐标
		posY : "", //位置信息y坐标
		bindfield : "", //绑定字段
		auto : "false", //是否自动定位
		aroundpoi : "", //周围兴趣点
		keyword : "", //要定位的关键字
		onaroundpoiclick : function() {
			$alert('您点击了目的地')
		}, //兴趣点点击触发的JS方法
		onmylocationclick : function() {
			alert('您目前所处的位置')
		}//我的位置点击触发的JS方法
	});
}

function test18() {
	$device.openWebView({
		url : "http://www.baidu.com"
	});
}

function test19() {
	$device.screenShot({
		callback : function(args) {
			$summer.alert(args);
		}
	});
}

function test20() {
	$device.notify({
		"sendTime" : "2015-02-03 13:54:30",
		"sendBody" : "您设置了消息提醒事件",
		"icon" : "app.png"
	});
}

function test21() {
	$summer.alert($device.getScreenWidth());
}

function test22() {
	$summer.alert($device.getScreenHeight());
}

function test23() {
	$summer.alert($device.getScreenDensity());
}

function test24() {
	$summer.alert($device.currentOrientation());
}

summerready = function() {

};