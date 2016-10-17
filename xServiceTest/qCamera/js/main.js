//test4()是可能出现的问题，要定义为全局函数。
//打开照相机功能
function test1(){ 
	$camera.open({
        callback : function (sender,args){          
        	alert(typeof args); //object
	    	alert(typeof(args.imgPath)); //string
	    	alert(args.imgPath);  	
		   	$('.pic').attr('src',args.imgPath);
        }
	})
}

function test2(){ 
	function mycb2(sender, args){                 
    	alert(typeof(args.imgPath)); //string
    	alert(args.imgPath);  	
	   	$('.pic').attr('src',args.imgPath);
	}

	$camera.open({
        callback : mycb2
   });     
}
function test3(){
	$camera.openPhotoAlbum({
		callback : "mycb33()"
	});
}

function mycb33(sender, args){
	alert(typeof args); //object
	alert(typeof(args.imgPath)); //string
	alert(args.imgPath);
	$('.pic').attr('src',args.imgPath);
}



/*function test4(){
	function mycb44(sender, args){
		alert(typeof args); //object
		alert(typeof(args.imgPath)); //string
		alert(args.imgPath);
		$('.pic').attr('src',args.imgPath);
	};

	$camera.openPhotoAlbum({
		callback : "mycb44()"
	});
}*/


//调取系统相册 


