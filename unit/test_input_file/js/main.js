//here is your code...
summerready = function () {
    $summer.byId("content").innerHTML += "<p>Hello friends, welcome to touch the summer frame!</p><p>The frame update at " +(new Date()).toLocaleString()+"</p>"; 
};

function mySubmit(){
	alert("begin ajax")
	 var url= "http://172.22.246.1:8080/webSite1/home";
	/*
	$.ajax({
	  type: 'POST',
	  url: "http://172.22.246.1:8080/webSite1/home",
	  data: {x:123},
	  success: function(req){
	  	alert("ok")
	  	$summer.alert(req)
	  	
	  },
	  error:function(r){
	  alert("error")
	  	$summer.alert(r);
	  }
	  
	  //dataType: dataType
	});
	*/
	
	
	
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
}