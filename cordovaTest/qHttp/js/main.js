var url="http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q="; //ios 没有请求 用例编号UMP-8775
function test1(){



	cordovaHTTP.get("http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=", {
		a: 1,
		b: 2
	}, {Authorization: "OAuth2: token"}, function (response) {
		// prints 200
		alert(response.status);
		try {
			response.data = JSON.parse(response.data);
			// prints test
			$summer.alert(response.data);
		} catch (e) {
			alert("JSON parsing error");
		}
	}, function (response) {
		// prints 403
		alert(response.status);

		//prints Permission denied
		alert(response.error);
	}
)}


function test2(){
	cordovaHTTP.post("http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=", {
		a: 1,
		b: 2
	}, {Authorization: "OAuth2: token"}, function (response) {
		// prints 200
		alert(response.status);
		try {
			response.data = JSON.parse(response.data);
			// prints test
			$summer.alert(response.data);
		} catch (e) {
			alert("JSON parsing error");
		}
	}, function (response) {
		// prints 403
		alert(response.status);

		//prints Permission denied
		alert(response.error);
	}
)}	

