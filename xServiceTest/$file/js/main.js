//here is your code...
summerready = function () {
	//
};

var path;
//打开相机
function camera(){
	$camera.open({
		bindfield : "image",
		callback : function(args){
			$summer.alert(args);
			path = args.imgPath;
			alert(path);
			//path = args.image.imgPath;
			$("#uploadImg").attr("src",path);
		}	
	})
}
//打开相册
function openPhotoAlbum(){
	$camera.openPhotoAlbum({
        bindfield : "image",
        callback : function (args){
        	$summer.alert(args);
			path = args.imgPath;
			//path = args.image.imgPath;
			$("#uploadImg").attr("src",path);
        }
    });
}
//$file  上传
function uploadFile(){
	alert(path);
    $file.upload({
        "url" : "http://123.103.9.206:7100/UpdateApp/file/upload",//上传服务器端路径
        "filename" : path || "a.png",//上传文件的路径+文件名
        "bindfield" : "upload",//上传后的返回值，类型为JSONObject（其中从键值url可以获取上传后该文件的url）
        "callback" : function (){
            alert(upload.url)
        }
   })
}
//cordova 上传
function uploadCordova(){
    var fileURL = path;
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    
    var params = {};
    options.params = params;
    options.httpMethod = "POST"; 
    alert(JSON.stringify(options));
    var ft = new FileTransfer();
    var SERVER = "http://123.103.9.206:7100/UpdateApp/file/upload"
    ft.upload(fileURL, encodeURI(SERVER), function(ret){
        alert("成功"+ JSON.stringify(ret));
    }, function(err){
        alert("失败"+ JSON.stringify(err));
    }, options);
}
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
//下载图片
function downloadImg(){
	//下载请求的url
    var url = "http://misc.360buyimg.com/lib/img/e/logo-201305.png";
    //存放路径
    var filepath = "downloadTest/image"; 
	//是否覆盖
	var bool = true;

    downloads(url,filepath,bool);
}
//公用的download
function downloads(url,filepath,bool){
	//文件名
    var filename = url.substr(url.lastIndexOf("/")+1);
	//文件类型
	var filetype = filename.split(".").pop();
	$file.download({
        "url" : url,
        "locate" : filepath,
        "filename" : filename, 
        "override" : bool,
        "callback" : function(args){
        	alert('下载完成回调：'+filename + "...." + filetype + "....." + filepath);
			$summer.alert(args);
			$file.open({
		        "filename" : filename,//文件全路径
		         "filetype" : filetype,
		         "filepath" : filepath
		    });
        }
    });
}

//为了实现summer.download
function summerDownload(){
	//下载请求的url
    var url = "http://misc.360buyimg.com/lib/img/e/logo-201305.png";
    //存放路径
    var filepath = "downloadTest/image"; 
    //文件名
    var filename = url.substr(url.lastIndexOf("/")+1);
	//文件类型
	var filetype = filename.split(".").pop();
	summer.download({
		"url" : url,	//下载地址
		"locate" : filepath, // 存储地址
		"filename" : ' ',  //下载命名  
        "override" : true, // 布尔类型，是否覆盖
        "cache" : true  //布尔类型，是否缓存
	},function(){
	});
}