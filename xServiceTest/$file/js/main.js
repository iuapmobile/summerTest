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
function upload(){
	alert(path)
    $file.upload({
        "url" : "http://123.103.9.206:7102/umserver/upload",//上传服务器端路径
        "filename" : path,//上传文件的路径+文件名
        "bindfield" : "upload",//上传后的返回值，类型为JSONObject（其中从键值url可以获取上传后该文件的url）
        "callback" : function uploadImageCallback(){
            alert(upload.url)
        }
   })
}

//下载PDF
function downloadPDF(){
	$file.download({
        "url" : "http://123.103.9.206:7100/UpdateApp/package/TestPDF.pdf",
        "locate" : "downloadTest/image",
        "filename" : "jd.pdf", 
        "override" : "true",
        "callback" : "downloadPDFCallback()"
    });
}
function downloadPDFCallback(){
	alert('下载完成回调')
	$file.open({
        "filename" : "jd.pdf",//文件全路径
         "filetype" : "pdf",
         "filepath" : "downloadTest/image/"
    })
}
//下载TXT
function downloadTxt(){
	$file.download({
        "url" : "http://123.103.9.206:7100/UpdateApp/package/TestTxt.txt",
        "locate" : "downloadTest/image",
        "filename" : "jd.txt", 
        "override" : "true",
        "callback" : "downloadTxtCallback()"
    });
}
function downloadTxtCallback(){
	alert('下载完成回调')
	$file.open({
        "filename" : "jd.txt",//文件全路径
         "filetype" : "txt",
         "filepath" : "downloadTest/image/"
    })
}
//下载docx
function downloadDocx(){
	$file.download({
        "url" : "http://123.103.9.206:7100/UpdateApp/package/TestWord.docx",
        "locate" : "downloadTest/image",
        "filename" : "jd.docx", 
        "override" : "true",
        "callback" : "downloadDocxCallback()"
    });
}
function downloadDocxCallback(){
	alert('下载完成回调')
	$file.open({
        "filename" : "jd.docx",//文件全路径
         "filetype" : "docx",
         "filepath" : "downloadTest/image/"
    })
}
//下载excle
function downloadXlsx(){
	$file.download({
        "url" : "http://123.103.9.206:7100/UpdateApp/package/TestExcel.xlsx",
        "locate" : "downloadTest/image",
        "filename" : "jd.xlsx", 
        "override" : "true",
        "callback" : "downloadXlsxCallback()"
    });
}
function downloadXlsxCallback(){
	alert('下载完成回')
	$file.open({
        "filename" : "jd.xlsx",//文件全路径
         "filetype" : "xlsx",
         "filepath" : "downloadTest/image/"
    })
}
//下载图片
function downloadImg(){
	$file.download({
        "url" : "http://misc.360buyimg.com/lib/img/e/logo-201305.png",
        "locate" : "downloadTest/image",
        "filename" : "jd.png", 
        "override" : "true",
        "callback" : "downloadImageCallback()"
    });
}
function downloadImageCallback(){
	alert('下载完成回')
	$file.open({
        "filename" : "jd.png",//文件全路径
         "filetype" : "png",
         "filepath" : "downloadTest/image/"
    })
}