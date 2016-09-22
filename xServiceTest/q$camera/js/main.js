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
	$camera.open({
        callback : "mycb3()"
   });     
}

function mycb3(sender, args){
	alert(typeof args); //object
	alert(typeof(args.imgPath)); //string
	alert(args.imgPath);  	
   	$('.pic').attr('src',args.imgPath);
}



function test4(){
	function mycb4(sender, args){
		alert(typeof args); //object
    	alert(typeof(args.imgPath)); //string
    	alert(args.imgPath);  	
	   	$('.pic').attr('src',args.imgPath);
	};
	
	$camera.open({
        callback : "mycb4()"
   });     
}
//调取系统相册 
//android回调函数没有执行
function test11(){ 
	$camera.openPhotoAlbum({
        callback : function (sender,args){          
	 		alert(typeof args); //object
	    	alert(typeof(args.imgPath)); //string
	    	alert(args.imgPath);  	
	    	$('.pic').attr('src',args.imgPath);
        }
	})
}

function test22(){ 
	function mycb22(sender, args){                 
		alert(typeof args); //object
    	alert(typeof(args.imgPath)); //string
    	alert(args.imgPath);  	
	   	$('.pic').attr('src',args.imgPath);
	}

	$camera.openPhotoAlbum({
        callback : mycb22
   });     
}

function test33(){
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



function test44(){
	function mycb44(sender, args){
		alert(typeof args); //object
    	alert(typeof(args.imgPath)); //string
    	alert(args.imgPath);  	
	   	$('.pic').attr('src',args.imgPath);
	};
	
	$camera.openPhotoAlbum({
        callback : "mycb44()"
   });     
}


function openWin(){
	summer.openWin({
		id:"new_page1",
		url: 'html/new_page1.html'
	})
}

function closeWin(){
	summer.closeWin() //android 不是关闭当前win而是关闭应用
}
