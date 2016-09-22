
function openScanner1(){
	$scanner.open({
       callback : function (args){  
		   alert(args)  //object类型
		   alert(args.result)	//string类型	   
		}
	 });	 
}

function openScanner2(){
	$scanner.open({
       callback : mycall2
	 });
	 
 	function mycall2(args){
 		alert(args)  //object类型
		alert(args.result)	//string类型	
    } 
}

function mycall3(args){
 		alert(args)  //object类型
		alert(args.result)	//string类型	
}  
    
function openScanner3(){
	$scanner.open({
       callback : "mycall3()"
	 });
	 
 	
}


function openTwocode(){
	var twocodepath=$scanner.generateQRCode({
		 size : 30,//二维码正方形的宽高
		 content : "text"//生成二维码所需的源文字 string类型
	});
	var qq = twocodepath;		//string 图片路径 android无返回值
	$('.pic').attr('src',qq);
}


