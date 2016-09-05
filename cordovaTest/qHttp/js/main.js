var url="http://opentest.yonyoutelecom.cn/mobile/isvName.do?account=qinfx&q=";
function test1(){		
	summer.post({"URL":url },		
			function(response) {
		  		alert(JSON.parse(response.data)[0].text); 
		  	}, 
		  	function(response) {
		   		$alert(response.status); 
			}
)}


function test2(){	
	summer.get({"URL":url},
			function(response) {
		  		alert(JSON.parse(response.data)[1].text); 
		  	}, 
			function(response) {
		   		$alert(response.status);
			}
)}	

function test3(){		
	summer.ajax({"URL":url,"type":"get"},		
			function(response) {
		  		alert(JSON.parse(response.data)[2].text); 
		  	}, 
		  	function(response) {
		   		$alert(response.status); 
			}
	)
}