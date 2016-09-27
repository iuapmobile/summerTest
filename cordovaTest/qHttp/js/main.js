var url="http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=";
function test1(){		
	summer.post({"URL":url },		 //url为string类型
			function(response) {
		  		alert(JSON.parse(response.data)[0].text); 
		  		alert(typeof response) //返回类型为object 键值包括'headers','status'返回状态,'data'未返回数据类型为string
		  		alert(typeof response.data)
		  		
		  	}, 
		  	function(response) {
		   		$alert(response.status); 
			}
)}


function test2(){	
	summer.get({"URL":url},  //url为string类型
			function(response) {
		  		alert(JSON.parse(response.data)[1].text); //返回类型为object 键值包括'headers','status'返回状态,'data'未返回数据类型为string
		  	}, 
			function(response) {
		   		$alert(response.status);
			}
)}	

function test3(){		
	summer.ajax({"URL":url,"type":"get"},		 //url为string类型
			function(response) {
		  		alert(JSON.parse(response.data)[2].text); //返回类型为object 键值包括'headers','status'返回状态,'data'未返回数据类型为string
		  	}, 
		  	function(response) {
		   		$alert(response.status); 
			}
	)
}