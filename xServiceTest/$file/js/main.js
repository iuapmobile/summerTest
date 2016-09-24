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
    var url = "http://img5.pcpop.com/ArticleImages/0X0/3/3427/003427129.jpg";
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
	
	
    alert('下载：'+filename + "...." + filetype + "....." + filepath);
    //判断是否已经存在
    
	//判断网络类型
	var available = $net.available();
	var getNetworkInfo = JSON.parse($net.getNetworkInfo());
	if (!available){
		alert("当前没有网络");
		return false;
	}
	//判断文件是否已经存在。
	var readFile = $cache.read(filename) || ""; 
	if ( readFile ){
		alert("已经存在"+readFile);
		return false;
	}
	//开始了
	alert("新的下载即将开始");
	
	//判断是否为wifi连接，
    if( getNetworkInfo.Type == "Wifi" ){
    	alert("wifi连接");
    }else{
    	alert("此时连接为移动网络")
    }
	$file.download({
        "url" : url,
        "locate" : filepath,
        "filename" : filename, 
        "override" : bool,
        "callback" : function(args){
        	//	暂时先用缓存来存储
        	$cache.write(filename,filename);
			$summer.alert(args);
			//在图片那里显示出来
			$("#uploadImg").attr("src",args.path);
			alert("现在是即将自动打开的阶段");
			
			$file.open({
		        "filename" : filename,  //文件名
		        "filetype" : filetype,  //文件格式
		        "filepath" : filepath	//文件路径
		    });
        }
    });
}


//$file  上传, 暂时未实现。
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
//cordova 普通上传，无参数，无header
function uploadCordova(){
	if (!path){
		alert("未选择文件");
		return false;
	}
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

//此处为友人才专用upload， 带参数和header的请求
function uploadHr(){
    
    var u_logints = userinfo.u_logints;
    var u_usercode = userinfo.u_usercode;
    var tenantid = userinfo.tenantid;
    var token = userinfo.token;
    var auth = "u_logints="+u_logints+";u_usercode="+ u_usercode+";token="+token+";tenantid="+tenantid;

    alert("上传" + fileEntry);
    var fileURL = fileEntry;
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    

    var headers={'Authority':auth};

    var random = createUUID(); 
    var params = {};
    params.filepath = random;
    params.groupname = "attend";
    params.url = "true";


    options.headers = headers;
    options.params = params;
    options.httpMethod = "POST"; 
    alert(JSON.stringify(options));
    var ft = new FileTransfer();
    var SERVER = "http://123.103.9.205:8090/filesrv/file/upload"
    ft.upload(fileURL, encodeURI(SERVER), function(ret){
        alert("成功"+ JSON.stringify(ret));
    }, function(err){
        alert("失败"+ JSON.stringify(err));
    }, options);
}


//创建随机数
var createUUID = (function (uuidRegEx, uuidReplacer) {  
    return function () {  
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();  
    };  
})(/[xy]/g, function (c) {  
    var r = Math.random() * 16 | 0,  
        v = c == "x" ? r : (r & 3 | 8);  
    return v.toString(16);  
});
//SHA1加密算法
function SHA1(msg) {
    function rotate_left(n, s) {
        var t4 = ( n << s ) | (n >>> (32 - s));
        return t4;
    };
    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val) {
        var str = "";
        var i;
        var v;

        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;

        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;

        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) word_array.push(0);

    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);


    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();

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