//here is your code...
summerready = function () {
    $summer.byId("content").innerHTML += "<p>Hello friends, welcome to touch the summer frame!</p><p>The frame update at " +(new Date()).toLocaleString()+"</p>"; 
};
function getData(type) {
	$.ajax({
				type : type,
				url : 'http://opentest.yonyoutelecom.cn/mobile/queryByAppName.do?account=qinfx&q=',
				data : {},
				cache : false,
				dataType : 'json',
				success : function(data) {
					alert(data);
					$summer.alert(data);
				}
			});

}

function getData2(type) {
	var url = 'http://opentest.yonyoutelecom.cn/mobile/queryByAppName.do?account=qinfx&q=';
	//alert(typeof cordovaHTTP)
	//alert(cordovaHTTP)
	if(type == "get"){
		cordovaHTTP.get(url, {}, {
		}, function(response) {
			$summer.alert(response);
			$summer.alert(response.status);
			 $summer.alert(JSON.stringify(response))
			 $summer.alert(JSON.parse(response.data))
			 $summer.alert(JSON.parse(response.data)[0].activity)
	
			// alert(JSON.stringify(JSON.parse(response.data)[0].activity));
	
			//callBack(JSON.parse(response.data));
		}, function(response) {
			//console.error(response.error);
			alert(JSON.stringify(response))
		});
	}else if(type == "post"){
		alert(type)
		cordovaHTTP.post(url, {}, {
		}, function(response) {
			$summer.alert(response);
			$summer.alert(response.status);
			 $summer.alert(JSON.stringify(response))
			 $summer.alert(JSON.parse(response.data))
			 $summer.alert(JSON.parse(response.data)[0].activity)
	
			// alert(JSON.stringify(JSON.parse(response.data)[0].activity));
	
			//callBack(JSON.parse(response.data));
		}, function(response) {
			//console.error(response.error);
			alert(JSON.stringify(response))
		});
		
	}
}