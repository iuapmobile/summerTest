//here is your code...
summerready = function () {
	$summer.byId("content").innerHTML += "<h3 style='text-align: center'>Hello friends, welcome to touch the summer frame!</h3><h3 style='text-align: center'>The frame update at " +(new Date()).toLocaleString()+"</h3>";
};

 var img,base1,base2;  
 function fileToBase64(){
	base1 = summer.fileToBase64({
	    "filePath" : img //文件路径
	})
	alert(base1)
}
function base64ToFile(){
	base2 = summer.base64ToFile({
		"base64" : base1,
	    "filePath" : "/storage/emulated/0/Download/ABC.png"
	})
	alert(base2)
}
function openPhotoAlbum(){
	summer.openPhotoAlbum({
	    callback : function (args){
	       img =args.imgPath;
	    }
	});
}