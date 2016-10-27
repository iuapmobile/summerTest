function test(){
	window.PhoneCaller.call("13810513731",
		function (arg){
		  $alert(arg);
		}, 
		function (arg){
		  $alert(arg);
		})

}