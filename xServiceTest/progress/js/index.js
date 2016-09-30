
summerready = function(){
    // here is your code...	
    var header = $summer.byId("header");
    $summer.fixStatusBar(header);
}


var filename,
	filepath;
//删除指定位置的文件\
function removeFile(){
	$file.remove({
	    path : filepath,
	    file : filename,
	    callback : "removeCall()"
	});
}
//删除完成之后的回调
function removeCall(args){
	if (args.delStatus == 1){
		alert("删除成功");
	}else{
		alert(args.msg);
	}
}

//检测目标文件是否存在的方法

function check(){
	var flag = $file.exists({
		path : filepath,
		file : filename
	}).toString();
	alert(flag);
	var txt = flag == "true" ? 1 : 0 ;
	alert(txt);
	return txt;
}

function downall(){
	download(true);
	download2(true);
	download3(true);
}
//下载
function download(obj){
    //下载请求的url
    var url = "http://img5.pcpop.com/ArticleImages/0X0/3/3427/003427129.jpg"
    //存放路径
    filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;
	
	
    downloads(url,filepath,bool,obj);
}
//为了多文件下载
function download2(obj){
    //下载请求的url
    var url = "http://uapma.yonyou.com:8443/weixin/um.zip";
    //var url = "http://img5.pcpop.com/ArticleImages/0X0/3/3427/003427129.jpg"
    //存放路径
    var filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;

    downloads(url,filepath,bool,obj);
}
//为了多文件下载
function download3(obj){
    //下载请求的url
    var url = "http://123.103.9.206:7100/UpdateApp/package/TestPDF.pdf";
    //var url = "http://img5.pcpop.com/ArticleImages/0X0/3/3427/003427129.jpg"
    //存放路径
    var filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;

    downloads(url,filepath,bool,obj);
}
var arr = [];

//公用的download
function downloads(url,filepath,bool,obj){
	//文件名
    
    //$(obj).next().eq(0).setAttribute("id","x-"+filename);
    
    if(obj){
		var json = {};
		json.url = url;
		json.filepath = filepath;
		json.bool = bool;
		arr.push(json);

		if (arr.length > 1 ){
			//将新的任务加入到数组
			alert("已加入下载队列");
			return false;
		}
	}
	
	
	
	//判断网络类型		
	var available = $net.available();
	var getNetworkInfo = JSON.parse($net.getNetworkInfo());
	if (!available){
		alert("当前没有网络");
		return false;
	}
	//判断是否为wifi连接，
    if( getNetworkInfo.Type == "Wifi" ){
    	//alert("wifi连接");
    }else{
    	alert("此时连接为移动网络");
    }
    
	filename = url.substr(url.lastIndexOf("/")+1);
    
    
	$file.download({
        "url" : url,
        "locate" : filepath,
        "filename" : filename, 
        "override" : bool,
        "callback" : "downloadCall()"
    });
}
//下载完成回调

var num = 1;
function downloadCall(args){
    //判断下载是否完成
    var filename = args.filename;

    if(args.isfinish == true){
        num ++ ;
		//$summer.alert(args);
		arr.splice(0, 1);
		//$summer.alert(arr);
		if(arr.length>0){
			downloads(arr[0].url,arr[0].filepath,arr[0].bool);
		}
		return;
		//调用打开文件函数
		var r = confirm("确认打开吗!");
		if (r == true){
  			//openFile();
  		}else{
  			alert("You pressed Cancel!");
  		}
	}else{
		//$("[id='#x-"+filename+"']").html(args.percent);
		document.getElementById("f"+num).innerHTML = args.percent;
	}
	
	return;
}
//打开文件
function openFile(){
	//将filename.的格式解析
	var filetype = filename.split(".").pop();
	$file.open({
        "filename" : filename,  //文件名
        "filetype" : filetype,  //文件格式
        "filepath" : filepath	//文件路径
    });
}











/*v                                         */

//下载PDF
function downloadPDF(){
    //下载请求的url
    var url = "http://123.103.9.206:7100/UpdateApp/package/TestPDF.pdf";
    //存放路径
    var filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;

    downloads(url,filepath,bool);
}

//下载TXT
function downloadTxt(){
    //下载请求的url
    var url = "http://123.103.9.206:7100/UpdateApp/package/TestTxt.txt";
    //存放路径
    var filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;

    downloads(url,filepath,bool);
}

//下载docx
function downloadDocx(){
     //下载请求的url
    var url = "http://123.103.9.206:7100/UpdateApp/package/TestWord.docx";
    //存放路径
    var filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;

    downloads(url,filepath,bool);
}
//下载excle
function downloadXlsx(){
    //下载请求的url
    var url = "http://123.103.9.206:7100/UpdateApp/package/TestExcel.xlsx";
    //存放路径
    var filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;

    downloads(url,filepath,bool);
}
