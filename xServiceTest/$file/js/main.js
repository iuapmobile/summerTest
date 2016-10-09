summerready = function(){
	//coding
}

//全局变量 存储拍照或者图库选择回来的地址
var path = [];

//拍照路径，方便上传使用
var pathCamera;

//相册路径，方便上传使用
var pathPhoto;
//打开相机
function camera(){
	$camera.open({
		bindfield : "image",
		callback : function(args){
			$summer.alert(args);
			pathCamera = args.imgPath;
			path.push(pathCamera);
			//path = args.image.imgPath;
			$("#pathCamera").attr("src",pathCamera);
		}	
	})
}
//打开相册
function openPhotoAlbum(){
	$camera.openPhotoAlbum({
        bindfield : "image",
        compressionRatio : 0.2,
        callback : function (args){
        	$summer.alert(args);
			pathPhoto = args.imgPath;
			path.push(pathPhoto);
			//path = args.image.imgPath;
			$("#pathPhoto").attr("src",pathPhoto);
        }
    });
}
//获取选择回来的图片的大小
function getFileInfo(){
	alert(pathPhoto)
	var size = summer.UMFile.getFileInfo(pathPhoto);
	alert("文件大小" + JSON.parse(size).size + "kb");
}


function uploadCamera(){
	var params = {};
	uploadCordova(
		{
			fileURL : pathCamera,
			type : "image/jpeg",
			params : params,
			SERVER : "http://123.103.9.206:7100/UpdateApp/file/upload"
		},function (ret){
			alert("成功"+ JSON.stringify(ret));
		},function(err){
			alert("失败"+ JSON.stringify(err));
		}
	);
}
function uploadPhoto(){
	var params = {};
	summer.upload({
		fileURL : pathPhoto,
		type : "image/jpeg",
		params : params,
		SERVER : "http://123.103.9.206:7100/UpdateApp/file/upload"
	},function (ret){
		alert("成功"+ JSON.stringify(ret));
	},function(err){
		alert("失败"+ JSON.stringify(err));
	});
}

//for 多图片上传
function uploadMore(){
	var params = {};
	for(var i = 0,length = path.length; i< length;i++ ){
		uploadCordova(
			{
				fileURL : path[i],
				type : "image/jpeg",
				params : params,
				SERVER : "http://123.103.9.206:7100/UpdateApp/file/upload"
			},function (ret){
				alert("成功"+ JSON.stringify(ret));
			},function(err){
				alert("失败"+ JSON.stringify(err));
			}
		);
	}
}
//cordova 普通上传，无参数，无header
function uploadCordova(json,sFn,eFn){
	var fileURL = json.fileURL,
		type = json.type,
		params = json.params;
	if (!path){
		alert("未选择文件");
		return false;
	}
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=fileURL.substr(fileURL.lastIndexOf('/')+1);
    options.mimeType = type;

    options.params = params;
    options.httpMethod = "POST"; 
    alert(JSON.stringify(options));
    var ft = new FileTransfer();
    var SERVER = json.SERVER
    ft.upload(fileURL, encodeURI(SERVER), sFn, eFn, options);
}



/*   *** 下边为下载整合***    */




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