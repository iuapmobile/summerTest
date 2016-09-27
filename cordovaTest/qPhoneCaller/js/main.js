function test(){ //ios不执行  bug编号UMP-8775
	/*window.PhoneCaller.call("13810513731", 
		function (arg){
		  $alert(arg);
		}, 
		function (arg){
		  $alert(arg);
		})*/
		summer.call("1381051373", //参数类型为string
			function (arg){
			  $alert(arg+'success');
			}, 
			function (arg){
			  $alert(arg+'error');
			})
}